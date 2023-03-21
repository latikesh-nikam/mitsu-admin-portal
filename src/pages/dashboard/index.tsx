import React from 'react';
import { AppHeader } from '../../component/topBar';
import WidgetsDropdown from '../widgets/WidgetsDropdown';

const AdminDashboard: React.FC = () => {
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
