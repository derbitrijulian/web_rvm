/**
 * Service untuk mengelola RVM locations
 */

// Fetch all RVM locations
export const getRvmLocations = async () => {
  try {
    const response = await fetch('/api/rvm-locations', {
      method: 'GET',
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RVM locations');
    }

    const data = await response.json();

    if (data.code === 200 && data.data?.data) {
      return data.data.data.map((location) => ({
        id: location.id,
        name: location.name,
        position: {
          latitude: location.position.latitude,
          longitude: location.position.longitude,
        },
        capacity: location.capacity,
        capacityStatus: location.capacityStatus,
        image: location.image,
        created_at: location.created_at,
        updated_at: location.updated_at,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching RVM locations:', error);
    return [];
  }
};

// Fetch single RVM location by ID
export const getRvmLocationById = async (id) => {
  try {
    const response = await fetch(`/api/rvm-locations/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RVM location');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching RVM location:', error);
    throw error;
  }
};

// Create new RVM location
export const createRvmLocation = async (locationData) => {
  try {
    const response = await fetch('/api/rvm-locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create RVM location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating RVM location:', error);
    throw error;
  }
};

// Update RVM location
export const updateRvmLocation = async (id, locationData) => {
  try {
    const response = await fetch(`/api/rvm-locations/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update RVM location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating RVM location:', error);
    throw error;
  }
};

// Delete RVM location
export const deleteRvmLocation = async (id) => {
  try {
    const response = await fetch(`/api/rvm-locations?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete RVM location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting RVM location:', error);
    throw error;
  }
};

// Search RVM locations by name or area
export const searchRvmLocations = async (query) => {
  try {
    const locations = await getRvmLocations();
    return locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching RVM locations:', error);
    return [];
  }
};

// Get nearby RVM locations based on user coordinates
export const getNearbyRvmLocations = async (
  userLat,
  userLng,
  radiusKm = 10
) => {
  try {
    const locations = await getRvmLocations();

    // Calculate distance for each location
    const locationsWithDistance = locations.map((location) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        location.position.latitude,
        location.position.longitude
      );

      return {
        ...location,
        distance: distance,
      };
    });

    // Filter by radius and sort by distance
    return locationsWithDistance
      .filter((location) => location.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error('Error getting nearby RVM locations:', error);
    return [];
  }
};

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};
