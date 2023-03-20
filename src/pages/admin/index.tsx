import React from 'react';
import DrawerLeft from '../../component/drawer';
import Header from '../../component/header';
import styles from "./admin.module.scss";

const Admin: React.FC = () => {

  return (
    <div className={styles.adminPage}>
      <div>
        <Header />
      </div>
      <div>
        <DrawerLeft />
      </div>
    </div>
  )
}

export default Admin