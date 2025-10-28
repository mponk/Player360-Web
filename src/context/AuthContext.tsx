import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type User = {
  id: string;
  name: string;
  role: string; // "coach"
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load saved auth from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("p360_token");
    const savedUser = localStorage.getItem("p360_user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(newToken: string, newUser: User) {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("p360_token", newToken);
    localStorage.setItem("p360_user", JSON.stringify(newUser));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("p360_token");
    localStorage.removeItem("p360_user");
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
