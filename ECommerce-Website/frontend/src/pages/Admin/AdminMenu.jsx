import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    const [isMenuOpen,setIsMenuOpen]=useState(false)
    const toggleMenu=()=>{
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <>
      <button className={`${isMenuOpen?"top-2 right-2":"top-5 right-7"} bg-[#151515]   p-2 fixed rounded-lg`}
      onClick={toggleMenu}
      >
        {isMenuOpen?(
            <FaTimes color='white'/>
        ):(
            <>
            <div className="w-6 h-0 my-1 bg-black 5"></div>
            <div className="w-6 h-0 my-1 bg-black 5"></div>
            <div className="w-6 h-0 my-1 bg-black 5"></div>

            </>
        )}
        </button>
        {isMenuOpen &&(
            <section className='bg-[#151515] p-4 fixed right-7 top-7'>
                <ul className='mt-2 list-none'>
                    
                    <li>
                        <NavLink className=" px-3 py-2 mb-5 list-item hover:bg-[#2E2D2D] rounded-sm" 
                        to={'/admin/dashboard'} style={({isActive})=>({
                            color:isActive?'greenyellow':"red"
                        })}>
                            Admin Dashboard
                        </NavLink>
                    </li>



                    <li>
                        <NavLink className=" px-3 py-2 mb-5 list-item hover:bg-[#2E2D2D] rounded-sm" 
                        to={'/admin/categorylist'} style={({isActive})=>({
                            color:isActive?'greenyellow':"red"
                        })}>
                            Create Category
                        </NavLink>
                    </li>



                    <li>
                        <NavLink className=" px-3 py-2 mb-5 list-item hover:bg-[#2E2D2D] rounded-sm" 
                        to={'/admin/productlist'} style={({isActive})=>({
                            color:isActive?'greenyellow':"red"
                        })}>
                            Create Product
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className=" px-3 py-2 mb-5 list-item hover:bg-[#2E2D2D] rounded-sm" 
                        to={'/admin/allproductslist'} style={({isActive})=>({
                            color:isActive?'greenyellow':"red"
                        })}>
                            All Products
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className=" px-3 py-2 mb-5 list-item hover:bg-[#2E2D2D] rounded-sm" 
                        to={'/admin/userlist'} style={({isActive})=>({
                            color:isActive?'greenyellow':"red"
                        })}>
                            Manage Users
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className=" px-3 py-2 mb-5 list-item hover:bg-[#2E2D2D] rounded-sm" 
                        to={'/admin/orderlist'} style={({isActive})=>({
                            color:isActive?'greenyellow':"red"
                        })}>
                            Manage Orders
                        </NavLink>
                    </li>
                    
                </ul>
            </section>
        )}  
    </>
  )
}

export default AdminMenu