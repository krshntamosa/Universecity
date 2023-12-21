import React, { useState, useEffect } from "react";
import { Button, Form, Card, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import { signOut } from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  child,
  get,
  update,
  remove,
} from "firebase/database";

const UniversityList = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [newUniversity, setNewUniversity] = useState({
    name: "",
    campus: "",
    collegeDepartments: [],
    collegePrograms: [],
    website: "",
    description: "",
  });

  // Function to open the modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const createUniversity = () => {
    const db = getDatabase();
    const universitiesRef = ref(db, "universities");

    // Push the new university data to the database
    const newUniversityRef = push(universitiesRef);
    update(newUniversityRef, newUniversity);

    // Clear the form fields
    setNewUniversity({
      name: "",
      campus: "",
      collegeDepartments: [],
      collegePrograms: [],
      website: "",
      description: "",
    });

    // Close the modal
    handleCloseModal();
  };

  const fetchUniversities = () => {
    const db = getDatabase();
    const universitiesRef = ref(db, "universities");

    // Fetch the universities from the database
    get(universitiesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const universityData = [];
          snapshot.forEach((childSnapshot) => {
            const university = childSnapshot.val();
            university.id = childSnapshot.key; // Add the id property
            universityData.push(university);
          });
          setUniversities(universityData);
        } else {
          console.log("No university data available.");
        }
      })
      .catch((error) => {
        console.error("Firebase university fetch error:", error);
      });
  };

  const deleteUniversity = (universityId) => {
    const db = getDatabase();
    const universityRef = ref(db, `universities/${universityId}`);

    // Remove the university record from the database
    remove(universityRef);
  };

  const updateUniversity = (universityId, updatedUniversityData) => {
    const db = getDatabase();
    const universityRef = ref(db, `universities/${universityId}`);

    // Update the university data in the database
    update(universityRef, updatedUniversityData);
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

  useEffect(() => {
    // Fetch universities when the component mounts
    fetchUniversities();
  }, []);

  return (
    <div className="UniversityList">
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
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UniversityList;
