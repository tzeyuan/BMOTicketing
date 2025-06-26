import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  const login = (user: string) => {
    localStorage.setItem("username", user);
    setUsername(user);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
