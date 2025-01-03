'use client';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { getRvmLocations } from '@/services/location-service';
import { getLocationName } from '../../../utils/location';
import Image from 'next/image';
import { useLocation } from '@/context/location';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

export default function Map() {
  const { setSelectedLocation } = useLocation();
  const [icon, setIcon] = useState(null);
  const [currentLocationIcon, setCurrentLocationIcon] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [rvmLocations, setRvmLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);
  const routeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const initializeMap = async () => {
    try {
      setIsLoading(true);
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      setCurrentLocation([latitude, longitude]);

      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 14);
      }

      const name = await getLocationName(latitude, longitude);
      setLocationName(name);

      // Start watching position after getting initial location
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
          getLocationName(latitude, longitude).then(setLocationName);
        },
        (error) => {
          console.error('Error watching position:', error);
          setLocationError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } catch (error) {
      console.error('Error getting initial position:', error);
      setLocationError(error.message);
      // Set default location if geolocation fails (e.g., Jakarta)
      setCurrentLocation([-6.2088, 106.8456]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);

      const initialize = async () => {
        // Initialize icons
        const defaultIcon = L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        const currentLocationCustomIcon = L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
          iconSize: [48, 48],
          iconAnchor: [24, 48],
        });

        setIcon(defaultIcon);
        setCurrentLocationIcon(currentLocationCustomIcon);

        // Initialize map and get locations
        await initializeMap();

        // Get RVM locations
        const updatedRvmLocations = await getRvmLocations();
        const updatedMarkers = await Promise.all(
          updatedRvmLocations.map(async (marker) => {
            const position = [
              marker.position.latitude,
              marker.position.longitude,
            ];
            const locationName = await getLocationName(
              marker.position.latitude,
              marker.position.longitude
            );
            return { ...marker, position, locationName };
          })
        );
        setRvmLocations(updatedMarkers);
      };

      initialize();
    }
  }, []);

  const handleMarkerClick = (rvm) => {
    if (!currentLocation) {
      setLocationError(
        'Please enable location services to see distance and routing'
      );
      return;
    }

    setSelectedLocation({
      lat: rvm.position[0],
      lng: rvm.position[1],
      name: rvm.name,
    });

    const currentLatLng = L.latLng(currentLocation);
    const rvmLatLng = L.latLng(rvm.position[0], rvm.position[1]);

    const calculatedDistance = currentLatLng.distanceTo(rvmLatLng);
    setDistance(calculatedDistance);

    if (mapRef.current) {
      if (routeRef.current) {
        mapRef.current.removeControl(routeRef.current);
      }

      const route = L.Routing.control({
        waypoints: [currentLatLng, rvmLatLng],
        routeWhileDragging: true,
        lineOptions: { styles: [{ color: 'blue', weight: 4 }] },
        show: false,
        addWaypoints: false,
      }).addTo(mapRef.current);

      routeRef.current = route;
    }
  };

  const handleSearch = () => {
    const filteredLocations = rvmLocations.filter((rvm) =>
      rvm.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setRvmLocations(filteredLocations);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen w-full relative">
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-blue-500 text-white p-2 text-center">
          Loading your location...
        </div>
      )}
      {locationError && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-red-500 text-white p-2 text-center">
          {locationError}
        </div>
      )}
      <MapContainer
        center={currentLocation || [-6.2088, 106.8456]}
        zoom={14}
        className="h-full w-full"
        whenCreated={(map) => {
          mapRef.current = map;
          map.zoomControl.setPosition('bottomright');
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {currentLocation && (
          <Marker position={currentLocation} icon={currentLocationIcon}>
            <Popup>
              <div className="font-bold">Your Current Location</div>
              <div>{locationName || 'Loading...'}</div>
            </Popup>
          </Marker>
        )}
        {icon &&
          rvmLocations.map((rvm) => (
            <Marker
              key={rvm.id}
              position={rvm.position}
              icon={icon}
              eventHandlers={{
                click: () => handleMarkerClick(rvm),
              }}
            >
              <Popup>
                <h3 className="font-bold">{rvm.name}</h3>
                <p>Location: {rvm.locationName}</p>
                <p>
                  Capacity: {rvm.capacity}% ({rvm.capacityStatus})
                </p>
                {rvm.image && (
                  <Image
                    src={rvm.image}
                    alt={rvm.name}
                    className="w-full h-auto my-2"
                  />
                )}
                {distance !== null && (
                  <p>
                    Distance:{' '}
                    {distance >= 1000
                      ? `${(distance / 1000).toFixed(2)} km`
                      : `${distance.toFixed(2)} m`}
                  </p>
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <button
        onClick={() => {
          if (!mapRef.current || !currentLocation) {
            setLocationError('Unable to find your location');
            return;
          }
          mapRef.current.setView(currentLocation, 14);
        }}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 z-50"
      >
        My Location
      </button>
    </div>
  );
}
