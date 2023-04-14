import React, { useContext, useLayoutEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { LoginComponent, Login, EmailTemplate, NotFound, PROTECTED_ROUTES_MAP } from "./routes.data";

export interface IRoutesProps {
  path: string,
  element: React.LazyExoticComponent<React.FC<{}>> | React.FC<{}>
  children: IRoutesProps[]
}

const RoutesComp: React.FC = () => {
  const { appState } = useContext(AppContext);
  const { loginData } = appState
  const { role: Role } = loginData
  const [role, setRole] = useState<string | null>("");

  const roleRoutes = role ? PROTECTED_ROUTES_MAP[role] : null;

  useLayoutEffect(() => {
    const userROLE = sessionStorage.getItem("role");
    setRole(userROLE);
  }, [Role])

  const childrenRoutes = (routes: IRoutesProps[]) => {
    return (
      <>
        {
          (routes?.map((route: IRoutesProps, index: number) => {
            return (
              <Route path={route.path} element={<route.element />} key={index}>
                {route.children ? childrenRoutes(route?.children) : <></>}
              </Route>
            );
          }))
        }
      </>
    );
  };

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/" element={<LoginComponent />} />
      {
        (roleRoutes?.map((route: IRoutesProps, index: number) => {
          return (
            <Route path={route.path} element={<route.element />} key={index}>
              {route.children ? childrenRoutes(route.children) : <></>}
            </Route>
          );
        }))
      }
      <Route path="/verify/email" element={<EmailTemplate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RoutesComp
