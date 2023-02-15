import React from 'react';
import { Input } from './';
import jwt_decode from 'jwt-decode';

const Header = () => {
  const isCalendarPath = window.location.pathname === '/calendar';
  const display = isCalendarPath ? 'hidden' : 'flex';

  const tokenFromLocal = JSON.stringify(localStorage.getItem('token'));
  const token = tokenFromLocal ? jwt_decode(tokenFromLocal) : null;

  const hour = new Date().getHours();
  const greetings =
    hour >= 5 && hour < 12 ? 'morning' : hour >= 12 && hour < 18 ? 'afternoon' : 'evening';

  return (
    <div className={`${display} dark:bg-slate-900 justify-between items-center py-5 px-12`}>
      <div className="text-black dark:text-white">
        <h1 className="text-3xl font-bold">Good {greetings}!</h1>
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
