// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Private Route
import Profile from './pages/Users/Profile.jsx';

// Auth
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/ProductList.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';
import AllProducts from './pages/Admin/AllProducts.jsx';
import Home from './Home.jsx';
import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route index={true} path='/' element={<Home />} />
          <Route path='/favorite' element={<Favorites/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>


          {/* Wrap the PrivateRoute and its child routes with a Route */}
          <Route path='' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminRoute />}>
            <Route path='userlist' element={<UserList />} />
            <Route path='categorylist' element={<CategoryList />} />
            <Route path='productlist' element={<ProductList />} />
            <Route path='allproductslist' element={<AllProducts />} />
            <Route path='product/update/:_id' element={<ProductUpdate />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
