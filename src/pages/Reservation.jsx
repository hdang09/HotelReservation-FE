import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DateRange } from 'react-date-range'
import moment from 'moment'

import * as actions from '../app/actions'
import { getRooms, bookRoom } from '../app/actions'
import { Input } from '../components'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

const Reservation = (props) => {
  const dispatch = useDispatch()
  dispatch(getRooms.getRoomsRequest())

  const { control, register, handleSubmit } = useForm()

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
  })
  const [dateRanges, setDateRanges] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])

  const onSubmit = useCallback(
    (data) => {
      dispatch(bookRoom.bookRoomRequest(roomData))
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
      })
    },
    [dispatch, roomData],
  )

  const BILL = [
    { name: 'Fullname', details: roomData.fullname },
    { name: 'ID Card', details: roomData.idCard },
    { name: 'Email', details: roomData.email },
    { name: 'Phone', details: roomData.phone },
    { name: 'Check-in', details: roomData.checkIn },
    { name: 'Check-out', details: roomData.checkOut },
  ]

  return (
    <>
      <div>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              selectRooms
              label="Room Number"
              {...register('roomNumber', { required: true })}
              value={roomData.roomNumber}
              onChange={(e) => setRoomData({ ...roomData, roomNumber: Number(e.target.value) })}
            />
            <Input
              placeholder="Example: Tran Hai Dang"
              label="Fullname"
              {...register('fullname', { required: true })}
              value={roomData.fullname}
              onChange={(e) => setRoomData({ ...roomData, fullname: e.target.value })}
            />
            <Input
              label="Identity Card (ID)"
              placeholder="Example: 074212345678"
              type="number"
              {...register('idCard', { required: true, minLength: 9, maxLength: 12 })}
              value={roomData.idCard}
              onChange={(e) => setRoomData({ ...roomData, idCard: Number(e.target.value) })}
            />
            <Input
              placeholder="Example: dangtranhai628@gmail.com"
              label="Email"
              type="email"
              {...register('email', { required: false })}
              value={roomData.email}
              onChange={(e) => setRoomData({ ...roomData, email: e.target.value })}
            />
            <Input
              placeholder="Example: 0123456789"
              label="Phone Number"
              type="number"
              {...register('phone', { required: true, minLength: 10, maxLength: 10 })}
              value={roomData.phone}
              onChange={(e) => setRoomData({ ...roomData, phone: e.target.value })}
            />
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
                  onChange={(e) => setRoomData({ ...roomData, motorbikeRental: { motorbikeRental: e.target.checked } })}
                />
                <label htmlFor="motorbike-rental" className="pl-2">
                  Motorbike for rent (8$/month)
                </label>
              </div>
            </div>
          </div>
          <div>
            <Controller
              name="dateRanges"
              control={control}
              render={({ field }) => (
                <DateRange
                  {...field}
                  editableDateInputs={true}
                  onChange={(item) => {
                    setRoomData({ ...roomData, checkIn: item.selection.startDate, checkOut: item.selection.endDate })
                    setDateRanges([item.selection])
                    field.onChange(item)
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRanges}
                />
              )}
            />
          </div>

          <div className="py-3 px-12">
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
                      ),
                  )}
                </div>
              </div>
              <footer className="px-4 py-2 font-bold">
                <p className="mb-4">
                  Total price: <span className="float-right">0$</span>
                </p>
                <input
                  type="submit"
                  className="w-full py-3 px-8 rounded-lg bg-orange-400 text-white drop-shadow hover:opacity-75 cursor-pointer"
                />
              </footer>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

Reservation.propTypes = {}

export default Reservation
