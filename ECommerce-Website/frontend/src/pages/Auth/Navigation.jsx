// Navigation.js
import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const[dropdownOpen,setDropdownOpen]=useState(false)
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const toggleDropdown=()=>{
      setDropdownOpen(!dropdownOpen)
  }
  const closeSidebar=()=>{
    setShowSidebar(false)
}

    return (
       
    <div style={{ zIndex: 999 }} 
    className={`
    ${showSidebar ? "hidden" : "flex"}
     xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`} id='navigation-container'>
      <div className='flex flex-col justify-center space-y-4'>
        <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
          <span className="hidden nav-item-name  mt-[3rem]">HOME</span>{" "}
        </Link>
      </div>

    </div>
    );
};

export default Navigation;
