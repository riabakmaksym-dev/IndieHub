import { useState, useEffect, useCallback } from 'react';

export const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'Помилка при завантаженні даних');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    let isCancelled = false;

    fetchFunction()
      .then((result) => {
        if (!isCancelled) {
          setData(result);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err.message || 'Помилка при завантаженні даних');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [fetchFunction]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;