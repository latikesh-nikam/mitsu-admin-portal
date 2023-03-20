import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { LoginComponent, Admin, AdminDashboard, Login, EmailTemplate, NotFound } from "./routes.data";
import Question from '../pages/question';
import ViewPatients from '../pages/dashboard/view-patient';

const RoutesComp: React.FC = () => {
  const { appState } = useContext(AppContext);
  const { loginData } = appState
  const { isLogin } = loginData

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        {isLogin &&
          <Route path='/admin' element={<Admin />} >
          </Route>
        }
        <Route path="/dashboard/view-patients" element={<ViewPatients />} />
        <Route path="/verify/email" element={<EmailTemplate />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard/question" element={<Question />} />
      </Routes>
    </>
  )
}

export default RoutesComp
