import PropTypes from 'prop-types';
import config from '../config';
import { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label = '',
      type = 'text',
      placeholder = 'Type here to search',
      children,
      className: propClassName,
      selectRooms = false,
      icon,
      name,
      ...props
    },
    ref
  ) => {
    const inputClassName =
      'w-full sm:w-[20rem] drop-shadow-md py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-5 rtl:pr-11 rtl:pl-5 dark:bg-slate-800 dark:text-gray-300 dark:border-gray-600 focus:border-fade dark:focus:border-fade focus:ring-fade focus:outline-none focus:ring focus:ring-opacity-40';

    const renderRoomsOption = () => {
      let element = [];
      element.push(
        <option key="placeholder" value="DEFAULT" disabled hidden>
          Select your room
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
      <div className="flex lg:block items-center flex-col p-2 text-black dark:text-white">
        {label && (
          <label htmlFor={name} className="block text-base text-gray-500 dark:text-gray-300">
            {label}
          </label>
        )}
        {selectRooms ? (
          <div className="w-auto">
            <select
              id={name}
              className={`${inputClassName} mt-2 ${propClassName}`}
              ref={ref}
              {...props}
              defaultValue={'DEFAULT'}
            >
              {renderRoomsOption()}
            </select>
          </div>
        ) : (
          <div className="relative flex lg:justify-start items-center mt-2">
            {icon ? (
              <span className="absolute z-10 mx-3 text-gray-400 dark:text-gray-500">{icon}</span>
            ) : (
              <></>
            )}

            <input
              id={name}
              type={type}
              placeholder={placeholder}
              ref={ref}
              name={name}
              className={`pl-10 ${inputClassName}`}
              {...props}
            />
          </div>
        )}
        {/* <p className="text-red">Error Message: Hehe</p> */}
      </div>
    );
  }
);

Input.propTypes = {};

export default Input;
