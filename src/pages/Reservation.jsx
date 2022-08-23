import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '../components'

const Reservation = (props) => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <Input label="Check-in & Check-out" type="datetime-local" />
          <Input placeholder="Example: Tran Hai Dang" label="Fullname" />
          <Input label="Identity Card (ID)" placeholder="Example: 074212345678" type="number" />
          <Input placeholder="Example: dangtranhai628@gmail.com" label="Email" type="email" />
          <div>
            <h2>Services: </h2>
            <div>
              <input id="email" label="Email" type="checkbox" />
              <label htmlFor="email">Parking (5$/month)</label>
            </div>
            <div>
              <input id="email" label="Email" type="checkbox" />
              <label htmlFor="email">Motorbike for rent (8$/month)</label>
            </div>
          </div>
        </div>
        <div>
          <Input label="Check-in & Check-out" type="datetime-local" />
          <Input placeholder="Example: Tran Hai Dang" label="Fullname" />
          <Input label="Identity Card (ID)" placeholder="Example: 074212345678" type="number" />
          <Input placeholder="Example: dangtranhai628@gmail.com" label="Email" type="email" />
          <div>
            <h2>Services: </h2>
            <div>
              <input id="email" label="Email" type="checkbox" />
              <label htmlFor="email">Parking (5$/month)</label>
            </div>
            <div>
              <input id="email" label="Email" type="checkbox" />
              <label htmlFor="email">Motorbike for rent (8$/month)</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Reservation.propTypes = {}

export default Reservation
