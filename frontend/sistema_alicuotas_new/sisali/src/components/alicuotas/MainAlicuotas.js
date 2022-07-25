import React, { useEffect, useState } from 'react';
import { Spinner, Button } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { get } from '../../services/Get';
import { InformacionAlicuotas } from './InformacionAlicuotas';
import { RegistrarAlicuota } from './RegistrarAlicuota';
import { ValidarPago } from './ValidarPago';
import { InformacionPago } from './InformacionPago';

export const MainAlicuotas = () => {
  const [state, setState] = useState({
    alicuotas: [],
    propiedades: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenValidarPago, setIsOpenValidarPago] = useState(false);
  const [isOpenInformacionPago, setIsOpenInformacionPago] = useState(false);
  const [data, setData] = useState();
  const [data_multas, setData_Multas] = useState();
  const [data_cuotas, setData_Cuotas] = useState();

  useEffect(() => {
    setCargando(true);

    async function cargarData() {
      try {
        const response = await get(`pagoalicuota/`);
        const resp_propiedades = await get(`propiedades/ACTIVO`);
        setState({
          alicuotas: response,
          propiedades: resp_propiedades,
        });
        setCargando(false);
        setRefresh(false);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
        });
      }
    }

    cargarData();
  }, [refresh]);

  const openModal = () => {
    setIsOpen(true);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      container: 'container-popup',
      popup: 'popup',
    },
  });

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
        <div className="container-fluid p-1">
          <div className="pb-1 ps-1 mb-2 border-bottom d-flex justify-content-between">
            <h1 className="display-6 fw-bold">
              <i className="fa fa-credit-card me-1" />
              Pago de alicuotas
            </h1>
            <Button
              colorScheme="teal"
              className="px-3"
              variant="solid"
              onClick={openModal}
            >
              Agregar
              <i className="fa fa-plus-circle ms-1" />
            </Button>
          </div>
          <div className="container-fluid border shadow-sm">
            <InformacionAlicuotas
              {...state}
              setData={setData}
              setData_Cuotas={setData_Cuotas}
              setData_Multas={setData_Multas}
              setIsOpenValidarPago={setIsOpenValidarPago}
              setIsOpenInformacionPago={setIsOpenInformacionPago}
            />

            <RegistrarAlicuota
              {...state}
              stateChanger={setRefresh}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <ValidarPago
              data={data}
              stateChanger={setRefresh}
              isOpenValidarPago={isOpenValidarPago}
              setIsOpenValidarPago={setIsOpenValidarPago}
            />

            <InformacionPago
              data={data}
              data_cuotas={data_cuotas}
              data_multas={data_multas}
              isOpen={isOpenInformacionPago}
              setIsOpen={setIsOpenInformacionPago}
            />
          </div>
        </div>
      )}
    </>
  );
};
