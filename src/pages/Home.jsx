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
                {report.reserved.current} reserved rooms{' '}
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

      <h1 className="text-2xl font-bold mt-10 mb-6">Today Availability</h1>

      <div className="w-full bg-white p-6 rounded-lg drop-shadow-lg">
        <table id="student-info" className="w-full">
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
          <tr className="bg-gray-100 rounded-lg">
            <td>Single Room</td>
            <td>6</td>
            <td>6</td>
            <td>6</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Double Room</td>
            <td>6</td>
            <td>6</td>
            <td>6</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr className="bg-gray-100 rounded-lg">
            <td>Studio Room</td>
            <td>6</td>
            <td>6</td>
            <td>6</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Deluxe Room</td>
            <td>6</td>
            <td>6</td>
            <td>6</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
            <td>5</td>
          </tr>
        </table>
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
