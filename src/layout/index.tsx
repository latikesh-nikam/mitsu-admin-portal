import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import RoutesComp from '../routes';
import styles from "./layout.module.scss";

const Layout: React.FC = () => {
  const { appState } = useContext(AppContext);
  const { toggleTheme } = appState
  const { theme } = toggleTheme

  return (
    <div className={styles.LayoutContainer} data-theme={theme}>
      <>
        <RoutesComp />
      </>

      <><Toaster /></>
    </div>
  )
}

export default Layout