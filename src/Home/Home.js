import React, { useState, useEffect } from "react";
import Splash from "../Splash/Splash";
import styles from "./Home.module.css";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <Splash loading="loading" />
      ) : (
        <div className="backContainer">
          <div className="contain">
            <div className="container d-flex align-items-center justify-content-center vh-100">
              <div className="text-center">
                <div
                  className="text-center"
                  style={{ fontFamily: "Inika, sans-serif" }}
                >
                  <h1 className="underline-text">UniVerseCity</h1>
                </div>
                <div className="spacer-header"></div>
                <Link to="/login">
                  <button className="btn btn-primary button-width">
                    Login
                  </button>
                </Link>

                <div className="spacer"></div>
                <Link to="/register">
                  <button className="btn btn-primary button-width">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
