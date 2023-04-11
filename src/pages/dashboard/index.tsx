import React from 'react';
import WidgetsDropdown from '../widgets/WidgetsDropdown';

const AdminDashboard: React.FC = () => {

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <div className="body flex-grow-1 px-3">
        <WidgetsDropdown />
      </div>
    </div>
  )
}

export default AdminDashboard
