import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  loginUser as loginApi,
  logoutUser as logoutApi,
  getAccessToken,
} from "../lib/data";
import type { LoginRequest, User } from "../types/types";

interface AuthContextType {
  user: User | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const { data } = await getCurrentUser();
          setUser(data);
        } catch (_error) {
          console.error("Token expired or invalid");
          logoutApi();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    await loginApi(credentials);
    const { data } = await getCurrentUser();
    setUser(data);
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)!;
