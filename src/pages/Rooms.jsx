import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { getRoomsAsync } from '../app/roomsSlice';
import { Link } from 'react-router-dom';

import { useCallback } from 'react';

const NUMS_OF_FLOOR = 8,
  NUMS_ROOMS_EACH_FLOOR = 12;

const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const existedRooms = rooms?.map((room) => room.roomNumber);

  let list = [],
    item = [],
    floor;

  useEffect(() => {
    dispatch(getRoomsAsync());
  }, [dispatch]);

  const renderRooms = useCallback(() => {
    for (let room = 1; room <= NUMS_ROOMS_EACH_FLOOR; room++) {
      let roomNumber = floor * 100 + room;
      const isReserved = existedRooms.includes(roomNumber);
      item.push(
        <Link
          to={`/calendar?room=${roomNumber}`}
          key={roomNumber}
          className={`min-w-8 h-auto bg-white py-3 px-6 rounded-xl drop-shadow-lg cursor-pointer hover:opacity-60 text-black`}
        >
          <h2 className="font-semibold text-2xl">Room {roomNumber}</h2>
          <h3 className="text-lg font-normal">{isReserved ? 'Reserved' : 'Available'}</h3>
        </Link>
      );
    }
    return item;
  }, [item]);

  const renderFloors = useCallback(() => {
    for (floor = 1; floor <= NUMS_OF_FLOOR; floor++) {
      list.push(
        <div className="mb-8" key={floor}>
          <h1 className="text-3xl font-extrabold mb-4">Floor {floor}</h1>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-6">
            {renderRooms()}
          </div>
        </div>
      );
      item = [];
    }

    return list;
  }, [list]);

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
    </>
  );
};

Rooms.propTypes = {};

export default Rooms;
