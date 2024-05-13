// App.js

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  useEffect(() => {
    // Display a simple success toast message when the component mounts
    toast.success('Welcome to the App!');
  }, []);

  return (
    <>
      <ToastContainer />
      <Navigation /> {/* Include the Navigation component here */}
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
