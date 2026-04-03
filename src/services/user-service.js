export async function fetchUser() {
  try {
    const response = await fetch('/api/profile', {
      method: 'GET',
      credentials: 'include',
    });

    // Check response status BEFORE parsing JSON
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Unknown error' }));
      const errorMessage =
        errorData.message ||
        `HTTP ${response.status}: Error fetching user profile`;

      // Only log non-auth errors (401/403 is expected when not logged in)
      if (response.status !== 401 && response.status !== 403) {
        console.error('❌ Profile API Error:', {
          status: response.status,
          message: errorMessage,
        });
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('✅ User profile loaded successfully');

    return {
      code: 200,
      data: data,
    };
  } catch (error) {
    // Don't log 401/403 auth errors as they're expected
    if (!error.message?.includes('401') && !error.message?.includes('403')) {
      console.error('fetchUser error:', error.message);
    }
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

    // Check response status BEFORE parsing JSON
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Unknown error' }));
      const errorMessage =
        errorData.message ||
        `HTTP ${response.status}: Error fetching user profile`;

      // Only log non-auth errors (401/403 is expected when not logged in)
      if (response.status !== 401 && response.status !== 403) {
        console.error('❌ Profile API Error:', {
          status: response.status,
          message: errorMessage,
        });
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('✅ User profile with bottles loaded successfully');

    return {
      code: 200,
      data: data,
    };
  } catch (error) {
    // Don't log 401/403 auth errors as they're expected
    if (!error.message?.includes('401') && !error.message?.includes('403')) {
      console.error('fetchUserWithBottleCount error:', error.message);
    }
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

export async function fetchTransactionHistory(page = 1, limit = 20) {
  try {
    const response = await fetch(
      `/api/transactions/history?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error fetching transaction history');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function claimPoints(bottleCountIds = []) {
  try {
    const response = await fetch('/api/bottle-count/claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        detectionIds: bottleCountIds,
        claimAll: bottleCountIds.length === 0,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error claiming points');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
