import React from 'react';
import config from '../config';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { signOut } from '../app/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const onLogoutSuccess = (response) => {
    dispatch(signOut());
  };
  return (
    <GoogleLogout
      clientId={config.CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
      onFailure={(e) => console.log(e)}
      render={({ disabled, onClick }) => {
        return (
          <span onClick={onClick} disabled={disabled} className="leading-10">
            Log out
          </span>
        );
      }}
    />
  );
};

export default Logout;
