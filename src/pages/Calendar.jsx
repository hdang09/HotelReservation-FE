import React, { useState, useEffect } from 'react';
// import EventCalendar from 'react-awesome-calendar';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { RoomPopup } from '../components';
import { getSpecificRoom } from '../utils/productAPI';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState({});
  const roomNumber = new URLSearchParams(window.location.search).get('room');

  useEffect(() => {
    (async () => {
      const res = await getSpecificRoom(roomNumber);

      const events = res.data.rooms.map((item) => {
        const checkOut = new Date(item.checkOut);
        checkOut.setDate(checkOut.getDate() + 1);

        return {
          id: item._id,
          backgroundColor:
            item.status === 'Reserved'
              ? '#cf8080'
              : item.status === 'Checked-in'
              ? '#50aca3'
              : '#213547',
          start: item.checkIn,
          end: checkOut,
          title: item.status,
          allDay: true,
          details: { ...item },
        };
      });
      setEvents(events);
    })();
  }, [popup]);

  const handleShowEvent = (ev) => {
    setPopup(ev.event.extendedProps.details);
    // setPopup(events.filter((ev) => ev.id === id).extendedProps.details);
  };

  const handleClose = () => setPopup({});

  return (
    <>
      <div className="max-w-[50rem] mx-auto">
        {/* <EventCalendar events={events} /> */}
        <FullCalendar
          defaultView="dayGridMonth"
          firstDay={1}
          locale="en"
          header={{
            left: ' title',
            right: 'prev,next',
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin]}
          events={events}
          eventClick={handleShowEvent}
        />
      </div>
      {Object.keys(popup).length !== 0 && <RoomPopup room={popup} handleClose={handleClose} />}
    </>
  );
};

export default Calendar;
