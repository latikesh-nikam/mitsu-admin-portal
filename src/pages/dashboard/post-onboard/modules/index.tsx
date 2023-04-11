import { CNav, CNavItem, CNavLink } from '@coreui/react';
import React, { useState } from 'react';
import { tabsData } from './modules.data';
import styles from "./modules.module.scss";
import { NavLink, Outlet } from 'react-router-dom';

const Modules: React.FC = () => {
  const [isActive, setIsActive] = useState<any>();

  const handleTabClick = (index: number) => {
    setIsActive(index)
  }

  return (
    <div className={styles.container}>
      <CNav variant="tabs" className={styles.nav}>
        {tabsData?.map((val: any, index: number) => {
          return (
            <CNavItem onClick={() => handleTabClick(index)} active={isActive === index} className={styles.navItems} key={index}>
              <CNavLink to={val.link} component={NavLink}>
                {val.title}
              </CNavLink>
            </CNavItem>
          )
        })
        }
      </CNav>

      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  )
}

export default Modules