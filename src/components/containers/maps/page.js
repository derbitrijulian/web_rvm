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

export default function Map({ searchQuery = '' }) {
  const {
    selectedLocation,
    setSelectedLocation,
    currentLocation: contextCurrentLocation,
    setCurrentLocation: setContextCurrentLocation,
    permitLocationAccess,
  } = useLocation();
  const [icon, setIcon] = useState(null);
  const [currentLocationIcon, setCurrentLocationIcon] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [mapIsReady, setMapIsReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [rvmLocations, setRvmLocations] = useState([]);
  const [allRvmLocations, setAllRvmLocations] = useState([]);
  const mapRef = useRef(null);
  const routeRef = useRef(null);
  const hasInitialZoomRef = useRef(false);
  const lastLocationRef = useRef(null); // Track last location to apply threshold
  const userInteractedRef = useRef(false); // Track if user interacted with map
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  // Helper function to perform zoom to bounds with retry logic
  const zoomToLocations = (locations, initialDelay = 0, maxRetries = 5) => {
    console.log(
      '📍 zoomToLocations called with',
      locations?.length,
      'locations, delay:',
      initialDelay,
      'mapRef.current:',
      !!mapRef.current
    );

    if (!locations || locations.length === 0) {
      console.log('📭 No locations to zoom');
      return;
    }

    const performZoom = (retryCount = 0) => {
      console.log(
        `🔄 performZoom attempt ${retryCount + 1}, mapRef.current: ${!!mapRef.current}`
      );

      if (!mapRef.current) {
        if (retryCount < maxRetries) {
          const nextDelay = 150 * (retryCount + 1);
          console.log(
            `⏳ Attempt ${retryCount + 1}/${maxRetries}: Map not ready, retry in ${nextDelay}ms`
          );
          setTimeout(() => performZoom(retryCount + 1), nextDelay);
        } else {
          console.log('❌ Max retries reached - map still not available');
        }
        return;
      }

      try {
        // Create bounds array from locations
        const boundsList = locations
          .map((rvm) => {
            const pos = Array.isArray(rvm.position)
              ? rvm.position.map((coord) =>
                  typeof coord === 'string' ? parseFloat(coord) : coord
                )
              : rvm.position;

            if (!Array.isArray(pos) || pos.length !== 2) return null;

            const [lat, lng] = pos;
            if (isNaN(lat) || isNaN(lng)) return null;

            return [lat, lng];
          })
          .filter((pos) => pos !== null);

        if (boundsList.length === 0) {
          console.log('❌ No valid coordinates found');
          return;
        }

        console.log(
          '✨ Valid locations:',
          boundsList.length,
          'will use',
          boundsList.length === 1 ? 'setView' : 'fitBounds'
        );

        // Perform zoom
        if (boundsList.length === 1) {
          const [lat, lng] = boundsList[0];
          console.log('Calling setView with:', lat, lng, '16');
          mapRef.current.setView([lat, lng], 16);
          console.log('🎯 Zoomed to single location:', { lat, lng });
        } else {
          console.log('Calling fitBounds with:', boundsList.length, 'bounds');
          const bounds = L.latLngBounds(boundsList);
          mapRef.current.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 17,
          });
          console.log('🎯 Fit bounds to', boundsList.length, 'locations');
        }
      } catch (error) {
        console.error('❌ Error during zoom:', error);
      }
    };

    if (initialDelay > 0) {
      setTimeout(() => performZoom(0), initialDelay);
    } else {
      performZoom(0);
    }
  };

  const fetchRvmLocations = async () => {
    try {
      const res = await fetch('/api/rvm-locations');
      if (!res.ok) {
        throw new Error('Failed to fetch RVM locations');
      }

      const response = await res.json();
      if (response.code === 200 && response.data) {
        console.log('📥 Raw API response data:', response.data);

        const transformedData = response.data.map((item) => {
          const lat = item.position?.latitude;
          const lng = item.position?.longitude;
          console.log(`📍 Processing RVM ${item.name}:`, {
            latitude: lat,
            longitude: lng,
            isLatNumber: typeof lat === 'number',
            isLngNumber: typeof lng === 'number',
            latIsNaN: isNaN(lat),
            lngIsNaN: isNaN(lng),
          });

          return {
            id: item.id,
            name: item.name,
            position: [lat, lng],
            locationName: 'Loading location...',
            capacity: item.capacity,
            capacityStatus: item.capacityStatus,
            created_at: item.created_at,
          };
        });

        console.log('✅ Transformed data:', transformedData);
        setRvmLocations(transformedData);
        setAllRvmLocations(transformedData); // Store all locations

        setTimeout(async () => {
          const updatedData = await Promise.all(
            transformedData.map(async (item) => {
              try {
                const locationName = await getLocationName(
                  item.position[0],
                  item.position[1]
                );
                return { ...item, locationName };
              } catch (error) {
                console.error('Error getting location name:', error);
                return { ...item, locationName: 'Location unavailable' };
              }
            })
          );
          setRvmLocations(updatedData);
          setAllRvmLocations(updatedData); // Update stored locations
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
          timeout: 5000,
          maximumAge: 60000, // Allow cache for 60 seconds
        }
      );
    });
  };

  const startLocationTracking = async () => {
    try {
      console.log('📍 Starting location tracking...');
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const currentPos = [latitude, longitude];
      setCurrentLocation(currentPos);
      setContextCurrentLocation(currentPos); // Update context
      lastLocationRef.current = currentPos; // Store as last location

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

          // Only update if significantly moved (> 10 meters)
          if (lastLocationRef.current) {
            const lastLatLng = L.latLng(
              lastLocationRef.current[0],
              lastLocationRef.current[1]
            );
            const newLatLng = L.latLng(latitude, longitude);
            const distance = lastLatLng.distanceTo(newLatLng);

            // Only update if moved more than 10 meters
            if (distance < 10) {
              console.log(
                `📍 Distance moved: ${distance.toFixed(1)}m (threshold: 10m) - skipping update`
              );
              return;
            }
            console.log(
              `📍 Distance moved: ${distance.toFixed(1)}m - updating location`
            );
          }

          setCurrentLocation(newPos);
          setContextCurrentLocation(newPos); // Update context
          lastLocationRef.current = newPos; // Update last location
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
          maximumAge: 5000, // Cache for 5 seconds
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } catch (error) {
      console.error('❌ Error getting location:', error);
      // Use fallback location from context if available
      if (contextCurrentLocation) {
        console.log(
          '📍 Using fallback location from context:',
          contextCurrentLocation
        );
        setCurrentLocation(contextCurrentLocation);
        lastLocationRef.current = contextCurrentLocation;
        return;
      }
      // Use default Jakarta location
      console.log('🏙️ Using default location: Jakarta');
      setCurrentLocation([-6.2088, 106.8456]);
      setContextCurrentLocation([-6.2088, 106.8456]);
      lastLocationRef.current = [-6.2088, 106.8456];
      setLocationError(
        'Location permission denied. Showing RVM locations without your location.'
      );
    }
  };

  const initializeMap = async () => {
    // Map is initialized in JSX via whenCreated callback
    // This function is now just a placeholder for map setup (if needed)
    console.log('🗺️ Map initialized');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);

      const initialize = async () => {
        try {
          setIsLoading(true);
          console.log('🗺️ Starting map initialization...');

          // Initialize icons
          const defaultIcon = L.icon({
            iconUrl: '/svg/titik_rvm.svg',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          const currentLocationCustomIcon = L.icon({
            iconUrl: '/svg/titik.svg',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          setIcon(defaultIcon);
          setCurrentLocationIcon(currentLocationCustomIcon);

          // Fetch RVM locations from API (always, regardless of location permission)
          await fetchRvmLocations();

          console.log('✅ Map initialization complete');
        } catch (error) {
          console.error('❌ Initialization error:', error);
          setLocationError('Failed to initialize map');
        } finally {
          setIsLoading(false);
        }
      };

      initialize();
    }
  }, []);

  // Effect to start location tracking when permission is granted
  useEffect(() => {
    if (permitLocationAccess && mounted) {
      console.log(
        '✅ Location permission granted - starting location tracking'
      );
      startLocationTracking();
    }
  }, [permitLocationAccess, mounted]);

  // Effect to update map view when current location changes (only if user hasn't interacted)
  useEffect(() => {
    if (
      currentLocation &&
      mapRef.current &&
      !searchQuery &&
      !userInteractedRef.current
    ) {
      console.log('📍 Panning map to current location:', currentLocation);

      // Validate current location
      if (!Array.isArray(currentLocation) || currentLocation.length !== 2) {
        console.error('❌ Invalid currentLocation format:', currentLocation);
        return;
      }

      const [lat, lng] = currentLocation;
      if (isNaN(lat) || isNaN(lng)) {
        console.error('❌ Non-numeric current location:', lat, lng);
        return;
      }

      // Pan map to current location (smooth animation, no zoom change)
      mapRef.current.panTo(currentLocation);
    }
  }, [currentLocation, searchQuery]);

  const handleMarkerClick = (rvm) => {
    console.log('📍 Marker clicked:', rvm.name, 'position:', rvm.position);
    userInteractedRef.current = true; // Mark that user interacted with map

    if (!currentLocation) {
      setLocationError(
        'Please enable location services to see distance and routing'
      );
      return;
    }

    // Validate coordinates
    if (!Array.isArray(rvm.position) || rvm.position.length !== 2) {
      console.error('❌ Invalid marker position:', rvm.position);
      setLocationError('Invalid location coordinates');
      return;
    }

    const [lat, lng] = rvm.position;
    if (isNaN(lat) || isNaN(lng)) {
      console.error('❌ Non-numeric coordinates:', lat, lng);
      setLocationError('Invalid location coordinates');
      return;
    }

    // Save selected location to context for navbar navigation
    setSelectedLocation({
      lat: rvm.position[0],
      lng: rvm.position[1],
      name: rvm.name,
      id: rvm.id,
    });

    console.log(
      '📐 Calculating distance from',
      currentLocation,
      'to',
      lat,
      lng
    );
    const currentLatLng = L.latLng(currentLocation[0], currentLocation[1]);
    const rvmLatLng = L.latLng(lat, lng);

    const calculatedDistance = currentLatLng.distanceTo(rvmLatLng);
    setDistance(calculatedDistance);
    console.log('📏 Distance:', calculatedDistance, 'meters');

    // Zoom dan pan ke marker
    if (mapRef.current) {
      mapRef.current.setView(rvm.position, 16);
    }

    // Show route on map
    showRoute(currentLatLng, rvmLatLng);
  };

  const showRoute = (from, to) => {
    if (!mapRef.current) {
      console.log('❌ Map reference not available for routing');
      return;
    }

    try {
      // Remove existing route - handle both control and layer types
      if (routeRef.current) {
        try {
          // Try to remove as control (for L.Routing.control)
          if (
            routeRef.current.remove &&
            typeof routeRef.current.remove === 'function'
          ) {
            routeRef.current.remove();
            console.log('🗑️ Removed routing control');
          }
          // Try to remove from map as layer (for L.polyline)
          else if (routeRef.current._map && mapRef.current) {
            mapRef.current.removeLayer(routeRef.current);
            console.log('🗑️ Removed polyline layer');
          }
        } catch (removeError) {
          console.warn(
            '⚠️ Error removing previous route:',
            removeError.message
          );
        }
        routeRef.current = null;
      }

      console.log('🗺️ Creating route from', from, 'to', to);

      // Create new route with error handling
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
        show: false,
        addWaypoints: false,
        createMarker: () => null,
        summaryTemplate: '',
        altLineOptions: { styles: [] },
        showAlternatives: false,
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
        }),
      });

      // Add error handler BEFORE adding to map
      route.on('routeserror', function (e) {
        console.error('❌ Routing error:', e.error);
        // Show simple line without routing - cleanup routing control first
        try {
          if (mapRef.current && route && route.remove) {
            route.remove();
            console.log('🗑️ Removed failed routing control');
          }
        } catch (err) {
          console.warn('⚠️ Error removing routing control:', err.message);
        }

        // Show simple line without routing
        if (mapRef.current) {
          try {
            const line = L.polyline([from, to], {
              color: '#3B82F6',
              weight: 4,
              opacity: 0.6,
              dashArray: '5, 5',
            }).addTo(mapRef.current);
            routeRef.current = line;
            console.log('✅ Fallback: showing simple line');
          } catch (polylineError) {
            console.error(
              '❌ Error adding polyline fallback:',
              polylineError.message
            );
          }
        }
      });

      // Add success handler BEFORE adding to map
      route.on('routesfound', function (e) {
        if (!mapRef.current) {
          console.warn('⚠️ mapRef lost before routesfound');
          return;
        }
        console.log('✅ Route found successfully');
        const routes = e.routes;
        if (routes && routes.length > 0) {
          try {
            const bounds = L.latLngBounds(routes[0].coordinates);
            mapRef.current.fitBounds(bounds, { padding: [20, 20] });
          } catch (boundsError) {
            console.warn('⚠️ Error fitting bounds:', boundsError.message);
          }
        }
      });

      // Now add to map AFTER handlers are set
      try {
        route.addTo(mapRef.current);
        routeRef.current = route;
        console.log('✅ Route control added to map');
      } catch (addError) {
        console.error('❌ Error adding route to map:', addError.message);
        throw addError;
      }
    } catch (error) {
      console.error('❌ Error creating route:', error);
      // Fallback: show simple line between points
      try {
        if (mapRef.current) {
          const line = L.polyline([from, to], {
            color: '#FF6B6B',
            weight: 3,
            opacity: 0.5,
            dashArray: '10, 5',
          }).addTo(mapRef.current);
          routeRef.current = line;
          console.log('✅ Fallback: showing simple line (from catch)');
        }
      } catch (fallbackError) {
        console.error('❌ Even fallback failed:', fallbackError);
      }
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

  // Effect to handle zoom when all locations loaded (ONLY for initial load, not for updates)
  useEffect(() => {
    if (allRvmLocations.length > 0 && !hasInitialZoomRef.current) {
      console.log(
        '📍 Initial load - zooming to all',
        allRvmLocations.length,
        'locations'
      );
      hasInitialZoomRef.current = true;
      zoomToLocations(allRvmLocations, 100);
    }
  }, [allRvmLocations]); // Track allRvmLocations changes but only zoom first time

  // Monitor searchQuery prop changes and handle filtering
  useEffect(() => {
    if (!searchQuery || !searchQuery.trim()) {
      // Reset ke semua lokasi saat search kosong
      setRvmLocations(allRvmLocations);
      console.log(
        '🔍 Clear search, showing all',
        allRvmLocations.length,
        'locations'
      );
      return;
    }

    if (!allRvmLocations || allRvmLocations.length === 0) {
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filteredLocations = allRvmLocations.filter((rvm) => {
      const name = rvm.name ? rvm.name.toLowerCase() : '';
      const location = rvm.locationName ? rvm.locationName.toLowerCase() : '';
      const queryWords = query.split(/\s+/).filter((w) => w.length > 0);
      const nameMatch =
        queryWords.length > 0 &&
        queryWords.every((word) => name.includes(word));
      const locationMatch =
        queryWords.length > 0 &&
        queryWords.every((word) => location.includes(word));
      return nameMatch || locationMatch;
    });

    console.log('🔍 Filtered search results:', filteredLocations.length);
    setRvmLocations(filteredLocations);
  }, [searchQuery, allRvmLocations]);

  // Separate effect to handle zoom when filtered locations change (for search)
  useEffect(() => {
    // Only process if there's an active search query
    if (!searchQuery || !searchQuery.trim()) {
      console.log('🔍 No active search query');
      return;
    }

    console.log(
      '🔍 Search query:',
      searchQuery,
      '-> filtered results:',
      rvmLocations.length
    );

    // Only zoom if there are actual results
    if (rvmLocations.length === 0) {
      console.log('❌ Search returned 0 results - NOT zooming');
      return;
    }

    console.log('✅ Found', rvmLocations.length, 'results - zooming');
    zoomToLocations(rvmLocations, 300);
  }, [rvmLocations, searchQuery]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen w-full relative">
      <MapContainer
        center={currentLocation || [-6.2088, 106.8456]}
        zoom={14}
        className="h-full w-full"
        ref={mapRef}
        whenCreated={(map) => {
          console.log('🗺️ MapContainer whenCreated - setting mapRef');
          mapRef.current = map;
          console.log('✅ mapRef.current is now:', !!mapRef.current);
          // Hide default zoom control - akan pakai custom buttons
          map.zoomControl.remove();

          // Add event listeners to detect user interaction
          map.on('dragstart', () => {
            console.log('👆 User started dragging map');
            userInteractedRef.current = true;
          });
          map.on('wheel', () => {
            console.log('🔄 User scrolled map');
            userInteractedRef.current = true;
          });
          map.on('touchmove', () => {
            console.log('📱 User touched map');
            userInteractedRef.current = true;
          });
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
      <div className="fixed bottom-28 right-4 flex flex-col gap-2 z-50">
        {/* Focus to current location button */}
        {currentLocation && (
          <button
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView(currentLocation, 15);
                console.log('📍 Focused to current location:', currentLocation);
              }
            }}
            className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            title="Focus to My Location"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <circle
                cx="12"
                cy="12"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </button>
        )}

        {selectedLocation && (
          <button
            onClick={() => {
              // Clear route and selected location - safe cleanup
              if (routeRef.current && mapRef.current) {
                try {
                  // Try to remove as control (for L.Routing.control)
                  if (
                    routeRef.current.remove &&
                    typeof routeRef.current.remove === 'function'
                  ) {
                    routeRef.current.remove();
                  }
                  // Try to remove from map as layer (for L.polyline)
                  else if (routeRef.current._map) {
                    mapRef.current.removeLayer(routeRef.current);
                  }
                } catch (error) {
                  console.warn('⚠️ Error clearing route:', error.message);
                }
                routeRef.current = null;
              }
              setSelectedLocation(null);
              setDistance(null);
            }}
            className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            title="Clear Route"
          >
            ✕
          </button>
        )}

        {/* Zoom In/Out buttons */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.zoomIn();
                console.log('🔍 Zoomed in');
              }
            }}
            className="w-10 h-10 flex items-center justify-center text-blue-500 hover:bg-gray-100 transition-colors border-b border-gray-200 font-bold text-lg"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.zoomOut();
                console.log('🔍 Zoomed out');
              }
            }}
            className="w-10 h-10 flex items-center justify-center text-blue-500 hover:bg-gray-100 transition-colors font-bold text-lg"
            title="Zoom Out"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
}
