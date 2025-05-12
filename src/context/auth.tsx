import { useContext, useEffect, useState } from "react";
import * as React from "react";
// Define the shape of the auth context
export interface AuthContextType {
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  // signOut: () => void;
  user: string | null;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

const key = "authUser";

const validateCredentials = (username: string, password: string): boolean => {
  return password === "Password@12";
};

const getLocalData = () => {
  return localStorage.getItem(key) || null;
};

const setStoredUser = (user: string | null) => {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
};

// Auth provider component

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(getLocalData());
  const isAuthenticated = !!user;

  const login = React.useCallback(
    async (username: string, password: string) => {
      if (!validateCredentials(username, password)) {
        throw new Error("Invalid username or password");
      }
      setStoredUser(username);
      setUser(username);
    },
    []
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);
  

  useEffect(() => {
    setUser(getLocalData());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
