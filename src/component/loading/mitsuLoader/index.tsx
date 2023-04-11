import React, { SyntheticEvent } from 'react';
import styles from "./loader.module.scss";
import logo from "../../../assets/images/BlueCircle.png";

const MitsuLoader: React.FC = () => {

  const onErrorImage = ({ currentTarget }: SyntheticEvent<HTMLImageElement, Event>): void => {
    currentTarget.onerror = null;
    currentTarget.src = "https://mitsu-assets.s3.ap-south-1.amazonaws.com/mitsu-text-logo.png";
  };

  return (
    <div className={styles.loader}>
      <img src={logo} className={styles.logo} alt="logo" onError={onErrorImage} />
      <h1 className={styles.heading}>Loading</h1>
    </div>
  )
}

export default MitsuLoader