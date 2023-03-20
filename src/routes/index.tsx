import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../pages/login';
import LoginComponent from '../pages/loginComponent';
import AdminDashboard from "../pages/dashboard";
import { AppContext } from '../context/AppContext'
import Admin from '../pages/admin';
import ViewPatient from '../pages/admin/viewPatient';
import EmailTemplate from '../component/email-verification';
import NotFound from '../component/not-found';

const RoutesComp: React.FC = () => {
  const { appState } = useContext(AppContext);
  const { loginData } = appState
  const { isLogin } = loginData

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        {isLogin &&
          <Route path='/admin' element={<Admin />} >
            <Route path="/admin/view-patients" element={<ViewPatient />} />
          </Route>
        }
        <Route path="/verify/email" element={<EmailTemplate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default RoutesComp
