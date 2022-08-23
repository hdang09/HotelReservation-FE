import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
  label = 'Input',
  type = 'text',
  placeholder = 'Type here to search',
  children,
  noLabel = false,
  className: propClassName,
}) => {
  return (
    <div className="p-2 ">
      {!noLabel && (
        <label className="block pb-2" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        id={label}
        className={`drop-shadow-md py-3 px-4 rounded-xl min-w-[20rem] focus:outline-[orange] ${propClassName}`}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

Input.propTypes = {}

export default Input
