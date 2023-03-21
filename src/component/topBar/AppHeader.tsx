import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'

import { AppHeaderDropdown } from './header/index'

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
            <CNavLink to="/dashboard/view-patients" component={NavLink}>Patient</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Therapist</CNavLink>
          </CNavItem>
          <CDropdown variant="nav-item">
            <CDropdownToggle color="secondary">Questionnaire</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="/dashboard/question">Pre-Onboard</CDropdownItem>
              <CDropdownItem href="#">Post-Onboard</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
