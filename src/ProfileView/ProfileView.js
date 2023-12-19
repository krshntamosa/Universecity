import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, rtdb, fetchUserData } from "../firebase";

const ProfileView = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the current user
    const currentUser = auth.currentUser;

    // Update the user data in Realtime Database
    const userRef = rtdb.ref(`users/${currentUser.uid}`);
    userRef
      .update({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        university: user.university,
        collegeDepartment: user.collegeDepartment,
        collegeProgram: user.collegeProgram,
        password: user.password,
      })
      .then(() => {
        console.log("User data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user data: ", error);
      });
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    collegeDepartment: "",
    collegeProgram: "",
    password: "",
  });

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        fetchUserData(userId, (userData) => {
          setUser(userData);
        });
      } else {
        // Handle user signed out
      }
    });
  }, []);

  return (
    <div className="profileView">
      <div
        className={`sidebar ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="account">
          <img className="account-icon" alt="" src="/images/vector7.svg" />
          {isExpanded && showText && (
            <span className="sidebar-text">Account</span>
          )}
        </button>
        <button className="university-icon">
          <img className="university-icon1" alt="" src="/images/vector6.svg" />
          {isExpanded && showText && (
            <span className="sidebar-text">University List</span>
          )}
        </button>
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
        <button className="users-icon">
          <img className="users-icon1" alt="" src="/images/users-icon-1.svg" />
          {isExpanded && showText && (
            <span className="sidebar-text">Graduate List</span>
          )}
        </button>
        <button className="admin-list">
          <img className="admin-list-icon" alt="" src="/images/vector11.svg" />
          {isExpanded && showText && (
            <span className="sidebar-text">Admin List</span>
          )}
        </button>
        <Link to="/graduate-dashboard">
          {" "}
          <button className="home-icon">
            <img className="home-icon1" alt="" src="/images/home-icon.svg" />
            {isExpanded && showText && (
              <span className="sidebar-text">Home</span>
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
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </Form.Group>
          {/* ... other Form.Group elements */}
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Card.Body>
    </div>
  );
};

export default ProfileView;
