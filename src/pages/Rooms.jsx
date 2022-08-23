import React from 'react'
import PropTypes from 'prop-types'

const NUMS_OF_FLOOR = 8,
  NUMS_ROOMS_EACH_FLOOR = 12

const Rooms = (props) => {
  // const []
  let list = [],
    item = [],
    floor

  const renderRooms = () => {
    for (let room = 1; room <= NUMS_ROOMS_EACH_FLOOR; room++) {
      let roomNumber = floor * 100 + room
      item.push(
        <div
          key={roomNumber}
          className=" min-w--8 h-auto bg-white py-3 px-6 rounded-xl drop-shadow-lg cursor-pointer hover:bg-gray-200"
        >
          <h2 className="font-bold text-2xl">Room {roomNumber}</h2>
          <h3 className="text-lg">Available</h3>
        </div>,
      )
    }
    return item
  }

  const renderFloors = () => {
    for (floor = 1; floor <= NUMS_OF_FLOOR; floor++) {
      list.push(
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-4">Floor {floor}</h1>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-6">
            {renderRooms()}
          </div>
        </div>,
      )
      item = []
    }

    return list
  }

  return <div>{renderFloors()}</div>
}

Rooms.propTypes = {}

export default Rooms
