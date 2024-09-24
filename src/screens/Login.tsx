import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LoginComponent from "../components/LoginComponent";

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (username: string, password: string) => {
    // Hårdkodad användare och lösenord
    if (username === "user" && password === "pass") {
      login(); // Sätt inloggad till true
      navigate("/"); // Navigera till Home
    } else {
      setError("Fel användarnamn eller lösenord");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginComponent onLogin={handleLogin} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;