export const getRvmLocations = async () => {
  try {
    const response = await fetch('/api/rvm-locations');

    if (!response.ok) {
      throw new Error('Failed to fetch RVM locations');
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Expected JSON response from the server');
    }

    const data = await response.json();

    if (Array.isArray(data.locations)) {
      return data.locations;
    } else {
      throw new Error('Invalid data format: locations should be an array');
    }
  } catch (error) {
    console.error('Error fetching RVM locations:', error);
    return [];
  }
};
