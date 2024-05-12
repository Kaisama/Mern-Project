import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'


//Private Route
import Profile from './pages/Users/Profile.jsx';


//Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/ProductList.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';



const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>


          <Route path='' element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
          </Route>

          {/* Admin Routes */}
        <Route path='/admin' element={<AdminRoute/>} >
            <Route path='userlist' element={<UserList/>}/>
            <Route path='categorylist' element={<CategoryList/>}/>
            <Route path='productlist' element={<ProductList/>}/>
            <Route path='product/update/:_id' element={<ProductUpdate/>}/>

        </Route>             

        </Routes>
        
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();