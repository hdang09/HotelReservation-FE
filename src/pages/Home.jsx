import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiFillAppstore } from 'react-icons/ai';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { MdHotelClass } from 'react-icons/md';
import { getReport, getTodayAvailability } from '../utils/productAPI';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Home = () => {
  const [report, setReport] = useState({});
  const [reportToday, setReportToday] = useState([]);
  console.log(reportToday);
  useEffect(() => {
    const fn = async () => {
      try {
        const res = await getReport();
        setReport(res.data.report);
      } catch (err) {
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

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* {Object.keys(report).length !== 0 && ( */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-6">
        <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#5C9ADE]">
          <div>
            <p className="text-gray-400">All Booked Rooms</p>
            <h2 className="text-3xl text-black mb-4 font-semibold">
              {valid(report?.total?.total)}
            </h2>
            <p className="text-sm">
              {valid(report?.total?.current, true)} new booked rooms{' '}
              <span className="text-gray-400">today</span>
            </p>
          </div>
          <div className="flex justify-center items-center w-12 h-12 text-lg rounded-full bg-sky-100">
            <AiFillAppstore size={20} />
          </div>
        </div>

        <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#cf8080]">
          <div>
            <p className="text-gray-400">Reserved Rooms</p>
            <h2 className="text-3xl text-black mb-4 font-semibold">
              {valid(report?.reserved?.total)}
            </h2>
            <p className="text-sm">
              {valid(report?.reserved?.current, true)} reserved rooms{' '}
              <span className="text-gray-400">today</span>
            </p>
          </div>
          <div className="flex justify-center items-center w-12 h-12 text-lg rounded-full bg-rose-100">
            <MdHotelClass size={20} />
          </div>
        </div>

        <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#50aca3]">
          <div>
            <p className="text-gray-400">Check In</p>
            <h2 className="text-3xl text-black mb-4 font-semibold">
              {valid(report?.checkIn?.total)}
            </h2>
            <p className="text-sm">
              {valid(report?.checkIn?.current, true)} check-in{' '}
              <span className="text-gray-400">today</span>
            </p>
          </div>
          <div
            className="flex justify-center items-center w-12 h-12 text-lg rounded-full bg-green-100
            "
          >
            <FiLogIn size={20} />
          </div>
        </div>

        <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4">
          <div>
            <p className="text-gray-400">Check Out</p>
            <h2 className="text-3xl text-black mb-4 font-semibold">
              {valid(report?.checkOut?.total)}
            </h2>
            <p className="text-sm">
              {valid(report?.checkOut?.current, true)} check-out{' '}
              <span className="text-gray-400">today</span>
            </p>
          </div>
          <div className="flex justify-center items-center w-12 h-12 text-lg rounded-full bg-stone-100">
            <FiLogOut size={20} />
          </div>
        </div>
      </div>
      {/* )} */}

      <h1 className="text-2xl font-bold mt-10 mb-6">Today Availability</h1>

      <div className="w-full bg-white p-6 rounded-lg drop-shadow-lg">
        <table className="w-full">
          <tr>
            <th className="py-4 ">Room</th>
            <th className="py-4">Floor 1</th>
            <th className="py-4">Floor 2</th>
            <th className="py-4">Floor 3</th>
            <th className="py-4">Floor 4</th>
            <th className="py-4">Floor 5</th>
            <th className="py-4">Floor 6</th>
            <th className="py-4">Floor 7</th>
            <th className="py-4">Floor 8</th>
          </tr>
          {reportToday.map((item, index) => {
            return (
              <tr key={item.name} className={`${index % 2 === 1 && 'bg-gray-100'} rounded-lg`}>
                <td>{item.name}</td>
                {item.rooms.map((room, idx) => (
                  <td key={idx}>{room}</td>
                ))}
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
