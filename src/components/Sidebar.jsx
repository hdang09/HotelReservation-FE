import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAppstore, AiFillAppstore, AiFillHome } from 'react-icons/ai';
import { MdHotelClass, MdOutlineHotelClass } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import { IoLogOut } from 'react-icons/io5';
import { BsGear, BsGearFill } from 'react-icons/bs';

import logo from '../assets/logo.png';
import Logout from './Logout';

const Sidebar = ({ className: propClassName }) => {
  const activeSidebarClassName = 'border-r-4 border-primary bg-fade';

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
    { name: <Logout />, icon: <IoLogOutOutline />, activeIcon: <IoLogOut />, to: '/login' },
  ];

  return (
    <div
      className={`top-auto fixed w-screen sm:w-16 min-h-fit sm:min-h-screen bg-white sm:inset-y-0  drop-shadow-lg ease-in md:w-64 z-10 ${propClassName}`}
    >
      <div className="hidden w-full h-20 sm:flex items-center justify-center py-4 sm:mb-4">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="hidden text-2xl font-extrabold ml-3 md:block">Mint Hotel</span>
      </div>

      <ul className="flex justify-around sm:block">
        {SIDEBAR_LIST.map((item) => (
          <li
            title={item.name}
            key={item.name}
            className="sm:block h-14 hover:bg-gray-100 rounded-lg"
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex px-4 sm:pl-6 md:pl-7 items-center h-full text-base text-gray-500 ${
                  isActive && activeSidebarClassName
                }`
              }
              children={({ isActive }) => {
                const active = isActive && 'text-primary';
                return (
                  <>
                    <span className={`text-xl text-gray-500 ${active}`}>
                      {isActive ? item.activeIcon : item.icon}
                    </span>
                    <span className={`hidden text-base text-gray-500 ml-4 md:block ${active}`}>
                      {item.name}
                    </span>
                  </>
                );
              }}
            ></NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
