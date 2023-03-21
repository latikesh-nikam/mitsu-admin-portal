import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/fonts/Avenir.ttc";
import "./assets/fonts/SourceCodePro-Regular.ttf";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <App />
  </>
);

reportWebVitals();
