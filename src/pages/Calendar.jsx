import React, { useState, useEffect } from 'react';
import EventCalendar from 'react-awesome-calendar';
// import Calendar2 from 'react-event-calendar';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import events3 from './events';

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

  const events2 = [
    {
      start: '2015-07-20',
      end: '2015-07-02',
      eventClasses: 'optionalEvent',
      title: 'test event',
      description: 'This is a test description of an event',
    },
    {
      start: '2015-07-19',
      end: '2015-07-25',
      title: 'test event',
      description: 'This is a test description of an event',
      data: 'you can add what ever random data you may want to use later',
    },
  ];
  return (
    <div>
      <div className="px-[200px]">
        {/* <EventCalendar /> */}
        {/* <Calendar2 month={7} year={2015} events={events2} /> */}
        <FullCalendar
          defaultView="dayGridMonth"
          firstDay={1}
          locale="es"
          header={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin]}
          events={events3}
        />
      </div>
      {/* {Object.keys(popup).length !== 0 && <RoomPopup room={popup} handleClose={handleClose} />} */}
    </div>
  );
};

export default Calendar;
