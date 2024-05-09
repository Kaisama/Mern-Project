import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { useLoginMutation } from '../../redux/api/userApiSlice'
import './Navigation.css'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { setCredentials } from '../../redux/features/Auth/authSlice'
import { toast } from 'react-toastify'
const Login = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const[login,{isLoading}]=useLoginMutation();
    const {userInfo}=useSelector(state=>state.auth)

    const {search}=useLocation()
    const sp=new URLSearchParams(search)
    const redirect=sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo]
)

const submitHandler=async(e)=>{
  e.preventDefault();
  try {
   
    const res=await login({email,password}).unwrap()
    console.log(res);
    dispatch(setCredentials({...res}))
    navigate(redirect)
  } catch (error) {
    toast.error(error?.data?.message||error.message)
  }
}

  return (
    <div>
        <section className='pl-[10rem] flex flex-wrap'>
            <div className='mr-[4rem] mt-[5rem]'>
                <h1 className="mb-4 text-2xl font-semibold">SignIN</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-1 border rounded"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 border rounded"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        </section>
    </div>
  )
}

export default Login
