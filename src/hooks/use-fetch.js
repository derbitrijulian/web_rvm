"use client";
import { useState, useEffect, useCallback } from "react";

export  function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (controller = null) => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        signal: controller?.signal,
        credentials: "include", // penting jika pakai cookie auth
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setData(result.data ?? result);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller);
    return () => controller.abort();
  }, [fetchData]);

  // 👉 fungsi refetch bisa dipanggil manual
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return [data, loading, error, refetch];
}
