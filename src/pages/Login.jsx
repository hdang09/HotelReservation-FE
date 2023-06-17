import { FcGoogle } from 'react-icons/fc';
import GoogleLogin from 'react-google-login';
import config from '../config';
import hotel from '../assets/hotel.gif';
import { login } from '../app/authSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useDispatch();

  // Set document title
  useEffect(() => {
    document.title = 'Login | Mint Hotel';
  }, []);

  const onSuccess = (response) => {
    localStorage.setItem('token', JSON.stringify(response.tokenId));
    if (localStorage.getItem('token')) dispatch(login());
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen bg-gray-100 dark:bg-white">
        <div className="flex flex-col dark:bg-white text-black dark:text-black justify-center items-center w-[28rem] h-[40rem] rounded-xl bg-white drop-shadow-2xl">
          <img src={hotel} alt="Hotel" className="mb-6" />
          <h1 className="text-3xl font-bold mb-2s">Welcome Back!</h1>
          <h2>Sign in to Mint Hotel</h2>
          <div className="bg-black dark:bg-black h-0.5 w-4/12 my-8" />
          <GoogleLogin
            client_Id={config.CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            render={({ disabled, onClick }) => {
              return (
                <button
                  disabled={disabled}
                  onClick={onClick}
                  className="flex justify-center items-center transition-all text-primary hover:bg-primary hover:text-white border-1 border-primary hover:border-primary bg-white dark:bg-white dark:hover:bg-primary"
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
