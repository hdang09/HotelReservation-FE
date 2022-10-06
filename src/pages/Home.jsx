import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '../components'

const Home = (props) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-6">
        <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#5C9ADE]">
          <div>
            <p className="text-gray-400">New Booked Rooms</p>
            <h2 className="text-3xl text-black mb-4 font-semibold">64</h2>
            <p className="text-sm">
              16 new booked rooms <span className="text-gray-400">today</span>
            </p>
          </div>
          <div>Icon</div>
        </div>
        <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#cf8080]">
          <div>
            <p className="text-gray-400">Cancelled Rooms</p>
            <h2 className="text-3xl text-black mb-4 font-semibold">16</h2>
            <p className="text-sm">
              2 cancelled rooms <span className="text-gray-400">today</span>
            </p>
          </div>
          <div>Icon</div>
        </div>
        <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#50aca3]">
          <div>
            <p className="text-gray-400">Check In</p>
            <h2 className="text-3xl text-black mb-4 font-semibold">24</h2>
            <p className="text-sm">
              43 check-in <span className="text-gray-400">today</span>
            </p>
          </div>
          <div>Icon</div>
        </div>
        <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4">
          <div>
            <p className="text-gray-400">Check Out</p>
            <h2 className="text-3xl text-black mb-4 font-semibold">28</h2>
            <p className="text-sm">
              34 check-out <span className="text-gray-400">today</span>
            </p>
          </div>
          <div>Icon</div>
        </div>
      </div>
      <div></div>
    </>
  )
}

Home.propTypes = {}

export default Home
