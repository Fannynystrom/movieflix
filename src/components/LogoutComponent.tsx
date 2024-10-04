import React from "react";
import { useAuth } from "../AuthContext"; // justera sökvägen om nödvändigt

const LogoutComponent: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logga ut
    </button>
  );
};

export default LogoutComponent;
