import React from 'react';
import './index.css'; // Assurez-vous que le chemin est correct
import ReactDOM from 'react-dom/client';
import './assets/css/tailwind.css'; // Remplacez ./index.css par ./assets/css/tailwind.css
import App from './App';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
