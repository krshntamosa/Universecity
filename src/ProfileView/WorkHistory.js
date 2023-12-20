import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { getDatabase, ref, push, set, update, remove } from "firebase/database";
import { auth } from "../firebase"; // Your authentication context or hook
import { useAuthState } from "react-firebase-hooks/auth";
import { onValue, off } from "firebase/database";
import "./WorkHistory.css"; // Import the CSS file

const WorkHistory = () => {
  const [user] = useAuthState(auth); // Use your authentication context or hook
  const [workHistory, setWorkHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    positionTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [selectedWorkHistory, setSelectedWorkHistory] = useState(null);

  const db = getDatabase(); // Initialize Firebase Realtime Database

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}/workHistory`);
      // Attach a listener to fetch and update work history data
      // whenever it changes in the database
      const workHistoryListener = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const workHistoryData = snapshot.val();
          const workHistoryArray = Object.values(workHistoryData);
          setWorkHistory(workHistoryArray);
        } else {
          setWorkHistory([]);
        }
      });

      return () => {
        // Clean up the listener when the component unmounts
        off(workHistoryListener);
      };
    }
  }, [user, db]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      positionTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setSelectedWorkHistory(null); // Reset selected work history
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddWorkHistory = () => {
    if (user) {
      const userWorkHistoryRef = ref(db, `users/${user.uid}/workHistory`);
      const newWorkHistoryRef = push(userWorkHistoryRef);

      set(newWorkHistoryRef, { ...formData, id: newWorkHistoryRef.key }) // Ensure each entry has a unique ID
        .then(() => {
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error adding work history:", error);
        });
    }
  };

  const handleEditWorkHistory = () => {
    if (!selectedWorkHistory) return; // Check if a work history item is selected
  
    // Correctly reference the specific work history item using its ID
    const userWorkHistoryRef = ref(
      db,
      `users/${user.uid}/workHistory/${selectedWorkHistory.id}`
    );
  
    update(userWorkHistoryRef, formData)
      .then(() => {
        handleCloseModal();
        // Optionally, you might want to update your local state here
        // to reflect the changes without needing to reload from the database.
      })
      .catch((error) => {
        console.error("Error updating work history:", error);
      });
  };

  const handleDeleteWorkHistory = () => {
    if (!selectedWorkHistory) return; // Check if a work history item is selected

    const userWorkHistoryRef = ref(
      db,
      `users/${user.uid}/workHistory/${selectedWorkHistory.id}`
    );

    remove(userWorkHistoryRef)
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error deleting work history:", error);
      });
  };

  const handleWorkHistoryClick = (workHistoryItem) => {
    setSelectedWorkHistory(workHistoryItem); // Set the selected work history item
    setFormData(workHistoryItem); // Populate the form with the selected item's data
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    const date = new Date(dateString);
    const today = new Date();
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return "Current";
    }
    const startDate = date.toLocaleDateString(undefined, options);
    const endDate =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() > today.getDate()
        ? "Current"
        : date.toLocaleDateString(undefined, options);
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="work-history-container">
      <Button className="add-work-history-button" onClick={handleShowModal}>
        + Work History
      </Button>
      <div className="work-history-item-contain">
        {workHistory.map((item) => (
          <div
            key={item.id}
            className="work-history-item"
            onClick={() => handleWorkHistoryClick(item)}
          >
            <div className="work-history-header">
              <h3>{item.positionTitle}</h3>
              <p className="date">{formatDate(item.startDate)}</p>
            </div>
            <p className="company-name">{item.company}</p>
            <p className="work-description">{item.description}</p>
          </div>
        ))}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedWorkHistory ? "Edit Work History" : "Add Work History"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="positionTitle">
                <Form.Label>Position Title</Form.Label>
                <Form.Control
                  type="text"
                  name="positionTitle"
                  value={formData.positionTitle}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Work Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {selectedWorkHistory ? (
              <div>
                <Button
                  variant="primary"
                  onClick={handleEditWorkHistory}
                  className="edit-button"
                >
                  Save Changes
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteWorkHistory}
                  className="delete-button"
                >
                  Delete
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={handleAddWorkHistory}
                className="add-button"
              >
                Add Work History
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default WorkHistory;
