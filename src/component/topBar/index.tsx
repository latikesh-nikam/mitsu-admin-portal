import React from 'react';

const AppFooter = React.lazy(() => import('./AppFooter'));
const AppHeader = React.lazy(() => import('./AppHeader'));
const AppHeaderDropdown = React.lazy(() => import("./header/AppHeaderDropdown"));
const DocsCallout = React.lazy(() => import('./DocsCallout'));
const DocsLink = React.lazy(() => import('./DocsLink'));
const DocsExample = React.lazy(() => import('./DocsExample'));

export {
  AppFooter,
  AppHeader,
  AppHeaderDropdown,
  DocsCallout,
  DocsLink,
  DocsExample,
}
