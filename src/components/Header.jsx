import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './'
import { RiMenu2Fill } from 'react-icons/ri'

const Header = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between items-center py-3 px-6">
      <div>
        <h1 className="text-3xl font-bold">Good morning!</h1>
        <h3>Welcome back and explore our hotel</h3>
      </div>
      <Input noLabel className="hidden w-[25rem] lg:block" />
      <div className="hidden sm:block">
        <h2>Avatar</h2>
        <h2>Tran Hai Dang</h2>
      </div>
      <RiMenu2Fill
        onClick={toggleSidebar}
        className="block sm:hidden text-6xl hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2"
      />
    </div>
  )
}

Header.propTypes = {}

export default Header
