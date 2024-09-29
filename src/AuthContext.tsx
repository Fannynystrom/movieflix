import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { User, signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { auth } from "../config/firebase";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // logs out after 30 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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

  const login = useCallback((user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    Cookies.set("isAuthenticated", "true");
  }, []);

  const logout = useCallback(() => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        Cookies.remove("isAuthenticated");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
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
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [isAuthenticated, resetTimer]);

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout }}
    >
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
