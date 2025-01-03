'use client';
import { createContext, useContext, useState, useEffect } from 'react';


const BottleContext = createContext();
export function BottleProvider({ children }) {
  const [bottleCount, setBottleCount] = useState(0);
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;
    const fetchBottleData = async () => {
      try {
        const response = await fetch('/api/bottle-count');
        if (!response.ok) {
          throw new Error('Failed to fetch bottle data');
        }

        const data = await response.json();
        console.log(data)
        setBottleCount(data.bottleData.bottleCount);
        setPoints(data.bottleData.points)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBottleData();
    interval = setInterval(fetchBottleData, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <BottleContext.Provider value={{ points,bottleCount, loading, error }}>
      {children}
    </BottleContext.Provider>
  );
}

export function useBottle() {
  return useContext(BottleContext);
}
