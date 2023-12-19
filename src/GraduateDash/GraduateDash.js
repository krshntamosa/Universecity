import React, { useState } from "react";
import "./GraduateDash.css";
import "./GraduateDash.module.css";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const GraduateDash = () => {
  const universities = ["CIT-U", "USC-SC", "USJR-Main"];
  const collegeDepartments = ["BSCpE", "BSCS", "BSIT"];

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
  };

  const [firstName, setFirstName] = useState("Adrian");
  const [lastName, setLastName] = useState("Andaya");
  const [email, setEmail] = useState("adrian.andaya@cit.edu");
  const [university, setUniversity] = useState(
    "Cebu Institute of Technology - Univer..."
  );
  const [collegeDepartment, setCollegeDepartment] = useState(
    "College of Engineering and Architec..."
  );
  const [collegeProgram, setCollegeProgram] = useState(
    "Computer Engineering..."
  );
  const [password, setPassword] = useState("123456");

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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="university">
              <Form.Label>University</Form.Label>
              <Form.Control
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="collegeDepartment">
              <Form.Label>College Department</Form.Label>
              <Form.Control
                type="text"
                value={collegeDepartment}
                onChange={(e) => setCollegeDepartment(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="collegeProgram">
              <Form.Label>College Program</Form.Label>
              <Form.Control
                type="text"
                value={collegeProgram}
                onChange={(e) => setCollegeProgram(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

export default GraduateDash;
