import React, { useEffect, useState } from 'react';
import { useRegisterMutation } from '../../redux/api/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../../redux/features/Auth/authSlice';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Password does not match!');
        } else {
            try {
                const res = await register({ username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success('User successfully registered!');
            } catch (error) {
                toast.error(error.data.message || 'An error occurred while registering.');
            }
        }
    };

    return (
        <section className='pl-[10rem] flex flex-wrap'>
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="mb-4 text-2xl font-semibold">Register</h1>
                
                <form onSubmit={submitHandler} className='container w-[40rem]'>
                    <div className='my-[2rem]'>
                        <label htmlFor='name' className='block text-sm font-medium text-black'>Name</label>
                        <input type='text' id='name' className='w-full p-2 mt-1 border rounded'
                            placeholder='Enter Name'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /> 
                          
                        <label htmlFor='email' className='block text-sm font-medium text-black'>Email Address</label>
                        <input type='email' id='email' className='w-full p-2 mt-1 border rounded'
                            placeholder='Enter your Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />  

                        <label htmlFor='password' className='block text-sm font-medium text-black'>Password</label>
                        <input type='password' id='password' className='w-full p-2 mt-1 border rounded'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />       

                        <label htmlFor='confirm-password' className='block text-sm font-medium text-black'>Confirm Password</label>
                        <input type='password' id='confirm-password' className='w-full p-2 mt-1 border rounded'
                            placeholder='Confirm your Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />                        
                    </div>
                    <button className="px-4 py-2 text-white bg-pink-500 rounded cursor-pointer my-[1rem]" 
                        disabled={isLoading}
                        type="submit">
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    {isLoading && <Loader />}
                </form>
                <div className='mt-4'>
                    <p className="text-black">
                        Already have an account?{" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : `/login`} className='text-pink-500 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            
          <img
          src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
          alt=""
          className="m-2 h-[55rem] w-[46%] xl:block md:hidden sm:hidden rounded-lg"
        />
  
        </section>
    );
};

export default Register;
