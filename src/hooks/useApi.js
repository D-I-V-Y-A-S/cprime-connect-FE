//Import Area Start
import { useState } from 'react';
import { apiCall } from '../utils/api';
//Import Area End

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(config);
      return response;
    } catch (err) {
      console.log(err.message);
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}
