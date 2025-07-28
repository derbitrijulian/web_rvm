'use client';
import { fetchUser } from '@/services/user-service';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUser();
      setUserDetail(data);
    } catch (err) {
      setError(err.message || 'Error fetching user profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userDetail, error, loading, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
