import React, { useState } from "react";
import { signInWithEmailAndPassword, AuthError, User } from "firebase/auth";
import { auth } from "../../config/firebase";
import "../styles/LoginComponent.css";

interface LoginComponentProps {
  onLoginSuccess: (user: User) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      onLoginSuccess(userCredential.user);
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    }
  };

  return (
    <div className="login-component">
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-post</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Lösenord</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

export default LoginComponent;
