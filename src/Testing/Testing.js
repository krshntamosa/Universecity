// import React, { useState, useEffect } from "react";
// import { Form, Button, Modal } from "react-bootstrap";
// import { getDatabase, ref, push, set, update, remove } from "firebase/database";
// import { auth } from "../firebase"; // Your authentication context or hook
// import { useAuthState } from "react-firebase-hooks/auth";
// import { onValue, off } from "firebase/database";
// import "./WorkHistory.css"; // Import the CSS file

// const WorkHistory = () => {
//   const [user] = useAuthState(auth); // Use your authentication context or hook
//   const [workHistory, setWorkHistory] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     positionTitle: "",
//     company: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//   });

//   const db = getDatabase(); // Initialize Firebase Realtime Database

//   useEffect(() => {
//     if (user) {
//       const userRef = ref(db, `users/${user.uid}/workHistory`);
//       // Attach a listener to fetch and update work history data
//       // whenever it changes in the database
//       const workHistoryListener = onValue(userRef, (snapshot) => {
//         if (snapshot.exists()) {
//           const workHistoryData = snapshot.val();
//           const workHistoryArray = Object.values(workHistoryData);
//           setWorkHistory(workHistoryArray);
//         } else {
//           setWorkHistory([]);
//         }
//       });

//       return () => {
//         // Clean up the listener when the component unmounts
//         off(workHistoryListener);
//       };
//     }
//   }, [user, db]);

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({
//       positionTitle: "",
//       company: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddWorkHistory = () => {
//     if (user) {
//       const userWorkHistoryRef = ref(db, `users/${user.uid}/workHistory`);
//       const newWorkHistoryRef = push(userWorkHistoryRef);

//       set(newWorkHistoryRef, formData)
//         .then(() => {
//           handleCloseModal();
//         })
//         .catch((error) => {
//           console.error("Error adding work history:", error);
//         });
//     }
//   };

//   const handleEditWorkHistory = (id) => {
//     if (user) {
//       const userWorkHistoryRef = ref(db, `users/${user.uid}/workHistory/${id}`);

//       update(userWorkHistoryRef, formData)
//         .then(() => {
//           handleCloseModal();
//         })
//         .catch((error) => {
//           console.error("Error updating work history:", error);
//         });
//     }
//   };

//   const handleDeleteWorkHistory = (id) => {
//     if (user) {
//       const userWorkHistoryRef = ref(db, `users/${user.uid}/workHistory/${id}`);

//       remove(userWorkHistoryRef)
//         .then(() => {
//           handleCloseModal();
//         })
//         .catch((error) => {
//           console.error("Error deleting work history:", error);
//         });
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="work-history-container">
//       <Button className="add-work-history-button" onClick={handleShowModal}>
//         + Work History
//       </Button>

//       <div className="work-history-header">Work History</div>

//       {workHistory.map((item) => (
//         <div key={item.id} className="work-history-entry">
//           <div className="work-history-details-left">
//             <h3 className="work-history-title">{item.positionTitle}</h3>
//             <p className="work-history-company">{item.company}</p>
//           </div>
//           <div className="work-history-details-right">
//             <p className="work-history-dates">
//               {formatDate(item.startDate)} - {formatDate(item.endDate)}
//             </p>
//             <p className="work-history-description">{item.description}</p>
//             <div className="work-history-buttons">
//               <Button
//                 className="work-history-button"
//                 variant="primary"
//                 onClick={() => handleShowEditModal(item)}
//               >
//                 Edit
//               </Button>
//               <Button
//                 className="work-history-button"
//                 variant="danger"
//                 onClick={() => handleDeleteWorkHistory(item.id)}
//               >
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       ))}

//       <Modal show={showModal} onHide={handleCloseModal}></Modal>
//     </div>
//   );
// };

// export default WorkHistory;
