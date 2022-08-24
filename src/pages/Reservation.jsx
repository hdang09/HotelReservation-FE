import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../components'
import { useForm, Controller } from 'react-hook-form'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

const Reservation = (props) => {
  const [dateRanges, setDateRanges] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  const { control, register, handleSubmit } = useForm()

  const onSubmit = (e) => {
    console.log(e)
  }

  console.log(dateRanges)
  return (
    <>
      <div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              selectRooms
              label="Room Number"
              {...register('roomNumber', { required: true })}
            />
            <Input
              placeholder="Example: Tran Hai Dang"
              label="Fullname"
              {...register('fullname', { required: true })}
            />
            <Input
              label="Identity Card (ID)"
              placeholder="Example: 074212345678"
              type="number"
              {...register('id', { required: true, minLength: 9, maxLength: 12 })}
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
              <div>
                <input id="email" label="Email" type="checkbox" {...register('parking')} />
                <label htmlFor="email">Parking (5$/month)</label>
              </div>
              <div>
                <input id="email" label="Email" type="checkbox" {...register('motorbike-rental')} />
                <label htmlFor="email">Motorbike for rent (8$/month)</label>
              </div>
            </div>
            <input
              type="submit"
              className="py-3 px-6 rounded-lg bg-white drop-shadow hover:bg-gray-200 cursor-pointer"
            />
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
