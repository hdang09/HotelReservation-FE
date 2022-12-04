import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAppstore, AiFillAppstore, AiFillHome } from 'react-icons/ai';
import { MdHotelClass, MdOutlineHotelClass } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import { IoLogOut } from 'react-icons/io5';
import { BsGear, BsGearFill } from 'react-icons/bs';
import moreFeature from '../assets/more-feature.png';

import logo from '../assets/logo.png';
import Logout from './Logout';
import { useDispatch } from 'react-redux';
import { signOut } from '../app/authSlice';
import jwtDecode from 'jwt-decode';

const Sidebar = ({ className: propClassName }) => {
  const dispatch = useDispatch();

  const activeSidebarClassName = 'sm:border-r-4 border-primary';
  const tokenFromLocal = JSON.parse(localStorage.getItem('token'));
  const name = tokenFromLocal ? jwtDecode(tokenFromLocal).given_name : 'Anonymous';

  const handleLogout = () => {
    dispatch(signOut());
  };

  const SIDEBAR_LIST = [
    { name: 'Home', icon: <AiOutlineHome />, activeIcon: <AiFillHome />, to: '/' },
    {
      name: 'Reservation',
      icon: <MdOutlineHotelClass />,
      activeIcon: <MdHotelClass />,
      to: '/reservation',
    },
    { name: 'Rooms', icon: <AiOutlineAppstore />, activeIcon: <AiFillAppstore />, to: '/rooms' },
    // { name: 'Cleaning', icon: <MdOutlineCleaningServices />, activeIcon: < />, to: '/cleaning' },
    { name: 'Settings', icon: <BsGear />, activeIcon: <BsGearFill />, to: '/settings' },
    {
      name: <Logout />,
      icon: <IoLogOutOutline />,
      activeIcon: <IoLogOut />,
      to: '/login',
      onClick: handleLogout,
    },
  ];

  return (
    <div
      className={`bottom-0 fixed w-screen sm:w-16 min-h-fit sm:min-h-screen bg-white dark:bg-slate-800 sm:inset-y-0 drop-shadow-lg ease-in md:w-64 z-10 ${propClassName}`}
    >
      <Link
        to="/"
        className="hidden w-full h-20 sm:flex items-center justify-center py-4 sm:mb-4 hover:opacity-100"
      >
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="hidden text-2xl font-extrabold ml-3 md:block">Mint Hotel</span>
      </Link>

      <ul className="flex justify-around sm:block">
        {SIDEBAR_LIST.map((item) => (
          <li
            title={item.name}
            key={item.name}
            className="sm:block h-14 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
          >
            <NavLink
              to={item.to}
              onClick={item.onClick}
              className={({ isActive }) =>
                `flex px-4 sm:pl-6 md:pl-7 items-center h-full text-base text-gray-500  ${
                  isActive && activeSidebarClassName
                }`
              }
              children={({ isActive }) => {
                const active = isActive && 'text-primary dark:text-primary font-semibold';
                return (
                  <div className="flex items-center font-normal">
                    <span className={`text-xl text-gray-500 ${active}`}>
                      {isActive ? item.activeIcon : item.icon}
                    </span>
                    <span className={`hidden text-base text-gray-500 ml-4 md:block ${active}`}>
                      {item.name}
                    </span>
                  </div>
                );
              }}
            ></NavLink>
          </li>
        ))}
      </ul>

      <div className="hidden md:block mt-8">
        <img src={moreFeature} alt="" />
        <div className="flex justify-center flex-col items-center mt-4">
          <h2 className="font-semibold  mb-2">Hi, {name}!</h2>
          <p className="text-center text-sm">
            Need more feature? <br />
            Please contact admin
          </p>
          <a
            // href="https://github.com/hdang09"
            href="https://facebook.com/hdang.09"
            className="py-1 px-4 mt-4 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border-2 border-primary"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
