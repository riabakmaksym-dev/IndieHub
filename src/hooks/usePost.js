import { useState } from 'react';
    
export const usePost = (mutateFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutateFunction(...args);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      const errorMsg = err.message || 'Помилка при відправці даних';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data };
};

export default usePost;