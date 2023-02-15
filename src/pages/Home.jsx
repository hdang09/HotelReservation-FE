import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { MdHotelClass } from 'react-icons/md';
import { getReport, getTodayAvailability } from '../utils/productAPI';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';

const Home = () => {
  const [report, setReport] = useState({});
  const [reportToday, setReportToday] = useState([]);

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await getReport();
        setReport(res.data.report);
      } catch (err) {
        toast.error(err.message);
        console.error(err);
      }
    };
    fn();

    const fn2 = async () => {
      try {
        const res = await getTodayAvailability();
        setReportToday(res.data.report);
      } catch (err) {
        console.error(err);
      }
    };
    fn2();
  }, []);

  const valid = (number, isCurrent = false) => {
    if (typeof number !== 'number') {
      if (isCurrent) {
        return <Skeleton width="10px" inline />;
      } else {
        return <Skeleton width="20px" />;
      }
    }

    return number;
  };

  const ROOMS = [
    {
      type: 'Booked',
      total: valid(report?.total?.total),
      current: valid(report?.total?.current, true),
      color: 'text-sky-400',
      bgColor: 'bg-sky-100',
      icon: <AiFillAppstore size={20} />,
    },
    {
      type: 'Reserved',
      total: valid(report?.reserved?.total),
      current: valid(report?.reserved?.current, true),
      color: 'text-rose-400',
      bgColor: 'bg-rose-100',
      icon: <MdHotelClass size={20} />,
    },
    {
      type: 'Checked-in',
      total: valid(report?.checkIn?.total),
      current: valid(report?.checkIn?.current, true),
      color: 'text-green-400',
      bgColor: 'bg-green-100',
      icon: <FiLogOut size={20} />,
    },
    {
      type: 'Checked-out',
      total: valid(report?.checkOut?.total),
      current: valid(report?.checkOut?.current, true),
      color: 'text-stone-400',
      bgColor: 'bg-stone-100',
      icon: <FiLogOut size={20} />,
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Dashboard</h1>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-6">
        {ROOMS.map((room, idx) => (
          <div
            key={room.type}
            className={`flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white dark:bg-slate-800 p-4 ${room.color}`}
          >
            <div>
              <p className="text-gray-400">
                {idx === 0 && 'All '}
                {room.type} Rooms
              </p>
              <h2 className="text-3xl text-black dark:text-white mb-4 font-semibold">
                {room.total}
              </h2>
              <p className="text-sm">
                {room.current} {room.type.toLowerCase()} {idx === 0 && 'rooms'}{' '}
                <span className="text-gray-400">today</span>
              </p>
            </div>
            <div
              className={`flex justify-center items-center w-12 h-12 text-lg rounded-full ${room.bgColor}`}
            >
              {room.icon}
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-10 mb-6 text-black dark:text-white">
        Today Availability
      </h1>

      <div className="w-auto sm:w-full overflow-x-auto bg-white p-6 rounded-lg drop-shadow-lg dark:bg-slate-800">
        <table className="text-black dark:text-white w-max lg:w-full">
          <thead>
            <tr>
              <th className="p-4 ">Room</th>
              <th className="p-4">Floor 1</th>
              <th className="p-4">Floor 2</th>
              <th className="p-4">Floor 3</th>
              <th className="p-4">Floor 4</th>
              <th className="p-4">Floor 5</th>
              <th className="p-4">Floor 6</th>
              <th className="p-4">Floor 7</th>
              <th className="p-4">Floor 8</th>
            </tr>
          </thead>
          <tbody>
            {reportToday.length
              ? reportToday.map((item, index) => {
                  return (
                    <tr
                      key={item.name}
                      className={`${index % 2 === 1 && 'bg-gray-100 dark:bg-slate-700'} rounded-lg`}
                    >
                      <td className="py-5 px-4 text-center">{item.name}</td>
                      {item.rooms.map((room, idx) => (
                        <td className="py-5 px-4 text-center" key={idx}>
                          {room}
                        </td>
                      ))}
                    </tr>
                  );
                })
              : Array(4)
                  .fill()
                  .map((_, index) => {
                    return (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 1 && 'bg-gray-100 dark:bg-slate-700'
                        } rounded-lg`}
                      >
                        {Array(9)
                          .fill()
                          .map((_, idx) => (
                            <td className="py-5 px-4 text-center" key={idx}>
                              <Skeleton width="50px" />
                            </td>
                          ))}
                      </tr>
                    );
                  })}
          </tbody>
        </table>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
