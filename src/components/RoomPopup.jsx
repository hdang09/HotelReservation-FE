import React from 'react';

import { FaSignature } from 'react-icons/fa';
import { HiOutlineIdentification, HiOutlineMail, HiOutlineStatusOnline } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import { FiDollarSign, FiLogIn, FiLogOut } from 'react-icons/fi';
import moment from 'moment';
import { updateStatus } from '../utils/productAPI';
import { toast } from 'react-toastify';

const RoomPopup = ({ room = {}, handleClose = () => {} }) => {
  const handleChangeStatus = async (status) => {
    try {
      await updateStatus(room._id, status);
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const ROOM_INFO_LIST = [
    {
      Icon: FaSignature,
      title: 'Fullname',
      data: room.fullname,
    },
    {
      Icon: HiOutlineIdentification,
      title: 'ID Card',
      data: room.idCard,
    },
    {
      Icon: BsTelephone,
      title: 'Phone',
      data: room.phone,
    },
    {
      Icon: HiOutlineMail,
      title: 'E-mail',
      data: room.email,
    },
    {
      Icon: FiLogIn,
      title: 'Check-in',
      data: moment(room.checkIn).format('dddd, DD/MM/YYYY 12:00'),
    },
    {
      Icon: FiLogOut,
      title: 'Check-out',
      data: moment(room.checkOut).format('dddd, DD/MM/YYYY 12:00'),
    },
    {
      Icon: HiOutlineStatusOnline,
      title: 'Status',
      data: room.status,
    },
    {
      Icon: FiDollarSign,
      title: 'Price',
      data: room.price,
    },
  ];

  return (
    <div className="w-screen h-screen fixed inset-0 z-10 flex justify-center items-center">
      <div className="absolute w-screen h-screen bg-black opacity-60 z-12" />
      <div className="absolute bg-white p-8 z-14 rounded-lg drop-shadow-lg dark:bg-slate-800">
        <button className="float-right" onClick={handleClose}>
          Close
        </button>
        <ul key={room._id}>
          <h1 className="font-bold text-4xl mb-4">Room: {room.roomNumber}</h1>

          {ROOM_INFO_LIST.map(({ Icon, title, data }) => {
            return (
              <li className="flex items-center my-2">
                <div className="w-12 h-12 bg-primary rounded-lg flex justify-center items-center text-2xl mr-3">
                  <Icon color="white" />
                </div>
                <div className="text-xl">
                  <p>{title}</p>
                  <p className="font-bold">{data}</p>
                </div>
              </li>
            );
          })}

          {/* <button onClick={handleEdit}>Edit</button> */}
          <button onClick={() => handleChangeStatus('Checked-in')}>Checked-in</button>
          <button onClick={() => handleChangeStatus('Checked-out')}>Checked-out</button>
          <button onClick={() => handleChangeStatus('Canceled')}>Remove</button>
        </ul>
      </div>
    </div>
  );
};

export default RoomPopup;
