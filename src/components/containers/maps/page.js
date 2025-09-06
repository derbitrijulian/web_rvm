'use client';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { getLocationName } from '../../../utils/location';
import { useLocation } from '../../../contexts/LocationContext';
import Image from 'next/image';

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
  const {
    selectedLocation,
    setSelectedLocation,
    currentLocation: contextCurrentLocation,
    setCurrentLocation: setContextCurrentLocation,
  } = useLocation();
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

  const fetchRvmLocations = async () => {
    try {
      const res = await fetch('/api/rvm-locations');
      if (!res.ok) {
        throw new Error('Failed to fetch RVM locations');
      }

      const response = await res.json();
      if (response.code === 200 && response.data?.data) {
        const transformedData = response.data.data.map((item) => ({
          id: item.id,
          name: item.name,
          position: [item.position.latitude, item.position.longitude],
          locationName: 'Loading location...',
          capacity: item.capacity,
          capacityStatus: item.capacityStatus,
          created_at: item.created_at,
        }));

        setRvmLocations(transformedData);

        setTimeout(async () => {
          const updatedData = await Promise.all(
            transformedData.map(async (item) => {
              try {
                const locationName = await getLocationName(
                  item.position[1],
                  item.position[0]
                );
                return { ...item, locationName };
              } catch (error) {
                console.error('Error getting location name:', error);
                return { ...item, locationName: 'Location unavailable' };
              }
            })
          );
          setRvmLocations(updatedData);
        }, 500);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching RVM locations:', error);
      setLocationError('Failed to load RVM locations');
    }
  };

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
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const currentPos = [latitude, longitude];
      setCurrentLocation(currentPos);
      setContextCurrentLocation(currentPos); // Update context

      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 14);
      }

      // Get location name in background
      getLocationName(latitude, longitude)
        .then(setLocationName)
        .catch(() => setLocationName('Location unavailable'));

      // Start watching position after getting initial location
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos = [latitude, longitude];
          setCurrentLocation(newPos);
          setContextCurrentLocation(newPos); // Update context
          getLocationName(latitude, longitude)
            .then(setLocationName)
            .catch(() => setLocationName('Location unavailable'));
        },
        (error) => {
          console.error('Error watching position:', error);
          setLocationError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000, // Cache for 1 minute
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } catch (error) {
      console.error('Error getting initial position:', error);
      setLocationError(error.message);
      // Set default location if geolocation fails (e.g., Jakarta)
      const defaultPos = [-6.2088, 106.8456];
      setCurrentLocation(defaultPos);
      setContextCurrentLocation(defaultPos); // Update context
      setLocationName('Jakarta (Default)');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);

      const initialize = async () => {
        try {
          setIsLoading(true);
          console.log('Starting initialization...');

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

          // Fetch RVM locations from API
          await fetchRvmLocations();

          console.log('Initialization complete');
        } catch (error) {
          console.error('Initialization error:', error);
          setLocationError('Failed to initialize map');
        } finally {
          setIsLoading(false);
        }
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

    // Save selected location to context for navbar navigation
    setSelectedLocation({
      lat: rvm.position[0],
      lng: rvm.position[1],
      name: rvm.name,
      id: rvm.id,
    });

    const currentLatLng = L.latLng(currentLocation);
    const rvmLatLng = L.latLng(rvm.position[0], rvm.position[1]);

    const calculatedDistance = currentLatLng.distanceTo(rvmLatLng);
    setDistance(calculatedDistance);

    // Show route on map
    showRoute(currentLatLng, rvmLatLng);
  };

  const showRoute = (from, to) => {
    if (mapRef.current) {
      // Remove existing route
      if (routeRef.current) {
        mapRef.current.removeControl(routeRef.current);
      }

      // Create new route
      const route = L.Routing.control({
        waypoints: [from, to],
        routeWhileDragging: false,
        lineOptions: {
          styles: [
            {
              color: '#3B82F6',
              weight: 6,
              opacity: 0.8,
            },
          ],
        },
        show: true,
        addWaypoints: false,
        createMarker: () => null, // Don't create additional markers
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
        }),
      }).addTo(mapRef.current);

      // Store route reference
      routeRef.current = route;

      // Fit map to show entire route
      route.on('routesfound', function (e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const bounds = L.latLngBounds(routes[0].coordinates);
          mapRef.current.fitBounds(bounds, { padding: [20, 20] });
        }
      });
    }
  };

  // Listen for navigation requests from navbar
  useEffect(() => {
    if (selectedLocation && currentLocation) {
      const currentLatLng = L.latLng(currentLocation);
      const selectedLatLng = L.latLng(
        selectedLocation.lat,
        selectedLocation.lng
      );
      showRoute(currentLatLng, selectedLatLng);
    }
  }, [selectedLocation, currentLocation]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // If search is empty, fetch all locations again
      setIsLoading(true);
      fetchRvmLocations().finally(() => setIsLoading(false));
      return;
    }

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
          Loading your location and RVM data...
        </div>
      )}
      {locationError && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-red-500 text-white p-2 text-center">
          {locationError}
        </div>
      )}

      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-50 flex gap-2">
        <input
          type="text"
          placeholder="Search RVM locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={() => {
            setIsLoading(true);
            fetchRvmLocations().finally(() => setIsLoading(false));
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Refresh
        </button>
      </div>

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="absolute top-24 left-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-green-600">
                📍 Destination Selected
              </h3>
              <p className="text-sm text-gray-600">{selectedLocation.name}</p>
              {distance && (
                <p className="text-sm text-blue-600 font-semibold">
                  Distance:{' '}
                  {distance >= 1000
                    ? `${(distance / 1000).toFixed(2)} km`
                    : `${distance.toFixed(0)} m`}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Click the navigation button in the bottom navbar to open Google
                Maps
              </p>
            </div>
            <button
              onClick={() => {
                if (routeRef.current && mapRef.current) {
                  mapRef.current.removeControl(routeRef.current);
                  routeRef.current = null;
                }
                setSelectedLocation(null);
                setDistance(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* RVM Counter */}
      <div
        className={`absolute left-4 z-50 bg-white px-3 py-2 rounded-lg shadow-sm border transition-all duration-300 ${
          selectedLocation ? 'top-48' : 'top-20'
        }`}
      >
        <span className="text-sm font-medium text-gray-700">
          {rvmLocations.length} RVM locations found
        </span>
      </div>

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
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2">{rvm.name}</h3>
                  <p>
                    <strong>Location:</strong>{' '}
                    {rvm.locationName || 'Loading...'}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {rvm.capacity}%
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span
                      className={`ml-1 px-2 py-1 rounded text-xs ${
                        rvm.capacityStatus === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {rvm.capacityStatus}
                    </span>
                  </p>
                  <p>
                    <strong>Created:</strong>{' '}
                    {new Date(rvm.created_at).toLocaleDateString()}
                  </p>
                  {distance !== null && (
                    <p className="mt-2">
                      <strong>Distance:</strong>
                      <span className="ml-1 text-blue-600 font-semibold">
                        {distance >= 1000
                          ? `${(distance / 1000).toFixed(2)} km`
                          : `${distance.toFixed(0)} m`}
                      </span>
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Control buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {selectedLocation && (
          <button
            onClick={() => {
              // Clear route and selected location
              if (routeRef.current && mapRef.current) {
                mapRef.current.removeControl(routeRef.current);
                routeRef.current = null;
              }
              setSelectedLocation(null);
              setDistance(null);
            }}
            className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
            title="Clear Route"
          >
            ✕
          </button>
        )}

        <button
          onClick={() => {
            if (!mapRef.current || !currentLocation) {
              setLocationError('Unable to find your location');
              return;
            }
            mapRef.current.setView(currentLocation, 14);
          }}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
          title="My Location"
        >
          📍
        </button>
      </div>
    </div>
  );
}
