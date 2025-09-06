'use client';
import { useEffect, useRef } from 'react';

export default function LeafletMap({ currentLocation, locations }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      mapRef.current &&
      !mapInstanceRef.current
    ) {
      // Import Leaflet only on client side
      import('leaflet')
        .then((L) => {
          // Fix for default markers
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          });

          // Initialize map
          const map = L.map(mapRef.current).setView(
            currentLocation || [-6.2088, 106.8456], // Default to Jakarta
            currentLocation ? 15 : 11
          );

          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(map);

          // Add current location marker if available
          if (currentLocation) {
            L.marker(currentLocation)
              .addTo(map)
              .bindPopup('Your Current Location')
              .openPopup();
          }

          // Add RVM location markers
          if (locations && Array.isArray(locations)) {
            locations.forEach((location) => {
              if (location.position && typeof location.position === 'object') {
                const { lat, lng } = location.position;
                if (lat && lng) {
                  L.marker([lat, lng]).addTo(map).bindPopup(`
                    <div>
                      <h3 class="font-bold">${location.name}</h3>
                      <p class="text-sm">Capacity: ${location.capacity}</p>
                      <p class="text-sm">Status: ${location.capacityStatus}</p>
                    </div>
                  `);
                }
              }
            });
          }

          mapInstanceRef.current = map;
        })
        .catch((error) => {
          console.error('Error loading Leaflet:', error);
        });
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [currentLocation, locations]);

  return (
    <div
      ref={mapRef}
      className="w-full h-64 rounded-lg border"
      style={{ minHeight: '256px' }}
    />
  );
}
