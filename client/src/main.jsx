import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { PostProvider } from './context/PostContext.jsx'; // Uncomment if using Context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <PostProvider> */}
      <App />
    {/* </PostProvider> */}
  </React.StrictMode>,
);