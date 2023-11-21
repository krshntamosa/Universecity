import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app, database } from "../firebase"; // Adjust the path based on your project structure
import { Link, useNavigate } from "react-router-dom";
import styles from "./Testing.css";

const Testing = () => {
  const auth = getAuth(app);
  const db = getDatabase(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [dateGraduated, setDateGraduated] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Assign the role as "graduate"
      set(ref(db, `/users/${user.uid}`), {
        firstName: firstName,
        lastName: lastName,
        university: university,
        department: department,
        program: program,
        dateGraduated: dateGraduated,
        email: email,
        role: "graduate", // Add more user data as needed
      });

      alert("Successfully Created An Account");
      navigate("/graduate-dashboard");
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <form className={styles["forms"]}>
      <div className={styles["form-input"]}>
        <input
          required
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
          id="firstName"
          placeholder="First Name"
        />
      </div>
      <div className={styles["form-input"]}>
        <input
          required
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
          id="lastName"
          placeholder="Last Name"
        />
      </div>
      <div className={styles["form-input"]}>
        <select
          required
          onChange={(e) => setUniversity(e.target.value)}
          id="university"
          name="university"
          placeholder="University"
        >
          {/* Add options for the university dropdown */}
          <option value="university1">University 1</option>
          <option value="university2">University 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className={styles["form-input"]}>
        <select
          required
          onChange={(e) => setDepartment(e.target.value)}
          id="department"
          name="department"
          placeholder="College Department"
        >
          {/* Add options for the department dropdown */}
          <option value="department1">Department 1</option>
          <option value="department2">Department 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className={styles["form-input"]}>
        <select
          required
          onChange={(e) => setProgram(e.target.value)}
          id="program"
          name="program"
          placeholder="College Program"
        >
          {/* Add options for the program dropdown */}
          <option value="program1">Program 1</option>
          <option value="program2">Program 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className={styles["form-input"]}>
        <input
          required
          onChange={(e) => setDateGraduated(e.target.value)}
          type="date"
          placeholder="Date Graduated"
          id="dateGraduated"
          name="dateGraduated"
        />
      </div>
      <div className={styles["form-input"]}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
        />
      </div>
      <div className={styles["form-input"]}>
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
      </div>
      <button className={styles["button-register"]} onClick={handleRegister}>
        Register
      </button>
      <p className={styles["go-login"]}>
        Already Have An Account?{" "}
        <Link to="/login" className={styles["login-link"]}>
          Login Here
        </Link>
      </p>
    </form>
  );
};

export default Testing;
