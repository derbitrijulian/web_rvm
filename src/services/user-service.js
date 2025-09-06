export async function fetchUser() {
  try {
    const response = await fetch('/api/profile', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error fetching user profile');
    }

    return {
      code: 200,
      data: data,
    };
  } catch (error) {
    throw error;
  }
}

export async function fetchUserWithBottleCount(userId) {
  try {
    // The profile API already includes bottle count
    const response = await fetch('/api/profile', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error fetching user profile');
    }

    return {
      code: 200,
      data: data,
    };
  } catch (error) {
    throw error;
  }
}

export async function fetchBottleHistory(userId, page = 1, limit = 10) {
  try {
    const response = await fetch(
      `/api/bottles/history?userId=${userId}&page=${page}&limit=${limit}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error fetching bottle history');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function addBottles(
  userId,
  amount,
  rvmLocationId = null,
  description = null
) {
  try {
    const response = await fetch('/api/bottles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        action: 'add',
        amount,
        rvmLocationId,
        description,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error adding bottles');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function redeemBottles(userId, amount, description = null) {
  try {
    const response = await fetch('/api/bottles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        action: 'redeem',
        amount,
        description,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error redeeming bottles');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
