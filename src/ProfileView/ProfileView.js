import React, { useState, useEffect } from "react";
import "./ProfileView.css";
import "./ProfileView.module.css";
import { Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import { updatePassword } from "firebase/auth";





const ProfileView = () => {

 


  const [isExpanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [password, setPassword] = useState('');


   // New state for user data
   const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    university: '',
    collegeDepartment: '',
    collegeProgram: ''
  });

  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Authenticated user ID:", user.uid);
        // Fetch user data from Firebase
        fetchData(user.uid);
      } else {
        console.log("No user is currently logged in.");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchData = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Fetched user data:", snapshot.val());
        const data = snapshot.val();
        setUserData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          university: data.university || '',
          collegeDepartment: data.collegeDepartment || '',
          collegeProgram: data.collegeProgram || ''
        });
      } else {
        console.log("No data available for user ID:", userId);
      }
    }).catch((error) => {
      console.error("Firebase fetch error:", error);
    });
  };




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
    console.log("Form submitted");
  
    if (auth.currentUser && password) {
      console.log("Attempting to update password");
      updatePassword(auth.currentUser, password)
        .then(() => {
          console.log("Password updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating password:", error);
        });
    } else {
      console.log("User is not authenticated or password is empty");
    }
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
        <Card.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
            type="text"
            value={userData.firstName}
            readOnly
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
               type="text"
               value={userData.lastName}
               readOnly

              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={userData.email}
                readOnly
              />
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
                value={userData.collegeDepartment}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="collegeProgram">
              <Form.Label>College Program</Form.Label>
              <Form.Control
                type="text"
                value={userData.collegeProgram}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="password">
  <Form.Label>Password</Form.Label>
  <Form.Control
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter new password"
  />
</Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
};

export default ProfileView;
