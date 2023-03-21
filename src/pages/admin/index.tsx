import React from 'react';
import styles from "./admin.module.scss";
import { Header, DrawerLeft } from "./admin.data";

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