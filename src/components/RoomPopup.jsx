import React from 'react';

import { FaSignature } from 'react-icons/fa';
import { HiOutlineIdentification, HiOutlineMail } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import moment from 'moment';
import { updateStatus } from '../utils/productAPI';

const RoomPopup = ({ room = {}, handleClose = () => {} }) => {
  const handleEdit = () => {};

  const handleChangeStatus = async (status) => {
    try {
      const res = await updateStatus(room._id, status);
      handleClose();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-screen h-screen fixed inset-0 z-10 flex justify-center items-center">
      <div className="absolute w-screen h-screen bg-black opacity-60 z-12"></div>
      <div className="absolute bg-white p-8 z-14 rounded-lg drop-shadow-lg">
        <button className="float-right" onClick={handleClose}>
          Close
        </button>
        <div key={room._id}>
          <h1 className="font-bold text-4xl mb-4">Room: {room.roomNumber}</h1>
          {/* Fullname */}
          <div className="flex items-center my-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex justify-center items-center text-2xl mr-3">
              <FaSignature />
            </div>
            <div className="text-xl">
              <p>Fullname</p>
              <p className="font-bold">{room.fullname}</p>
            </div>
          </div>

          {/* ID Card */}
          <div className="flex items-center my-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex justify-center items-center text-2xl mr-3">
              <HiOutlineIdentification />
            </div>
            <div className="text-xl">
              <p>ID Card</p>
              <p className="font-bold">{room.idCard}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center my-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex justify-center items-center text-2xl mr-3">
              <BsTelephone />
            </div>
            <div className="text-xl">
              <p>Phone</p>
              <p className="font-bold">{room.phone}</p>
            </div>
          </div>

          {/* E-mail */}
          <div className="flex items-center my-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex justify-center items-center text-2xl mr-3">
              <HiOutlineMail />
            </div>
            <div className="text-xl">
              <p>E-mail</p>
              <p className="font-bold">{room.email}</p>
            </div>
          </div>

          {/* Check-in */}
          <div className="flex items-center my-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex justify-center items-center text-2xl mr-3">
              <FiLogIn />
            </div>
            <div className="text-xl">
              <p>Check-in</p>
              <p className="font-bold">{moment(room.checkIn).format('dddd, DD/MM/YYYY 12:00')}</p>
            </div>
          </div>

          {/* Check-out */}
          <div className="flex items-center my-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex justify-center items-center text-2xl mr-3">
              <FiLogOut />
            </div>
            <div className="text-xl">
              <p>Check-out</p>
              <p className="font-bold">{moment(room.checkOut).format('dddd, DD/MM/YYYY 12:00')}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center my-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex justify-center items-center text-2xl mr-3">
              <FiLogOut />
            </div>
            <div className="text-xl">
              <p>Status</p>
              <p className="font-bold">{room.status}</p>
            </div>
          </div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => handleChangeStatus('Checked-in')}>Checked-in</button>
          <button onClick={() => handleChangeStatus('Checked-out')}>Checked-out</button>
          <button onClick={() => handleChangeStatus('Canceled')}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default RoomPopup;
