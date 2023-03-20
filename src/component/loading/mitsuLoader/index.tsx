import React from 'react';
import styles from "./loader.module.scss";
import logo from "../../../assets/images/BlueCircle.png";

const MitsuLoader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img src={logo} className={styles.logo} alt="logo" />
      <h1 className={styles.heading}>Loading</h1>
    </div>
  )
}

export default MitsuLoader