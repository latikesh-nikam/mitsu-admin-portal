import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppContextProvider from './context/AppContext';
import Layout from './layout';

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Layout />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
