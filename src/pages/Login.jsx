import React from 'react';
import GoogleLogin from 'react-google-login';
import { CLIENT_ID } from '../config';
import hotel from '../assets/hotel.gif';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const onSuccess = (response) => {
    localStorage.setItem('token', JSON.stringify(response.tokenId));
    if (localStorage.getItem('token')) window.location = '/';
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center w-[28rem] h-[40rem] rounded-xl bg-white drop-shadow-2xl">
          <img src={hotel} alt="Hotel" className="mb-6" />
          <h1 className="text-3xl font-bold mb-2s">Welcome Back!</h1>
          <h2>Sign in to Hotel Management</h2>
          <div className="bg-black h-0.5 w-4/12 my-8"></div>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            render={({ disabled, onClick }) => {
              return (
                <button
                  disabled={disabled}
                  onClick={onClick}
                  className="flex justify-center items-center transition-all text-primary hover:bg-primary hover:text-white border-1 border-primary hover:border-primary "
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
