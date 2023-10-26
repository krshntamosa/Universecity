import React, { useState, useEffect } from "react";
import Splash from "../Splash/Splash";
import styles from "./Login.module.css";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      {loading ? (
        <Splash loading="loading" />
      ) : (
        <body>
          <Container className={styles["contain"]}>
            <h1>Hello Testing</h1>
            <Image
              className={styles["bg-image"]}
              src="/images/BGray.png"
              alt="show-logo"
            />
          </Container>
        </body>
      )}
    </div>
  );
};

export default Login;
