import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate dari localStorage pas app mount
  useEffect(() => {
    const storedToken = window.localStorage.getItem("p360_token");
    const storedUser = window.localStorage.getItem("p360_user");

    if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          setToken(storedToken);
          setUser(parsedUser);
        } catch (err) {
          console.warn("Bad user data in localStorage, clearing.", err);
          window.localStorage.removeItem("p360_token");
          window.localStorage.removeItem("p360_user");
        }
    }

    setLoading(false);
  }, []);

  function login(newToken: string, newUser: User) {
    setToken(newToken);
    setUser(newUser);
    window.localStorage.setItem("p360_token", newToken);
    window.localStorage.setItem("p360_user", JSON.stringify(newUser));
  }

  function logout() {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem("p360_token");
    window.localStorage.removeItem("p360_user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
