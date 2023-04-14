import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppHeaderDropdown } from './header/index';
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';

const AppHeader: React.FC = () => {
  return (
    <CHeader position="sticky" className="mb-2">
      <CContainer fluid>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Home
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="view-patients" component={NavLink}>Patient</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="therapist" component={NavLink}>Therapist</CNavLink>
          </CNavItem>

          <CDropdown variant="nav-item" direction="center">
            <CDropdownToggle color="secondary">Questionnaire</CDropdownToggle>

            <CDropdownMenu>

              <CNavLink to="question/pre-onboard" component={NavLink}>Pre-Onboard</CNavLink>
              <CNavLink to="question/post-onboard" component={NavLink}>Post-Onboard</CNavLink>

            </CDropdownMenu>
          </CDropdown>

          <CNavItem>
            <CNavLink to="modules/all" component={NavLink}>
              Modules
            </CNavLink>
          </CNavItem>

        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader >
  )
}

export default AppHeader
