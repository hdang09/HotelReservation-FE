import React from 'react';
import config from '../config';
// import { GoogleLogout } from 'react-google-login';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signOut } from '../app/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const onLogout = (response) => {
    googleLogout();
    dispatch(signOut());
  };
  return (
    // <GoogleLogout
    //   clientId={config.CLIENT_ID}
    //   buttonText="Logout"
    //   onLogoutSuccess={onLogout}
    //   onFailure={(e) => console.log(e)}
    //   render={({ disabled, onClick }) => {
    //     return (
    //       <span onClick={onClick} disabled={disabled} className="leading-10">
    //         Log out
    //       </span>
    //     );
    //   }}
    // />
    <span onClick={onLogout} className="leading-10">
      Log out
    </span>
  );
};

export default Logout;
