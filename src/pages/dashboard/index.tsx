import React from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { AppHeader } from '../../component/topBar/index';

const AdminDashboard = () => {
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="body flex-grow-1 px-3">
        <WidgetsDropdown />
      </div>
    </div>
  )
}

export default AdminDashboard
