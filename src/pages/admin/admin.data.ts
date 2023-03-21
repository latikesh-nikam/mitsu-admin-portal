import React from 'react';

const DrawerLeft = React.lazy(() => import('../../component/drawer'));
const Header = React.lazy(() => import("../../component/header"));

export {
  DrawerLeft,
  Header
}