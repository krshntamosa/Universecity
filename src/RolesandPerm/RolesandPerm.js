import React, { useState, useEffect } from "react";
import "./RolesandPerm.css";
import "./RolesandPerm.module.css";
import { Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import { updatePassword } from "firebase/auth";

const RolesandPerm = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    collegeDepartment: "",
    collegeProgram: "",
  });

  const handleMouseEnter = () => {
    setExpanded(true);
    setTimeout(() => {
      setShowText(true);
    }, 150);
  };
  const handleMouseLeave = () => {
    setExpanded(false);
    setShowText(false);
  };

  return (
    <div className="profileView">
      <div
        className={`sidebar ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to="/profile-view">
          <button className="account">
            <img className="account-icon" alt="" src="/images/vector7.svg" />
            {isExpanded && showText && (
              <span className="sidebar-text">Account</span>
            )}
          </button>
        </Link>
        <Link to="/university-list">
          <button className="university-icon">
            <img
              className="university-icon1"
              alt=""
              src="/images/vector6.svg"
            />
            {isExpanded && showText && (
              <span className="sidebar-text">University List</span>
            )}
          </button>
        </Link>
        <Link to="/roles-and-permissions">
          <button className="roles-and-permissions">
            <img
              className="roles-and-permissions1"
              alt=""
              src="/images/vector2.svg"
            />
            {isExpanded && showText && (
              <span className="sidebar-text">Roles and Permissions</span>
            )}
          </button>
        </Link>
        <Link to={"/graduate-list"}>
          <button className="users-icon">
            <img
              className="users-icon1"
              alt=""
              src="/images/users-icon-1.svg"
            />
            {isExpanded && showText && (
              <span className="sidebar-text">Graduate List</span>
            )}
          </button>
        </Link>
        <Link to="/admin-list">
          <button className="admin-list">
            <img
              className="admin-list-icon"
              alt=""
              src="/images/vector11.svg"
            />
            {isExpanded && showText && (
              <span className="sidebar-text">Admin List</span>
            )}
          </button>
        </Link>
        <Link to="/graduate-dashboard">
          {" "}
          <button className="home-icon">
            <img className="home-icon1" alt="" src="/images/home-icon.svg" />
            {isExpanded && showText && (
              <span className="sidebar-text">Dashboard</span>
            )}
          </button>
        </Link>
      </div>
      <div className="header">
        <button className="universecity">
          <img className="vector-icon" alt="" src="/images/LogoNavBar.png" />
        </button>
        <button className="notification-bell">
          <img
            className="notification-icon"
            alt=""
            src="/images/notification.svg"
          />
        </button>
      </div>
    </div>
  );
};

export default RolesandPerm;
