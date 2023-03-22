import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../../assets/images/profile_icon.png'
import { clearStore } from '../../../services/module.service';
import { toast } from 'react-hot-toast';
import { userLogOut } from '../../../service/user.service';

const AppHeaderDropdown = () => {
  const nav = useNavigate();
  const logout = async () => {
    await userLogOut();
    toast.success("Logged Out!")
    clearStore("access_token");
    nav("/");
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar src={profileImg} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#" onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
