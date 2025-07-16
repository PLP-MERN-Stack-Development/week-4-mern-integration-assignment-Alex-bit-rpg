import { useState, useCallback } from 'react';

const useApi = (initialUrl = null, initialMethod = 'GET') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url = initialUrl, method = initialMethod, body = null) => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const result = await response.json();
      setData(result);
      return result; // Return data for immediate use (e.g., in forms)
    } catch (err) {
      setError(err);
      console.error("API call error:", err);
      throw err; // Re-throw to allow component to handle
    } finally {
      setLoading(false);
    }
  }, [initialUrl, initialMethod]);

  return { data, loading, error, fetchData };
};

export default useApi;