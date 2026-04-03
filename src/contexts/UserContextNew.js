'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUser, fetchUserWithBottleCount } from '../services/user-service';

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await fetchUser();

      if (userData.code === 200) {
        console.log('✅ User data loaded:', userData.data?.email || 'unknown');
        setUserDetail(userData.data);
      } else {
        throw new Error(userData.message || 'Failed to load user data');
      }
    } catch (error) {
      // Check if error is auth-related (401/403)
      if (
        error.message?.includes('401') ||
        error.message?.includes('403') ||
        error.message?.includes('Token tidak')
      ) {
        console.warn('⚠️ User not authenticated or token expired');
        // This is expected - user just isn't logged in yet
        setError(null);
        setUserDetail(null);
      } else if (
        error.message?.includes('404') ||
        error.message?.includes('tidak ditemukan')
      ) {
        console.warn('⚠️ User profile not found');
        setError(null);
        setUserDetail(null);
      } else {
        // Real server error
        console.error('❌ Error loading user:', error.message);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserWithBottles = async (userId) => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await fetchUserWithBottleCount(userId);

      if (userData.code === 200) {
        console.log(
          '✅ User data with bottles loaded:',
          userData.data?.email || 'unknown'
        );
        setUserDetail(userData.data);
      } else {
        throw new Error(userData.message || 'Failed to load user data');
      }
    } catch (error) {
      // Check if error is auth-related (401/403)
      if (
        error.message?.includes('401') ||
        error.message?.includes('403') ||
        error.message?.includes('Token tidak')
      ) {
        console.warn('⚠️ User not authenticated or token expired');
        setError(null);
        setUserDetail(null);
      } else if (
        error.message?.includes('404') ||
        error.message?.includes('tidak ditemukan')
      ) {
        console.warn('⚠️ User profile not found');
        setError(null);
        setUserDetail(null);
      } else {
        // Real server error
        console.error('❌ Error loading user with bottles:', error.message);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = () => {
    loadUser();
  };

  const clearUserData = () => {
    setUserDetail(null);
    setError(null);
    setIsLoading(false);
  };

  // Auto load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    userDetail,
    isLoading,
    error,
    loadUser,
    loadUserWithBottles,
    refreshUserData,
    clearUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
