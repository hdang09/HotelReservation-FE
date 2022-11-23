import React from 'react';
import { Input } from './';
import jwt_decode from 'jwt-decode';

const Header = () => {
  const isCalendarPath = window.location.pathname === '/calendar';
  const display = isCalendarPath ? 'hidden' : 'flex';

  const token = jwt_decode(JSON.stringify(localStorage.getItem('token')));

  return (
    <div className={`${display} justify-between items-center py-3 px-6`}>
      <div>
        <h1 className="text-3xl font-bold">Good morning!</h1>
        <h3>Welcome back and explore our hotel</h3>
      </div>
      {/* <Input noLabel className="hidden w-[25rem] lg:block" /> */}
      <div className="hidden sm:flex items-center">
        <img src={token.picture} className="w-10 h-10 rounded-full mr-2" />
        <h2>{token.name}</h2>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
