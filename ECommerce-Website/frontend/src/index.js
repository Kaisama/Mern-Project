import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'

//Auth
import Login from './pages/Auth/Login.jsx'



const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
        
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();