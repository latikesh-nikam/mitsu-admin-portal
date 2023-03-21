import React from "react";

import Login from '../pages/login';
import AdminDashboard from "../pages/dashboard";
import Admin from '../pages/admin';
const LoginComponent = React.lazy(() => import('../pages/loginComponent'));
const ViewPatient = React.lazy(() => import('../pages/admin/viewPatient'));
const EmailTemplate = React.lazy(() => import('../component/email-verification'));
const NotFound = React.lazy(() => import('../component/not-found'));
const Question = React.lazy(() => import('../pages/question'));
const ViewPatients = React.lazy(() => import('../pages/dashboard/view-patient'));

export {
  Login,
  AdminDashboard,
  Admin,
  LoginComponent,
  ViewPatient,
  EmailTemplate,
  NotFound,
  Question,
  ViewPatients
}