import React from "react";
import styles from "./Splash.module.css";
<<<<<<< HEAD
import Image from "react-bootstrap/Image";
=======
>>>>>>> 829a5672931362b7274f3fe02ac3a064d5bee9fb

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
<<<<<<< HEAD
=======
          <BarLoader
            className={styles["center-loader"]}
            color={"#5ECBF0"}
            loading={loading}
            size={15}
          />
>>>>>>> 829a5672931362b7274f3fe02ac3a064d5bee9fb
        </div>
        <div className={styles["loading-activity"]}></div>
      </div>
    </div>
  );
};

export default Splash;
