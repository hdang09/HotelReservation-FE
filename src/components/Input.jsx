import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomsAsync } from '../app/roomsSlice';
// import * as actions from '../app/actions'
import config from '../config';

const Input = forwardRef(
  (
    {
      label = 'Input',
      type = 'text',
      placeholder = 'Type here to search',
      children,
      noLabel = false,
      className: propClassName,
      selectRooms = false,
      ...props
    },
    ref
  ) => {
    const rooms = useSelector((state) => state.rooms);

    const renderRoomsOption = () => {
      let element = [];
      element.push(
        <option key="placeholder" value="DEFAULT" disabled hidden>
          Select your room
        </option>
      );
      for (let i = 1; i <= config.NUMS_OF_FLOOR; i++) {
        element.push(
          <option key={i} disabled value="" className="font-bold py-3">
            Floor {i}
          </option>
        );
        for (let j = 1; j <= config.NUMS_ROOMS_EACH_FLOOR; j++) {
          let roomNumber = i * 100 + j;
          element.push(
            <option key={roomNumber} value={roomNumber} className="text-center">
              {roomNumber}
            </option>
          );
        }
      }
      return element;
    };

    return (
      <div className="p-2 text-black dark:text-white">
        {!noLabel && (
          <label className="block pb-2 text-black dark:text-white" htmlFor={label}>
            {label}
          </label>
        )}
        {selectRooms ? (
          <select
            id={label}
            className={`w-full max-w-[20rem] drop-shadow-md py-[0.6rem] px-4 rounded-lg focus:outline-primary bg-white dark:bg-slate-800 ${propClassName}`}
            ref={ref}
            {...props}
            defaultValue={'DEFAULT'}
          >
            {renderRoomsOption()}
          </select>
        ) : (
          <input
            id={label}
            className={`w-full max-w-[20rem] drop-shadow-md py-[0.6rem] px-4 rounded-lg focus:outline-primary bg-white dark:bg-slate-800 ${propClassName}`}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
        )}
        {/* <p className="text-red">Error Message: Hehe</p> */}
      </div>
    );
  }
);

Input.propTypes = {};

export default Input;
