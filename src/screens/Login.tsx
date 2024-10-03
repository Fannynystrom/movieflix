import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LoginComponent from "../components/LoginComponent";
import { User } from "firebase/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSuccess = (user: User) => {
    login(user);
    navigate("/");
  };

  return (
    <div>
      <LoginComponent onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
