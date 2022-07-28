import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { BsCalendarFill } from 'react-icons/bs';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

export const MainReservaciones = () => {
  const events = [
    {
      id: 0,
      name: 'Holiday',
      description: 'this is description',
      allDay: true,
      start: new Date(),
      end: new Date(),
    },
  ];
  const event = ({ event }) => {
    return (
      <div>
        {event.name} <br /> <small>{event.description}</small>{' '}
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid p-1">
        <div className="pb-1 ps-1 mb-2 border-bottom d-flex justify-content-between">
          <h1 className="display-6 fw-bold">
            <Icon
              as={BsCalendarFill}
              color="black"
              boxSize={6}
              className="me-2 mb-2"
            />
            Reservas
          </h1>
          <Button colorScheme="teal" className="px-3" variant="solid">
            Crear Rerservación
            <i className="fa fa-plus-circle ms-1" />
          </Button>
        </div>
        <div className="container-fluid border py-4 shadow-sm">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            components={{
              event: event,
            }}
          />
        </div>
      </div>
    </>
  );
};
