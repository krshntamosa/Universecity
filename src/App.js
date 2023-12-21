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
import WorkHistory from "./ProfileView/WorkHistory";
import GraduateList from "./GraduateList/GraduateList";
import UniversityList from "./UniversityList/UniversityList";
import AdminList from "./AdminList/AdminList";
import RolesandPerm from "./RolesandPerm/RolesandPerm";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        {/* Public routes accessible to all users */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/graduate-dashboard" element={<GraduateDash />} />
        <Route path="/testing" element={<WorkHistory />} />
        <Route path="/profile-view" element={<ProfileView />} />
        <Route path="/graduate-list" element={<GraduateList />} />
        <Route path="/university-list" element={<UniversityList />} />
        <Route path="/admin-list" element={<AdminList />} />
        <Route path="/roles-and-permissions" element={<RolesandPerm />} />
      </Routes>
    </Router>
  );
};

export default App;
