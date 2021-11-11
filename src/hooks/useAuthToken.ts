import { useEffect, useState } from 'react';

const storageKey = 'AuthToken';

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(storageKey);
    if (savedToken != null) {
      setToken(savedToken);
    }
  }, []);

  const setAuthToken = (authToken: string | null) => {
    if (authToken != null) {
      localStorage.setItem(storageKey, authToken);
      setToken(token);
    } else {
      localStorage.removeItem(storageKey);
      setToken(null);
    }
  };

  return [token, setAuthToken] as const;
}
