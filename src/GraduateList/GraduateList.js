import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, get, getDatabase } from "firebase/database";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";

import "./GraduateList.css";

const GraduateList = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    collegeDepartment: "",
    collegeProgram: "",
    role: "",
  });

  const [isExpanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedGraduate, setSelectedGraduate] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [graduates, setGraduates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  // New state for checkbox filters
  const [selectedYears, setSelectedYears] = useState({
    2018: false,
    2019: false,
    2020: false,
    2021: false,
    2022: false,
    2023: false,
  });
  const [selectedUniversities, setSelectedUniversities] = useState({});
  const [selectedDepartments, setSelectedDepartments] = useState({});

  useEffect(() => {
    // Fetch data when the component initially mounts
    fetchData();

    // Subscribe to changes in authentication status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Authenticated user ID:", user.uid);
      } else {
        console.log("No user is currently logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const openModal = (graduate) => {
    setSelectedGraduate(graduate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

  const filterGraduates = (graduates) => {
    return graduates.filter((graduate) => {
      const fullName =
        `${graduate.firstName} ${graduate.lastName}`.toLowerCase();

      // Check if the graduate's year matches any of the selected years
      const yearMatch = selectedYears[graduate.dateGraduated.substring(0, 4)];

      // Check if the graduate's university matches the selected university
      const universityMatch =
        selectedUniversity === "" || graduate.university === selectedUniversity;

      // Check if the graduate's department matches the selected department
      const departmentMatch =
        selectedDepartment === "" ||
        graduate.collegeDepartment === selectedDepartment;

      return (
        fullName.includes(searchQuery.toLowerCase()) &&
        yearMatch &&
        universityMatch &&
        departmentMatch
      );
    });
  };

  const [filteredGraduates, setFilteredGraduates] = useState([]);

  useEffect(() => {
    // Initialize filteredGraduates with all graduates when the component mounts
    setFilteredGraduates(graduates);
  }, [graduates]);

  const sortGraduates = (ascending) => {
    const sortedGraduates = [...filteredGraduates];
    sortedGraduates.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return ascending
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    return sortedGraduates;
  };

  useEffect(() => {
    // After fetching data, update the filtered graduates
    const filtered = filterGraduates(graduates);
    setFilteredGraduates(filtered);
  }, [
    searchQuery,
    graduates,
    selectedYears,
    selectedUniversity,
    selectedDepartment,
  ]);

  const handleSortChange = () => {
    setSortAscending(!sortAscending);
  };

  const handleSearch = () => {
    const filtered = graduates.filter((graduate) => {
      const fullName =
        `${graduate.firstName} ${graduate.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });

    // Update the state with the filtered graduates or all graduates if the search query is empty
    setFilteredGraduates(searchQuery ? filtered : graduates);
  };

  const handleYearChange = (year) => {
    setSelectedYears((prevSelectedYears) => ({
      ...prevSelectedYears,
      [year]: !prevSelectedYears[year], // Toggle the year's selected state
    }));
  };

  const fetchData = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("Fetched user data:", snapshot.val());
          const data = snapshot.val();
          setUserData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            university: data.university || "",
            collegeDepartment: data.collegeDepartment || "",
            collegeProgram: data.collegeProgram || "",
          });
        } else {
          console.log("No data available for user ID:", userId);
        }
      })
      .catch((error) => {
        console.error("Firebase fetch error:", error);
      });

    const graduatesRef = ref(db, "users");
    get(graduatesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const graduateData = [];
          snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.role === "graduate") {
              graduateData.push(userData);
            }
          });
          setGraduates(graduateData);
        } else {
          console.log("No graduate data available.");
        }
      })
      .catch((error) => {
        console.error("Firebase graduate fetch error:", error);
      });
  };

  console.log(selectedGraduate);
  return (
    <div className="GraduateList">
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
      <div className="backgroundClr">
        <div className="backgroundColor">
          <div className="main-content">
            <div className="left-column">
              <Form>
                {/* Year filter */}
                <Form.Group controlId="yearFilter">
                  <Form.Label>Date Graduated</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="2018"
                    id="year2018"
                    checked={selectedYears["2018"]}
                    onChange={() =>
                      setSelectedYears({
                        ...selectedYears,
                        2018: !selectedYears["2018"],
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    label="2019"
                    id="year2019"
                    checked={selectedYears["2019"]}
                    onChange={() =>
                      setSelectedYears({
                        ...selectedYears,
                        2019: !selectedYears["2019"],
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    label="2020"
                    id="year2020"
                    checked={selectedYears["2020"]}
                    onChange={() =>
                      setSelectedYears({
                        ...selectedYears,
                        2020: !selectedYears["2020"],
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    label="2021"
                    id="year2021"
                    checked={selectedYears["2021"]}
                    onChange={() =>
                      setSelectedYears({
                        ...selectedYears,
                        2021: !selectedYears["2021"],
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    label="2022"
                    id="year2022"
                    checked={selectedYears["2022"]}
                    onChange={() =>
                      setSelectedYears({
                        ...selectedYears,
                        2022: !selectedYears["2022"],
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    label="2023"
                    id="year2023"
                    checked={selectedYears["2023"]}
                    onChange={() =>
                      setSelectedYears({
                        ...selectedYears,
                        2023: !selectedYears["2023"],
                      })
                    }
                  />
                </Form.Group>

                {/* University dropdown */}
                <Form.Group controlId="universityFilter">
                  <div className="space">
                    <Form.Label>University</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                    >
                      <option value="">Select University</option>
                      <option value="university1">university1</option>
                      <option value="university2">university2</option>
                      {Object.keys(selectedUniversities).map((university) => (
                        <option key={university} value={university}>
                          {university}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                </Form.Group>

                {/* College Department dropdown */}
                <Form.Group controlId="departmentFilter">
                  <Form.Label>College Department</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    <option value="department1">Department 1</option>
                    <option value="department2">Department 2</option>
                    {Object.keys(selectedDepartments).map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>

            <div
              className="right-column"
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <h2>Graduate List</h2>
              <div className="table-controls">
                <div className="sort-button">
                  <Button variant="light" onClick={handleSortChange}>
                    <FontAwesomeIcon
                      icon={sortAscending ? faSortAlphaDown : faSortAlphaUp}
                    />
                  </Button>
                </div>
                <div className="search-container">
                  <div className="search-input">
                    <Form.Control
                      type="text"
                      placeholder="Search by Name"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearch();
                      }}
                    />
                  </div>
                  <button className="search-button" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
              <Table striped bordered hover className="graduate-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date Graduated</th>
                    <th>University</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortGraduates(sortAscending).map((graduate) => (
                    <tr key={graduate.id}>
                      <td>{`${graduate.firstName} ${graduate.lastName}`}</td>
                      <td>{graduate.dateGraduated}</td>
                      <td>{graduate.university}</td>
                      <td>{graduate.department}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => openModal(graduate)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  <strong>Name:</strong>{" "}
                  {`${selectedGraduate.firstName} ${selectedGraduate.lastName}`}
                </p>
                <p>
                  <strong>Email:</strong> {selectedGraduate.email}
                </p>
                <p>
                  <strong>University:</strong> {selectedGraduate.university}
                </p>
                <p>
                  <strong>College Department:</strong>{" "}
                  {selectedGraduate.collegeDepartment}
                </p>
                <p>
                  <strong>College Program:</strong>{" "}
                  {selectedGraduate.collegeProgram}
                </p>
                <p>
                  <strong>Work History:</strong>
                </p>
                {selectedGraduate.workHistory &&
                selectedGraduate.workHistory.length > 0 ? (
                  <ul>
                    {selectedGraduate.workHistory.map((workItem, index) => (
                      <li key={index}>
                        <p>
                          <strong>Position:</strong> {workItem.positionTitle}
                        </p>
                        <p>
                          <strong>Company:</strong> {workItem.company}
                        </p>
                        <p>
                          <strong>Start Date:</strong> {workItem.startDate}
                        </p>
                        <p>
                          <strong>End Date:</strong> {workItem.endDate}
                        </p>
                        <p>
                          <strong>Work Description</strong>{" "}
                          {workItem.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No work history available.</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduateList;
