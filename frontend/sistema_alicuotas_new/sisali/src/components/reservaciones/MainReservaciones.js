import { Button, Icon, Spinner } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BsCalendarFill } from 'react-icons/bs';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment-timezone';
import { CrearReservacion } from './CrearReservacion';
import { createStandaloneToast } from '@chakra-ui/toast';
import { get } from '../../services/Get';
import { VerReserva } from './VerReserva';

// moment.tz.setDefault('America/Guayaquil');
const localizer = momentLocalizer(moment);

function getDate(str, momentObj) {
  var date = moment(str);
  var date_to_send = momentObj(date, 'YYYY-MM-DD hh:mm:ss').toDate();
  return date_to_send;
}

export const MainReservaciones = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [startDate, setStartDate] = useState({
    fecha_inicio: '',
    fecha_fin: ''
  });
  const { ToastContainer, toast } = createStandaloneToast();
  const [state, setState] = useState({
    reservaciones: [],
    events: [],
    areas: [],
    propiedades: [],
  });
  const [reserva, setReserva] = useState({});

  useEffect(() => {
    setCargando(true);
    cargarData();
  }, [refresh]);

  async function cargarData() {
    try {
      const response_reservacion = await get(`reservacion/estado/ACTIVO`);
      const response_areas = await get(`areacomunal/ACTIVO`);
      const response_propiedades = await get(`propiedades/ACTIVO`);
      var reservaciones_tmp = [];
      if (response_areas && response_propiedades && response_reservacion) {
        response_reservacion.forEach(reservacion => {
          let data = {
            id: reservacion.id_reservacion,
            allDay: false,
            name:
              'Casa: ' +
              reservacion.numero_casa +
              ' - ' +
              reservacion.nombre_area,
            description: reservacion.motivo_reservacion,
            // start: moment(reservacion.fecha_inicio).format(),
            // end: moment(reservacion.fecha_fin).format(),
            start: getDate(reservacion.fecha_inicio, moment),
            end: getDate(reservacion.fecha_fin, moment),
          };
          reservaciones_tmp.push(data);
        });
        setState({
          reservaciones: response_reservacion,
          events: reservaciones_tmp,
          areas: response_areas.data,
          propiedades: response_propiedades,
        });
        setRefresh(false);
        setCargando(false);
      } else {
        toast({
          title: 'Cuidado',
          description:
            'Error al cargar la información. Recuerde agregar propiedades y áres comunales para generar una reservación.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error al cargar la información del área.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }

  const event = ({ event }) => {
    return (
      <div className="px-2">
        {event.name} <br /> <small>{event.description}</small>{' '}
      </div>
    );
  };

  const verReserva = event => {
    console.log('click', event);
    const reserva_to_send = state.reservaciones.find(
      reserva => reserva.id_reservacion == event.id
    );
    setReserva(reserva_to_send);
    setIsOpenModal(true);
  };

  const abrirModal = () => {
    setIsOpen(true);
  };

  const lang = {
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Atrás',
    next: 'Después',
    today: 'Hoy',
    agenda: 'Agenda',
    showMore: total => `+${total} más`,
  };

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(),
    }),
    []
  );

  const handleSelectSlot = useCallback(({ start, end }) => {
    // console.log(start, end);
    setStartDate({
      fecha_inicio: start,
      fecha_fin: end
    })
    setIsOpen(true);
  }, []);

  return (
    <>
      {cargando === true ? (
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-auto">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          </div>
        </div>
      ) : (
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
              <Button
                colorScheme="teal"
                className="px-3"
                variant="solid"
                onClick={abrirModal}
              >
                Crear Rerservación
                <i className="fa fa-plus-circle ms-1" />
              </Button>
            </div>
            <div className="container-fluid border py-4 shadow-sm">
              <Calendar
                culture="es"
                localizer={localizer}
                events={state.events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '72vh' }}
                components={{
                  event: event,
                }}
                messages={lang}
                onSelectEvent={event => verReserva(event)}
                selectable
                scrollToTime={scrollToTime}
                onSelectSlot={handleSelectSlot}
                defaultView={Views.WEEK}
              />
            </div>
          </div>
          <CrearReservacion
            stateChanger={setRefresh}
            propiedades={state.propiedades}
            areas={state.areas}
            startDate={startDate.fecha_inicio}
            endDate={startDate.fecha_fin}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <VerReserva
            stateChanger={setRefresh}
            reserva={reserva}
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
          />
        </>
      )}
      <ToastContainer />
    </>
  );
};
