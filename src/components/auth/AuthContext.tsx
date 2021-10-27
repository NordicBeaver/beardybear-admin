import React, { useContext, useState } from 'react';

interface AuthContextValues {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValues | undefined>(undefined);

function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [token, setToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setToken('FAKE TOKEN');
  };

  const logout = () => {
    setToken(null);
  };

  const authContextValues: AuthContextValues = {
    token: token,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={authContextValues}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
