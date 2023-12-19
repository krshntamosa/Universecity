import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import GraduateDash from "./GraduateDash/GraduateDash";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { auth } from "./firebase";
import PrivateRoute from "./PrivateRoute";
import Testing from "./Testing/Testing";
import ProfileView from "./ProfileView/ProfileView";

const App = () => {
  const [user] = useAuthState(auth);

  // const PrivateRoute = ({ path, element }) => {
  //   return user ? (
  //     <Route path={path} element={element} />
  //   ) : (
  //     <Navigate to="/login" replace />
  //   );
  // };

  return (
    <Router>
      <Routes>
        {/* Public routes accessible to all users */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/graduate-dashboard" element={<GraduateDash />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/profile-view" element={<ProfileView />} />

        {/* <Route
          path="/graduate-dash"
          element={
            <PrivateRoute>
              <GraduateDash />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
