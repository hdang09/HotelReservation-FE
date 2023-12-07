import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { Controller, useForm } from 'react-hook-form';
import { HiOutlineIdentification, HiOutlineMail, HiOutlineStatusOnline } from 'react-icons/hi';
import { bookRoom, getSpecificRoom } from '../utils/productAPI';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { BsTelephone } from 'react-icons/bs';
import { DateRange } from 'react-date-range';
import { ErrorMessage } from '@hookform/error-message';
import { FaSignature } from 'react-icons/fa';
import { Input } from '../components';
import getDates from '../utils/getDates';
import moment from 'moment';
import { toast } from 'react-toastify';

const Reservation = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [roomData, setRoomData] = useState({
    roomNumber: undefined,
    fullname: '',
    idCard: '',
    phone: '',
    services: {
      motorbikeRental: false,
      parking: false,
    },
    checkIn: undefined,
    checkOut: undefined,
    email: '',
    price: 0,
  });

  // Calculate price
  let roomType = useMemo(
    () =>
      roomData.roomNumber % 100 <= 3
        ? 100
        : roomData.roomNumber % 100 <= 6
        ? 150
        : roomData.roomNumber % 100 <= 9
        ? 200
        : roomData.roomNumber % 100 <= 12
        ? 250
        : 0,
    [roomData.roomNumber]
  );

  // Set document title
  useEffect(() => {
    document.title = 'Reservation | Mint Hotel';
  }, []);

  const MILISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
  let start = useMemo(() => roomData.checkIn, [roomData.checkIn]);
  let end = useMemo(() => roomData.checkOut, [roomData.checkOut]);
  let countDays = useMemo(
    () => Math.round(Math.abs((end - start) / MILISECONDS_PER_DAY) + 1),
    [start, end]
  );
  let price = roomType * countDays;

  useEffect(() => {
    setRoomData((prev) => ({ ...prev, price }));
  }, [roomType, countDays]);

  const [dateRanges, setDateRanges] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const handleSetRoomNumber = async (e) => {
    setRoomData((prev) => ({ ...prev, roomNumber: Number(e.target.value) }));
    try {
      const { data } = await getSpecificRoom(e.target.value);
      let disabledDates = data.rooms.map((room) => getDates(room.checkIn, room.checkOut)).flat();
      setRoomData((prev) => ({ ...prev, disabledDates }));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onSubmit = useCallback(async () => {
    try {
      const res = await bookRoom({
        ...roomData,
        checkIn: roomData.checkIn,
        checkOut: roomData.checkOut,
        idCard: Number(roomData.idCard),
        price,
      });
      toast.success(res.data.message);
      setRoomData({
        roomNumber: undefined,
        fullname: '',
        idCard: '',
        phone: '',
        services: {
          motorbikeRental: false,
          parking: false,
        },
        checkIn: undefined,
        checkOut: undefined,
        email: '',
        status: '',
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }, [roomData]);

  const BILL = [
    { name: 'Fullname', details: roomData.fullname },
    { name: 'ID Card', details: roomData.idCard },
    { name: 'Email', details: roomData.email },
    { name: 'Phone', details: roomData.phone },
    { name: 'Check-in', details: roomData.checkIn },
    { name: 'Check-out', details: roomData.checkOut },
    { name: 'Status', details: roomData.status },
  ];

  const RenderServices = () => (
    <div>
      <h2>Services: </h2>
      <div className="m-2">
        <input
          id="parking"
          type="checkbox"
          {...register('parking')}
          value={roomData.parking}
          onChange={(e) => setRoomData({ ...roomData, services: { parking: e.target.checked } })}
        />
        <label htmlFor="parking" className="pl-2">
          Parking (5$/month)
        </label>
      </div>
      <div className="m-2">
        <input
          id="motorbike-rental"
          type="checkbox"
          {...register('motorbikeRental')}
          value={roomData.motorbikeRental}
          onChange={(e) =>
            setRoomData({ ...roomData, motorbikeRental: { motorbikeRental: e.target.checked } })
          }
        />
        <label htmlFor="motorbike-rental" className="pl-2">
          Motorbike for rent (8$/month)
        </label>
      </div>
    </div>
  );

  const RenderStatus = () => (
    <div className="flex flex-col items-center justify-center lg:block p-2 text-black dark:text-white">
      <h2>Status: </h2>
      <div className="m-2">
        <input
          id="reserved"
          type="radio"
          onChange={() => setRoomData({ ...roomData, status: 'Reserved' })}
          checked={roomData.status === 'Reserved'}
        />
        <label htmlFor="reserved" className="pl-2">
          Reserved
        </label>
      </div>
      <div className="m-2">
        <input
          id="checked-in"
          type="radio"
          onChange={() => setRoomData({ ...roomData, status: 'Checked-in' })}
          checked={roomData.status === 'Checked-in'}
        />
        <label htmlFor="checked-in" className="pl-2">
          Checked-in
        </label>
      </div>
    </div>
  );

  const PreviewReservation = () => {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg drop-shadow-lg">
        <header className="bg-gray-200 dark:bg-slate-700 text-xl px-4 py-2 font-bold text-black dark:text-white">
          Your Reservation
        </header>
        <div className="px-6 py-4 text-black dark:text-white">
          <div className="mb-2">
            <span className="font-semibold">Room </span>
            <strong>{roomData.roomNumber}</strong>
          </div>
          {BILL.map((item) => (
            <div className="mb-2" key={item.name}>
              <span>{item.name}:</span>
              <span className="float-right">
                {item.details
                  ? item.details instanceof Date && !isNaN(item.details)
                    ? moment(item.details).format('DD/MM/YYYY 12:00')
                    : String(item.details)
                  : '.........'}
              </span>
            </div>
          ))}
          <div>
            Services:{' '}
            {Object.entries(roomData.services).map(
              ([key, value]) =>
                value && (
                  <span className="float-right" key={key}>
                    {key}
                  </span>
                )
            )}
          </div>
        </div>
        <footer className="px-4 py-2 font-bold">
          <p className="mb-4 text-black dark:text-white">
            Total price: <span className="float-right">${roomData.price || 0}</span>
          </p>
          <input
            type="submit"
            className="w-full py-3 px-8 rounded-lg bg-primary text-white drop-shadow hover:opacity-75 cursor-pointer"
          />
        </footer>
      </div>
    );
  };

  const FORM_LIST = [
    {
      label: 'Room Number',
      name: 'roomNumber',
      isSelectRooms: true,
      handleChange: handleSetRoomNumber,
      Icon: <FaSignature />,
    },
    {
      label: 'Fullname',
      name: 'fullname',
      placeholder: 'Tran Hai Dang',
      Icon: <FaSignature />,
    },
    {
      label: 'Identity Card (ID)',
      name: 'idCard',
      placeholder: '074212345678',
      type: 'number',
      rules: {
        minLength: 9,
        maxLength: 12,
      },
      Icon: <HiOutlineIdentification />,
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'dangtranhai628@gmail.com',
      type: 'email',
      Icon: <HiOutlineMail />,
    },
    {
      label: 'Phone Number',
      name: 'phone',
      placeholder: '0123456789',
      type: 'number',
      rules: {
        minLength: 10,
        maxLength: 10,
      },
      Icon: <BsTelephone />,
    },
  ];

  return (
    <>
      <div>
        <form
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-1 xl:col-span-2 grid grid-cols-1 xl:grid-cols-2">
            <div>
              {FORM_LIST.map(({ name, ...item }) => {
                return (
                  <React.Fragment key={name}>
                    <Input
                      selectRooms={item.isSelectRooms}
                      label={item.label}
                      {...register(name, { required: true, ...item.rules })}
                      value={roomData[name]}
                      onChange={
                        item.handleChange ||
                        ((e) => setRoomData((prev) => ({ ...prev, [name]: e.target.value })))
                      }
                      placeholder={item.placeholder}
                      icon={item.Icon}
                      type={item.type}
                    />
                    <ErrorMessage
                      errors={errors}
                      name={name}
                      render={({ message }) => <p>{message}</p>}
                    />
                  </React.Fragment>
                );
              })}

              {/* <RenderServices /> */}
              <RenderStatus />
            </div>
            <div className="flex flex-col items-center justify-center lg:block">
              <label htmlFor="" className="block text-base text-gray-500 dark:text-gray-300 mb-2">
                Check In - Check Out
              </label>
              <Controller
                name="dateRanges"
                control={control}
                render={({ field }) => (
                  <DateRange
                    {...field}
                    showDateDisplay={false}
                    minDate={new Date()}
                    months={2}
                    onChange={(item) => {
                      setRoomData({
                        ...roomData,
                        checkIn: item.selection.startDate,
                        checkOut: item.selection.endDate,
                      });
                      setDateRanges([item.selection]);
                      field.onChange(item);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRanges}
                    disabledDates={roomData.disabledDates}
                    endDatePlaceholder="Early"
                    className="bg-white dark:bg-slate-800 date-range"
                  />
                )}
              />
            </div>
          </div>

          <div className="py-3 px-6 max-w-md">
            <PreviewReservation />
          </div>
        </form>
      </div>
    </>
  );
};

export default Reservation;
