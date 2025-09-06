'use client';

import { useState, useEffect } from 'react';
import {
  fetchUserWithBottleCount,
  fetchBottleHistory,
  addBottles,
  redeemBottles,
} from '../services/user-service.js';

export default function BottleCountDisplay({ userId }) {
  const [bottleData, setBottleData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadBottleData();
    loadHistory();
  }, [userId]);

  const loadBottleData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bottles?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setBottleData(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const data = await fetchBottleHistory(userId, 1, 5); // Load last 5 transactions
      if (data.success) {
        setHistory(data.data.transactions);
      }
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const handleAddBottles = async (amount) => {
    try {
      setActionLoading(true);
      await addBottles(userId, amount, null, `Manual add ${amount} bottles`);
      await loadBottleData();
      await loadHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRedeemBottles = async (amount) => {
    try {
      setActionLoading(true);
      await redeemBottles(
        userId,
        amount,
        `Redeem ${amount} bottles for reward`
      );
      await loadBottleData();
      await loadHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={loadBottleData}
          className="mt-2 text-red-600 hover:text-red-800 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bottle Count Card */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">My Bottle Count</h3>
            <div className="space-y-1">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">
                  {bottleData?.totalBottles || 0}
                </span>
                <span className="text-sm opacity-90">Total Bottles</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold">
                  {bottleData?.redeemableCount || 0}
                </span>
                <span className="text-sm opacity-90">Available for Redeem</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg">
                  {bottleData?.lifetimeCount || 0}
                </span>
                <span className="text-sm opacity-90">Lifetime Total</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-xs mt-2 opacity-75">
              Last updated:{' '}
              {bottleData?.lastUpdated
                ? new Date(bottleData.lastUpdated).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAddBottles(1)}
          disabled={actionLoading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          {actionLoading ? 'Processing...' : '+ Add Bottle'}
        </button>
        <button
          onClick={() => handleRedeemBottles(1)}
          disabled={actionLoading || (bottleData?.redeemableCount || 0) < 1}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          {actionLoading ? 'Processing...' : 'Redeem Bottle'}
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4">Recent Transactions</h4>
        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.type === 'DEPOSIT' && '+ Deposit'}
                    {transaction.type === 'REDEEM' && '- Redeem'}
                    {transaction.type === 'ADJUSTMENT' && '± Adjustment'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                </div>
                <div
                  className={`font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}
                  {Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No transactions yet</p>
        )}
      </div>
    </div>
  );
}

// Hook untuk menggunakan bottle count
export function useBottleCount(userId) {
  const [bottleData, setBottleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bottles?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setBottleData(data.data);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      refresh();
    }
  }, [userId]);

  return {
    bottleData,
    loading,
    error,
    refresh,
  };
}
