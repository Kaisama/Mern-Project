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
      <button className={`${isMenuOpen?"top-2 right-2":"top-5 right-7"} bg-[#151515] p-2 fixed rounded-lg`}
      onClick={toggleMenu}
      >
        {isMenuOpen?(
            <FaTimes color='black'/>
        ):(
            <>
            <div className="w-6 h-0 my-1 bg-black 5"></div>
            <div className="w-6 h-0 my-1 bg-black 5"></div>
            <div className="w-6 h-0 my-1 bg-black 5"></div>

            </>
        )}
        </button>
        {isMenuOpen &&(
            <section className='bg-[151515] p-4 fixed right-7 top-7'>
                <ul className='mt-2 list-none'>
                    <li>
                        <NavLink>
                            
                        </NavLink>
                    </li>
                </ul>
            </section>
        )}  
    </>
  )
}

export default AdminMenu