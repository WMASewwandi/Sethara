import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Assuming your component is in App.jsx
import './index.css'; // Your main stylesheet

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);