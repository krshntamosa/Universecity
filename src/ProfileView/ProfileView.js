import React, { useState, useEffect } from "react";
import "./ProfileView.css";
import "./ProfileView.module.css";
import { Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const ProfileView = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    department: "",
    program: "",
    password: "",
  });

  const [isExpanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const dbRef = ref(database, `users/${userId}`);
          const snapshot = await get(dbRef);

          if (snapshot.exists()) {
            const userDataFromDB = snapshot.val();
            console.log("userDataFromDB:", userDataFromDB);
            setUserData(userDataFromDB);
          } else {
            console.log("No data available");
          }
        } else {
          console.log("User not authenticated");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

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
      <div>
        <div className="white-background">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={userData.firstName} readOnly />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={userData.lastName} readOnly />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" value={userData.email} readOnly />
              </Form.Group>

              <Form.Group controlId="university">
                <Form.Label>University</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.university}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="collegeDepartment">
                <Form.Label>College Department</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.department}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="collegeProgram">
                <Form.Label>College Program</Form.Label>
                <Form.Control type="text" value={userData.program} readOnly />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" value={userData.password} readOnly />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
