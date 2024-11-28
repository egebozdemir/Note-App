import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This file is optional, but you can create it for custom styles
import App from './App'; // Assuming you have an App.js component

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure your HTML has an element with ID 'root'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

