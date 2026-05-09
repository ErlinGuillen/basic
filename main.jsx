import React from 'react';
import ReactDOM from 'react-dom/client';
import GlassBlog from './app.jsx'; // Import your blog component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlassBlog />
  </React.StrictMode>
);
