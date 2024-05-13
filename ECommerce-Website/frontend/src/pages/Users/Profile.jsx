import React, { useEffect, useState } from 'react'
import { useProfileMutation } from '../../redux/api/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BraintreePayPalButtons } from '@paypal/react-paypal-js'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/Auth/authSlice'
import Navigation from '../Auth/Navigation'

const Profile = () => {
    const[username,setUsername]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')

    const{userInfo}=useSelector(state=>state.auth)



    const[updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation()

    useEffect(()=>{
        setUsername(userInfo.username)
        setEmail(userInfo.email)    
    },[userInfo.email,userInfo.username])

    const dispatch=useDispatch();


    const submitHandler=async(e)=>{
       e.preventDefault();

       if(password!==confirmPassword){
        toast.error('Password Not Match')
       }
       else{
        try {
            const res=await updateProfile({_id:userInfo._id,username,email,password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Profile updated successfully");
            
        } catch (error) {
            toast.error(error?.data?.message || error.message) 
        }
       }
    }
  return (
    <>
    <div className='container p-4 mx-auto mt-[10rem]'>
        <div className='flex justify-center align-center md:flex md:space-x-4'>
           <div className="md:w-1/3">
           <h2 className="mb-4 text-2xl font-semibold">
                Update Profile
            </h2>

            <form onSubmit={submitHandler}>
            <div className='mb-4'>
                <label htmlFor='name' className='block mb-2 text-gray-700'>Name</label>
                <input
                    type='text'
                    id='name'
                    placeholder='Enter Name'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor='email' className='block mb-2 text-gray-700'>Email Address</label>
                <input
                    type='email'
                    id='email'
                    placeholder='Enter Email Address'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <label htmlFor='password' className='block mb-2 text-gray-700'>Password</label>
                <input
                    type='password'
                    id='password'
                    placeholder='Enter Password'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <label htmlFor='confirmPassword' className='block mb-2 text-gray-700'> Confirm Password</label>
                <input
                    type='password'
                    id='confirmPassword'
                    placeholder='Confirm Password'
                    className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            
            <div className="flex justify-between">
                <button type='submit' className='px-4 py-2 bg-pink-500 rounded hover:bg-pink-600'>Update</button>
                <Link to='/user-orders' className='px-4 py-2 bg-pink-500 rounded hover:bg-pink-700'>
                    My Orders
                </Link>
            </div>
            </form>

           </div>
           {loadingUpdateProfile &&<Loader/>}
        </div>
    </div>
    </>
  )
}

export default Profile