import React from 'react';
import config from '../config';
import hotel from '../assets/hotel.gif';
import { FcGoogle } from 'react-icons/fc';
import { login } from '../app/authSlice';
import { useDispatch } from 'react-redux';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const dispatch = useDispatch();

  const onSuccess = (response) => {
    console.log(response);
    localStorage.setItem('token', JSON.stringify(response.credential));
    if (localStorage.getItem('token')) dispatch(login());
  };

  const onFailure = (response) => {
    console.log(response);
  };

  const loginGoogle = useGoogleLogin({
    onSuccess,
    onFailure,
  });

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen bg-white dark:bg-white">
        <div className="flex flex-col bg-white dark:bg-white text-black dark:text-black justify-center items-center w-[28rem] h-[40rem] rounded-xl bg-white drop-shadow-2xl">
          <img src={hotel} alt="Hotel" className="mb-6" />
          <h1 className="text-3xl font-bold mb-2s">Welcome Back!</h1>
          <h2>Sign in to Hotel Management</h2>
          <div className="bg-black dark:bg-black h-0.5 w-4/12 my-8" />
          <GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap auto_select />
          {/* <button
            onClick={() => loginGoogle()}
            className="flex justify-center items-center transition-all text-primary hover:bg-primary hover:text-white border-1 border-primary hover:border-primary bg-white dark:bg-white dark:hover:bg-primary"
          >
            <FcGoogle />
            <span className="ml-3">Continue with Google</span>
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Login;
