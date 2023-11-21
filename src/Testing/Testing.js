import React, { useState } from "react";
import "./Testing.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Testing = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
      navigate("/graduate-dashboard");
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <div className="loginContainer">
      <div className="leftContent">
        <div className="white-bg">
          <div className="registerText">
            <h2 className="loginHeader">Login</h2>
            <p>
              Don't have an account yet?{" "}
              <span className="registerLink">Register here</span>.
            </p>
            <div className="loginForm">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div>
                <input
                  className="rememberbox"
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <label className="rememberbtn" htmlFor="remember">
                  Remember me
                </label>
              </div>

              <button className="button-login" onClick={handleLogin}>
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="imagePlaceholder">
        <img src="./images/LoginVector.png" alt="Placeholder" />
      </div>
    </div>
  );
};

export default Testing;
