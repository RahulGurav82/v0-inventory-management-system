'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { phone: string; location: string } | null;
  login: (phone: string, location: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ phone: string; location: string } | null>(null);

  // Check for stored auth on mount
  React.useEffect(() => {
    const storedAuth = localStorage.getItem('inventory_auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(authData);
    }
  }, []);

  const login = useCallback((phone: string, location: string) => {
    const userData = { phone, location };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('inventory_auth', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('inventory_auth');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
