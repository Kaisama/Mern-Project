import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineLogin, AiOutlineShop, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/api/userApiSlice'; // Corrected import statement
import { logout } from '../../redux/features/Auth/authSlice';

const Navigation = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use the imported useLoginMutation hook correctly
  const [logoutApiCall] = useLoginMutation();

  const logoutHandler = async () => {
    try {
      // Call the logout API using the imported logoutApiCall function
      await logoutApiCall();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 bg-black text-white w-[4%] hover:w-[15%] h-[100vh] fixed`} id='navigation-container'>
      <div className='flex flex-col justify-center space-y-4'>
        <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>

        <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
        </Link>

        <Link to='/favorite' className='flex items-center transition-transform transform hover:translate-x-2'>
          <FaHeart className='mr-2 mt-[3rem]' size={26} />
          <span className="hidden nav-item-name mt-[3rem]">WISHLIST</span>{" "}
        </Link>
      </div>

      <div className="relative">
        <button onClick={toggleDropdown} className='flex items-center text-gray-8000 focus:outline-none'>
          {userInfo ? (
            <span className='text-white'>{userInfo.username}</span>
          ) : (
            <></>
          )}
        </button>
      </div>

      <ul>
        <li>
          <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
            <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>{" "}
          </Link>
        </li>

        <li>
          <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
            <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
