
export const getLocationName = async (lat, lng) => {
  const url = `/api/detail-locations?lat=${lat}&lon=${lng}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name || 'Unknown Location';
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown Location';
  }
};
