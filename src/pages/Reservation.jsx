import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import { Input } from '../components';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { bookRoom, getSpecificRoom } from '../utils/productAPI';
import { toast } from 'react-toastify';
import getDates from '../utils/getDates';

const Reservation = () => {
  const { control, register, handleSubmit } = useForm();

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
    } catch (e) {
      toast.error(e.message);
    }
  };

  const onSubmit = useCallback(
    async (data) => {
      try {
        const res = await bookRoom({
          ...roomData,
          checkIn: roomData.checkIn,
          checkOut: roomData.checkOut,
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
    },
    [roomData]
  );

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
    <div className="p-2">
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
      <div className="bg-white rounded-lg drop-shadow-lg">
        <header className="bg-gray-200 text-xl px-4 py-2 font-bold">Your Reservation</header>
        <div className="px-6 py-4">
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
          <p className="mb-4">
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

  return (
    <>
      <div>
        <form className="grid grid-cols-1 lg:grid-cols-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              selectRooms
              label="Room Number"
              {...register('roomNumber', { required: true })}
              value={roomData.roomNumber}
              onChange={handleSetRoomNumber}
            />
            <Input
              placeholder="Example: Tran Hai Dang"
              label="Fullname"
              {...register('fullname', { required: true })}
              value={roomData.fullname}
              onChange={(e) => setRoomData((prev) => ({ ...prev, fullname: e.target.value }))}
            />
            <Input
              label="Identity Card (ID)"
              placeholder="Example: 074212345678"
              type="number"
              {...register('idCard', { required: true, minLength: 9, maxLength: 12 })}
              value={roomData.idCard}
              onChange={(e) => setRoomData((prev) => ({ ...prev, idCard: Number(e.target.value) }))}
            />
            <Input
              placeholder="Example: dangtranhai628@gmail.com"
              label="Email"
              type="email"
              {...register('email', { required: false })}
              value={roomData.email}
              onChange={(e) => setRoomData((prev) => ({ ...prev, email: e.target.value }))}
            />
            <Input
              placeholder="Example: 0123456789"
              label="Phone Number"
              type="number"
              {...register('phone', { required: true, minLength: 10, maxLength: 10 })}
              value={roomData.phone}
              onChange={(e) => setRoomData((prev) => ({ ...prev, phone: e.target.value }))}
            />
            {/* <RenderServices /> */}
            <RenderStatus />
          </div>
          <div>
            <Controller
              name="dateRanges"
              control={control}
              render={({ field }) => (
                <DateRange
                  {...field}
                  editableDateInputs={true}
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
                />
              )}
            />
          </div>

          <div className="py-3 px-6 sm:px-12">
            <PreviewReservation />
          </div>
        </form>
      </div>
    </>
  );
};

export default Reservation;
