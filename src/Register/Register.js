import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase";
import { Link } from "react-router-dom";

const Register = () => {
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
    <div className="backContainer">
      <div className="contain">
        <div className="registerContainer">
          <div className="leftContent">
            <div className="registerText">
              <h2 className="registerHeader">Register</h2>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="loginLink">
                  Login here.
                </Link>
              </p>
              <div className="registerForm">
                <div className="form-input">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    name="firstName"
                    id="firstName"
                    type="text"
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    name="lastName"
                    id="lastName"
                    type="text"
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="university">University:</label>
                  <select
                    required
                    onChange={(e) => setUniversity(e.target.value)}
                    id="university"
                    name="university"
                  >
                    <option value="university1">University 1</option>
                    <option value="university2">University 2</option>
                  </select>
                </div>
                <div className="form-input">
                  <label htmlFor="department">College Department:</label>
                  <select
                    required
                    onChange={(e) => setDepartment(e.target.value)}
                    id="department"
                    name="department"
                  >
                    <option value="department1">Department 1</option>
                    <option value="department2">Department 2</option>
                  </select>
                </div>
                <div className="form-input">
                  <label htmlFor="program">College Program:</label>
                  <select
                    required
                    onChange={(e) => setProgram(e.target.value)}
                    id="program"
                    name="program"
                  >
                    <option value="program1">Program 1</option>
                    <option value="program2">Program 2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rightContent">
            <form>
              <div className="form-input">
                <label htmlFor="dateGraduated">Date Graduated:</label>
                <input
                  required
                  onChange={(e) => setDateGraduated(e.target.value)}
                  type="date"
                  id="dateGraduated"
                  name="dateGraduated"
                />
              </div>
              <div className="login-details-heading">
                <hr className="line" />
                <span className="login-details-text">Login Details</span>
                <hr className="line" />
              </div>
              <div className="form-input">
                <label htmlFor="email">Email:</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                />
              </div>

              <div className="form-input">
                <label htmlFor="password">Password:</label>
                <input
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <button className="button-register" onClick={handleRegister}>
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
