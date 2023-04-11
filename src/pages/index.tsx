import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../component/topBar/AppHeader';

const Pages: React.FC = () => {
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default Pages