import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PacmanLoader } from 'react-spinners'
import { getRoomsAsync } from '../app/roomsSlice'

import { useCallback } from 'react'
import RoomPopup from '../components/RoomPopup'

const NUMS_OF_FLOOR = 8,
  NUMS_ROOMS_EACH_FLOOR = 12

const Rooms = () => {
  const dispatch = useDispatch()
  const rooms = useSelector((state) => state.rooms)
  const existedRooms = rooms?.map((room) => room.roomNumber)

  let list = [],
    item = [],
    floor

  useEffect(() => {
    dispatch(getRoomsAsync())
  }, [dispatch])

  const [popup, setPopup] = useState(false)
  const toggleShowRoomDetails = (roomNumber, isReserved) => {
    if (isReserved) {
      setPopup(roomNumber)
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
            isReserved ? 'bg-primary' : 'bg-white'
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

  const handleClose = () => {
    setPopup(null)
  }

  const currentRoom = () => {
    let currentRoom = {}
    rooms.forEach((room) => {
      if (room.roomNumber === popup) currentRoom = room
    })
    return currentRoom
  }

  return (
    <>
      <div className="w-full h-full">
        {rooms == [] ? (
          <div className="w-full h-full flex justify-center items-center mt-[-50px]">
            <PacmanLoader color="var(--primary-color)" />
          </div>
        ) : (
          renderFloors()
        )}
      </div>

      {popup && <RoomPopup room={currentRoom()} handleClose={handleClose} />}
    </>
  )
}

Rooms.propTypes = {}

export default Rooms
