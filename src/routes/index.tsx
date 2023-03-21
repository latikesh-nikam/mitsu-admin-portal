import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { LoginComponent, AdminDashboard, Login, EmailTemplate, NotFound, Question, ViewPatients } from "./routes.data";

const RoutesComp: React.FC = () => {
  const { appState } = useContext(AppContext);
  const { loginData } = appState
  const { isLogin } = loginData

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<LoginComponent />} />
        {isLogin &&
          <>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard/view-patients" element={<ViewPatients />} />

          </>
        }
        <Route path="/dashboard/question" element={<Question />} />
        <Route path="/verify/email" element={<EmailTemplate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default RoutesComp
