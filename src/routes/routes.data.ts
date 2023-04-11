import React from "react";
import Login from '../pages/login';
import Admin from '../pages/admin';
import Anxiety from "../pages/dashboard/post-onboard/modules/anxiety";
import Depression from "../pages/dashboard/post-onboard/modules/depression";
const AddModules = React.lazy(() => import("../pages/dashboard/post-onboard/modules/addModules"));
const AllModules = React.lazy(() => import("../pages/dashboard/post-onboard/modules/all"));
const Modules = React.lazy(() => import("../pages/dashboard/post-onboard/modules"));
const AdminDashboard = React.lazy(() => import("../pages/dashboard"));
const Pages = React.lazy(() => import("../pages"));
const PostOnboardingScreen = React.lazy(() => import("../pages/dashboard/post-onboard"));
const LoginComponent = React.lazy(() => import('../pages/loginComponent'));
const EmailTemplate = React.lazy(() => import('../component/email-verification'));
const NotFound = React.lazy(() => import('../component/not-found'));
const Question = React.lazy(() => import('../pages/question'));
const Patient = React.lazy(() => import('../pages/dashboard/patient'));
const Therapist = React.lazy(() => import("../pages/dashboard/therapist"));

export const PROTECTED_ROUTES_MAP: any = {
  "Admin": [
    {
      path: "dashboard",
      element: Pages,
      children: [
        {
          path: "/dashboard",
          element: AdminDashboard,
        },
        {
          path: "view-patients",
          element: Patient,
        },
        {
          path: "therapist",
          element: Therapist,
        },
        {
          path: "question",
          element: Question,
        },
        {
          path: "post-onboard",
          element: PostOnboardingScreen
        },
        {
          path: "modules",
          element: Modules,
          children: [
            {
              path: "all",
              element: AllModules
            },
            {
              path: "anxiety",
              element: Anxiety
            },
            {
              path: "depression",
              element: Depression
            },
            {
              path: "add-module",
              element: AddModules
            }
          ]
        },

      ]
    }
  ]
}

export {
  Login,
  AdminDashboard,
  Admin,
  LoginComponent,
  EmailTemplate,
  NotFound,
  Question,
  Patient
}