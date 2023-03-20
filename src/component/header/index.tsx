import React, { useContext } from 'react';
import styles from "./header.module.scss";
import Button from '@mui/material/Button';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Header: React.FC = () => {
  const { navigate} = useContext(AppContext);

  const handleClick = () => {
    navigate("/");
    toast.success("Logged Out!");
  }

  return (
    <div className={styles.header}>
      <div className={styles.headingC}>
        <div className={styles.logo}>
          <img src="https://mitsu.care/wp-content/uploads/2022/10/Symbol_Blue_PNG.png" alt="mitsuLogo" className={styles.imgLogo} />
        </div>
        <span className={styles.heading}>Admin Console</span>
      </div>
      <div className={styles.logout}>
        <Button variant="contained" onClick={handleClick} className={styles.logoutBtn}>Logout</Button>
      </div>
    </div>
  )
}

export default Header