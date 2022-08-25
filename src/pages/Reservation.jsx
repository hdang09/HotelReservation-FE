import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import * as actions from '../app/actions'
import { getRooms, bookRoom } from '../app/actions'
import { Input } from '../components'
import { useForm, Controller } from 'react-hook-form'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

const Reservation = (props) => {
  const dispatch = useDispatch()

  const [dateRanges, setDateRanges] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  // const [submittedData, setSubmittedData] = useState({})
  const { control, register, handleSubmit } = useForm()
  dispatch(getRooms.getRoomsRequest())

  const onSubmit = useCallback(
    (data) => {
      const newData = {
        ...data,
        services: { motorbikeRental: data.motorbikeRental, parking: data.parking },
        checkIn: data.dateRanges.selection.startDate,
        checkOut: data.dateRanges.selection.endDate,
        phone: parseInt(data.phone),
        roomNumber: parseInt(data.roomNumber),
        idCard: parseInt(data.idCard),
      }
      delete newData.dateRanges
      delete newData.motorbikeRental
      delete newData.parking
      console.log(newData)
      dispatch(bookRoom.bookRoomRequest(newData))
      // setSubmittedData(newData)
    },
    [dispatch],
  )

  return (
    <>
      <div>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input selectRooms label="Room Number" {...register('roomNumber', { required: true })} />
            <Input
              placeholder="Example: Tran Hai Dang"
              label="Fullname"
              {...register('fullname', { required: true })}
            />
            <Input
              label="Identity Card (ID)"
              placeholder="Example: 074212345678"
              type="number"
              {...register('idCard', { required: true, minLength: 9, maxLength: 12 })}
            />
            <Input
              placeholder="Example: dangtranhai628@gmail.com"
              label="Email"
              type="email"
              {...register('email', { required: true })}
            />
            <Input
              placeholder="Example: 0123456789"
              label="Phone Number"
              type="number"
              {...register('phone', { required: true, minLength: 10, maxLength: 10 })}
            />
            <div>
              <h2>Services: </h2>
              <div className="m-2">
                <input id="parking" type="checkbox" {...register('parking')} />
                <label htmlFor="parking" className="pl-2">
                  Parking (5$/month)
                </label>
              </div>
              <div className="m-2">
                <input id="motorbike-rental" type="checkbox" {...register('motorbikeRental')} />
                <label htmlFor="motorbike-rental" className="pl-2">
                  Motorbike for rent (8$/month)
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <input
                type="submit"
                className="py-3 px-8 rounded-lg bg-white drop-shadow hover:bg-gray-200 cursor-pointer"
              />
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
                    setDateRanges([item.selection])
                    field.onChange(item)
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRanges}
                />
              )}
            />
          </div>
          <div>BILL</div>
        </form>
      </div>
    </>
  )
}

Reservation.propTypes = {}

export default Reservation
