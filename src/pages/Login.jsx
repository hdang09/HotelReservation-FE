import React from 'react';
import GoogleLogin from 'react-google-login';
import { CLIENT_ID } from '../config';
// import hotel from '../assets/hotel.gif';
import { FcGoogle } from 'react-icons/fc';
import { login } from '../app/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();

  const onSuccess = (response) => {
    localStorage.setItem('token', JSON.stringify(response.tokenId));
    if (localStorage.getItem('token')) dispatch(login());
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen bg-white dark:bg-slate-900">
        <div className="flex flex-col bg-white dark:bg-slate-800 text-black dark:text-white justify-center items-center w-[28rem] h-[40rem] rounded-xl bg-white drop-shadow-2xl">
          <img src="hotel.gif" alt="Hotel" className="mb-6" />
          <h1 className="text-3xl font-bold mb-2s">Welcome Back!</h1>
          <h2>Sign in to Hotel Management</h2>
          <div className="bg-black dark:bg-white h-0.5 w-4/12 my-8" />
          <GoogleLogin
            client_Id={CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            render={({ disabled, onClick }) => {
              return (
                <button
                  disabled={disabled}
                  onClick={onClick}
                  className="flex justify-center items-center transition-all text-primary hover:bg-primary hover:text-white border-1 border-primary hover:border-primary bg-white dark:bg-slate-800 dark:hover:bg-primary"
                >
                  <FcGoogle />
                  <span className="ml-3">Continue with Google</span>
                </button>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
