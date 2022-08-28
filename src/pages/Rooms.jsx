import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { PacmanLoader } from 'react-spinners'
import { FaSignature } from 'react-icons/fa'
import { HiOutlineIdentification, HiOutlineMail } from 'react-icons/hi'
import { BsTelephone } from 'react-icons/bs'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import * as actions from '../app/actions'
import { useCallback } from 'react'

const NUMS_OF_FLOOR = 8,
  NUMS_ROOMS_EACH_FLOOR = 12

const Rooms = (props) => {
  const dispatch = useDispatch()
  const rooms = useSelector((state) => state.rooms.data)
  let isLoading = useSelector((state) => state.rooms.isLoading)
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

  const renderRooms = useCallback(() => {
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
  }, [item])

  const renderFloors = useCallback(() => {
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
  }, [list])

  return (
    <>
      <div className="w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center mt-[-50px]">
            <PacmanLoader color="orange" />
          </div>
        ) : (
          renderFloors()
        )}
      </div>

      {currentRoom && (
        <div className="w-screen h-screen fixed inset-0 z-10 flex justify-center items-center">
          <div className="absolute w-screen h-screen bg-black opacity-60 z-12"></div>
          <div className="absolute bg-white p-8 z-14 rounded-lg drop-shadow-lg">
            <button className="float-right" onClick={() => setCurrentRoom(null)}>
              Close
            </button>
            {rooms.map(
              (room) =>
                room.roomNumber === currentRoom && (
                  <div key={room._id}>
                    <h1 className="font-bold text-4xl mb-4">Room: {room.roomNumber}</h1>
                    {/* Fullname */}
                    <div className="flex items-center my-2">
                      <div className="w-12 h-12 bg-orange-400 rounded-lg flex justify-center items-center text-2xl mr-3">
                        <FaSignature />
                      </div>
                      <div className="text-xl">
                        <p>Fullname</p>
                        <p className="font-bold">{room.fullname}</p>
                      </div>
                    </div>

                    {/* ID Card */}
                    <div className="flex items-center my-2">
                      <div className="w-12 h-12 bg-orange-400 rounded-lg flex justify-center items-center text-2xl mr-3">
                        <HiOutlineIdentification />
                      </div>
                      <div className="text-xl">
                        <p>ID Card</p>
                        <p className="font-bold">{room.idCard}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center my-2">
                      <div className="w-12 h-12 bg-orange-400 rounded-lg flex justify-center items-center text-2xl mr-3">
                        <BsTelephone />
                      </div>
                      <div className="text-xl">
                        <p>Phone</p>
                        <p className="font-bold">{room.phone}</p>
                      </div>
                    </div>

                    {/* E-mail */}
                    <div className="flex items-center my-2">
                      <div className="w-12 h-12 bg-orange-400 rounded-lg flex justify-center items-center text-2xl mr-3">
                        <HiOutlineMail />
                      </div>
                      <div className="text-xl">
                        <p>E-mail</p>
                        <p className="font-bold">{room.email}</p>
                      </div>
                    </div>

                    {/* Check-in */}
                    <div className="flex items-center my-2">
                      <div className="w-12 h-12 bg-orange-400 rounded-lg flex justify-center items-center text-2xl mr-3">
                        <FiLogIn />
                      </div>
                      <div className="text-xl">
                        <p>Check-in</p>
                        <p className="font-bold">{moment(room.checkIn).format('ddd, DD/MM/YYYY 12:00 A')}</p>
                      </div>
                    </div>

                    {/* Check-out */}
                    <div className="flex items-center my-2">
                      <div className="w-12 h-12 bg-orange-400 rounded-lg flex justify-center items-center text-2xl mr-3">
                        <FiLogOut />
                      </div>
                      <div className="text-xl">
                        <p>Check-out</p>
                        <p className="font-bold">{moment(room.checkOut).format('ddd, DD/MM/YYYY 12:00 A')}</p>
                      </div>
                    </div>
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
