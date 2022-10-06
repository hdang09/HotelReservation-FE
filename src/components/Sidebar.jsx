import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineAppstore } from 'react-icons/ai'
import { MdHotelClass, MdOutlineCleaningServices, MdOutlineLogout } from 'react-icons/md'
import { BsGear } from 'react-icons/bs'

import logo from '../assets/logo.png'

const SIDEBAR_LIST = [
  { name: 'Home', icon: <AiOutlineHome />, to: '/' },
  { name: 'Reservation', icon: <MdHotelClass />, to: '/reservation' },
  { name: 'Rooms', icon: <AiOutlineAppstore />, to: '/rooms' },
  // { name: 'Cleaning', icon: <MdOutlineCleaningServices />, to: '/cleaning' },
  { name: 'Settings', icon: <BsGear />, to: '/settings' },
  { name: 'Log out', icon: <MdOutlineLogout />, to: '/logout' },
]

const Sidebar = ({ className: propClassName }) => {
  return (
    <div
      className={`top-auto fixed w-screen sm:w-16 min-h-fit sm:min-h-screen bg-white inset-y-0 drop-shadow-lg ease-in md:w-60 z-10 ${propClassName}`}
    >
      <div className="hidden w-full h-20 sm:flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="hidden text-2xl font-extrabold ml-3 md:block">Mint Hotel</span>
      </div>

      <ul className="flex justify-around sm:block">
        {SIDEBAR_LIST.map((item) => (
          <li title={item.name} key={item.name} className="sm:block h-12 my-2 hover:bg-gray-100 rounded-lg">
            <Link
              to={item.to}
              className="flex px-4 sm:pl-6 md:pl-7 items-center h-full text-base text-gray-500 "
              title={item.name}
            >
              <span className="text-xl text-gray-500">{item.icon}</span>
              <span className="hidden text-base text-gray-500 ml-4 md:block">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

Sidebar.propTypes = {}

export default Sidebar
