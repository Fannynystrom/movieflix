import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // logs out after 30 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Cookies.get("isAuthenticated") === "true";
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logout();
    }, INACTIVITY_TIMEOUT);
  }, []);

  const login = useCallback(() => setIsAuthenticated(true), []);
  const logout = useCallback(() => setIsAuthenticated(false), []);

  useEffect(() => {
    if (isAuthenticated) {
      Cookies.set("isAuthenticated", "true");
      resetTimer();

      const activityEvents = ["mousedown", "keydown", "touchstart", "scroll"];
      const handleActivity = () => resetTimer();

      activityEvents.forEach((event) =>
        document.addEventListener(event, handleActivity),
      );

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        activityEvents.forEach((event) =>
          document.removeEventListener(event, handleActivity),
        );
      };
    } else {
      Cookies.remove("isAuthenticated");
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [isAuthenticated, resetTimer]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
