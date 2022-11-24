import React, { useState, useEffect } from 'react';
import EventCalendar from 'react-awesome-calendar';
import { RoomPopup } from '../components';
import { getSpecificRoom } from '../utils/productAPI';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState({});
  const roomNumber = new URLSearchParams(window.location.search).get('room');

  useEffect(() => {
    (async () => {
      const res = await getSpecificRoom(roomNumber);
      const events = res.data.rooms.map((item) => ({
        id: item._id,
        color:
          item.status === 'Reserved'
            ? '#cf8080'
            : item.status === 'Checked-in'
            ? '#50aca3'
            : '#213547',
        from: item.checkIn,
        to: item.checkOut,
        title: item.status,
        details: { ...item },
      }));
      setEvents(events);
    })();
  }, [popup]);

  const handleShowEvent = (id) => {
    setPopup(events.filter((ev) => ev.id === id)[0].details);
  };

  const handleClose = () => setPopup({});
  return (
    <>
      <div className="px-[200px]">
        <h1>Hello</h1>
        {/* <EventCalendar events={events} onClickEvent={handleShowEvent} /> */}
      </div>
      {Object.keys(popup).length !== 0 && <RoomPopup room={popup} handleClose={handleClose} />}
    </>
  );
};

export default Calendar;
