import React from "react";
import { useAuth } from "../firebase";
import { useNavigate } from "react-router";

const GraduateDash = ({ user }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body>
      <div>
        <p>TESTING</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </body>
  );
};

export default GraduateDash;
