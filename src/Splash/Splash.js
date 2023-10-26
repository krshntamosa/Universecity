import React from "react";
import styles from "./Splash.module.css";
import Image from "react-bootstrap/Image";

const Splash = (loading) => {
  return (
    <div className={styles["background"]}>
      <div className={styles["center-container"]}>
        <div className="body">
          <Image
            className={styles["image"]}
            src="/images/UVCLogo.png"
            alt="show-logo"
          />
        </div>
        <div className={styles["loading-activity"]}></div>
      </div>
    </div>
  );
};

export default Splash;
