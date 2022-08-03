import React, { useEffect, useState } from 'react';
import { Spinner, Button } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { get } from '../../services/Get';
import { InformacionAlicuotas } from './InformacionAlicuotas';
import { RegistrarAlicuota } from './RegistrarAlicuota';
import { ValidarPago } from './ValidarPago';
import { InformacionPago } from './InformacionPago';
import { EditarAlicuota } from './EditarAlicuota';

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
  const [isOpenEditarPago, setIsOpenEditarPago] = useState(false);
  const [data, setData] = useState();
  const [dataImagen, setDataImagen] = useState();
  const [data_multas, setData_Multas] = useState();
  const [data_cuotas, setData_Cuotas] = useState();
  const [data_valores, setData_Valores] = useState();
  const { ToastContainer, toast } = createStandaloneToast();

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
        toast({
          title: 'Error',
          description: 'Se encontró un error al cargar la información.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: "top-right"
        });
      }
    }

    cargarData();
  }, [refresh]);

  const openModal = () => {
    setIsOpen(true);
  };

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
              setDataImagen={setDataImagen}
              setData_Cuotas={setData_Cuotas}
              setData_Multas={setData_Multas}
              setData_Valores={setData_Valores}
              setIsOpenValidarPago={setIsOpenValidarPago}
              setIsOpenInformacionPago={setIsOpenInformacionPago}
              setIsOpenEditarPago={setIsOpenEditarPago}
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

            <EditarAlicuota
              data={data}
              stateChanger={setRefresh}
              isOpen={isOpenEditarPago}
              setIsOpen={setIsOpenEditarPago}
            />

            <InformacionPago
              data={data}
              dataImagen={dataImagen}
              data_cuotas={data_cuotas}
              data_multas={data_multas}
              data_valores={data_valores}
              isOpen={isOpenInformacionPago}
              setIsOpen={setIsOpenInformacionPago}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
