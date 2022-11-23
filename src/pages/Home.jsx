import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getReport } from '../utils/productAPI';

const Home = () => {
  const [report, setReport] = useState({});
  useEffect(() => {
    const fn = async () => {
      const res = await getReport();
      setReport(res.data.report);
    };
    fn();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {Object.keys(report).length !== 0 && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-6">
          <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#5C9ADE]">
            <div>
              <p className="text-gray-400">All Booked Rooms</p>
              <h2 className="text-3xl text-black mb-4 font-semibold">{report.total.total}</h2>
              <p className="text-sm">
                {report.total.current} new booked rooms <span className="text-gray-400">today</span>
              </p>
            </div>
            <div>Icon</div>
          </div>
          <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#cf8080]">
            <div>
              <p className="text-gray-400">Reserved Rooms</p>
              <h2 className="text-3xl text-black mb-4 font-semibold">{report.reserved.total}</h2>
              <p className="text-sm">
                {report.reserved.current} cancelled rooms{' '}
                <span className="text-gray-400">today</span>
              </p>
            </div>
            <div>Icon</div>
          </div>
          <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4 text-[#50aca3]">
            <div>
              <p className="text-gray-400">Check In</p>
              <h2 className="text-3xl text-black mb-4 font-semibold">{report.checkIn.total}</h2>
              <p className="text-sm">
                {report.checkIn.current} check-in <span className="text-gray-400">today</span>
              </p>
            </div>
            <div>Icon</div>
          </div>
          <div className="flex justify-between w-full min-h-[6rem] rounded-lg drop-shadow-lg bg-white p-4">
            <div>
              <p className="text-gray-400">Check Out</p>
              <h2 className="text-3xl text-black mb-4 font-semibold">{report.checkOut.total}</h2>
              <p className="text-sm">
                {report.checkOut.current} check-out <span className="text-gray-400">today</span>
              </p>
            </div>
            <div>Icon</div>
          </div>
        </div>
      )}
      <div></div>
    </>
  );
};

Home.propTypes = {};

export default Home;
