import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import * as actions from '../app/actions'

const NUMS_OF_FLOOR = 8,
  NUMS_ROOMS_EACH_FLOOR = 12

const Rooms = (props) => {
  const dispatch = useDispatch()
  const rooms = useSelector((state) => state.rooms.data)
  console.log(rooms)
  const existedRooms = rooms.map((room) => room.roomNumber)

  let list = [],
    item = [],
    floor

  useEffect(() => {
    dispatch(actions.getRooms.getRoomsRequest())
  }, [dispatch])

  const [currentRoom, setCurrentRoom] = useState(false)
  const toggleShowRoomDetails = (roomNumber, isReserved) => {
    if (isReserved) {
      setCurrentRoom(roomNumber)
    } else alert("You haven't booked this room yet")
  }

  const renderRooms = () => {
    for (let room = 1; room <= NUMS_ROOMS_EACH_FLOOR; room++) {
      let roomNumber = floor * 100 + room
      const isReserved = existedRooms.includes(roomNumber)
      item.push(
        <div
          key={roomNumber}
          className={`min-w-8 h-auto ${
            isReserved ? 'bg-orange-500' : 'bg-white'
          } py-3 px-6 rounded-xl drop-shadow-lg cursor-pointer hover:opacity-60`}
          onClick={() => toggleShowRoomDetails(roomNumber, isReserved)}
        >
          <h2 className="font-bold text-2xl">Room {roomNumber}</h2>
          <h3 className="text-lg">{isReserved ? 'Reserved' : 'Available'}</h3>
        </div>,
      )
    }
    return item
  }

  const renderFloors = () => {
    for (floor = 1; floor <= NUMS_OF_FLOOR; floor++) {
      list.push(
        <div className="mb-8" key={floor}>
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

  return (
    <>
      <div>{renderFloors()}</div>
      {currentRoom && (
        <div className="w-screen h-screen fixed inset-0 z-10 flex justify-center items-center">
          <div className="absolute w-screen h-screen bg-black opacity-60 z-12"></div>
          <div className="absolute bg-white m-32 p-8 z-14 rounded-lg drop-shadow-lg">
            <button onClick={() => setCurrentRoom(null)}>Close</button>
            {rooms.map(
              (room) =>
                room.roomNumber === currentRoom && (
                  <div key={room._id}>
                    <p>Room: {room.roomNumber}</p>
                    <p>Fullname: {room.fullname}</p>
                    <p>ID Card: {room.idCard}</p>
                    <p>Phone: {room.phone}</p>
                    <p>E-mail: {room.email}</p>
                    <p>Check-in: {moment(room.checkIn).format('DD/MM/YYYY 12:00')}</p>
                    <p>Check-out: {moment(room.checkOut).format('DD/MM/YYYY 12:00')}</p>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </>
  )
}

Rooms.propTypes = {}

export default Rooms
