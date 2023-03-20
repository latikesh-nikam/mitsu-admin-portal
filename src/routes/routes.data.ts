import React from "react";

import Login from '../pages/login';
import AdminDashboard from "../pages/dashboard";
import Admin from '../pages/admin';
const LoginComponent = React.lazy(() => import('../pages/loginComponent'));
const ViewPatient = React.lazy(() => import('../pages/admin/viewPatient'));
const EmailTemplate = React.lazy(() => import('../component/email-verification'));
const NotFound = React.lazy(() => import('../component/not-found'));


export {
  Login,
  AdminDashboard,
  Admin,
  LoginComponent,
  ViewPatient,
  EmailTemplate,
  NotFound
}