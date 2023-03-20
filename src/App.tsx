import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import MitsuLoader from './component/loading/mitsuLoader';
import AppContextProvider from './context/AppContext';
import Layout from './layout';

function App() {
  return (
    <Suspense fallback={<MitsuLoader />}>
      <BrowserRouter>
        <AppContextProvider>
          <Layout />
        </AppContextProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
