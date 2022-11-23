import { CLIENT_ID } from '../config';
import React from 'react';
import { GoogleLogout } from 'react-google-login';

const Logout = () => {
  const onLogoutSuccess = (response) => {
    localStorage.removeItem('token');
  };
  return (
    <GoogleLogout
      clientId={CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
      onFailure={(e) => console.log(e)}
      render={({ disabled, onClick }) => {
        return (
          <span onClick={onClick} disabled={disabled}>
            Log out
          </span>
        );
      }}
    />
  );
};

export default Logout;
