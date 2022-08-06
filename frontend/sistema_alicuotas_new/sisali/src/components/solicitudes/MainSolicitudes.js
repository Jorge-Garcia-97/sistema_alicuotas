import { Button, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { InformacionSolicitudes } from './InformacionSolicitudes';
import { createStandaloneToast } from '@chakra-ui/toast';
import { get } from '../../services/Get';
import { RegistroSolicitud } from './RegistroSolicitud';
import { useSelector } from 'react-redux';

export const MainSolicitudes = () => {
  const [state, setState] = useState({
    solicitudes: [],
    propiedades: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();
  const { isAdmin, id, rol } = useSelector(state => state.auth);

  const openModalRegsitro = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    setCargando(true);

    async function cargarData() {
      try {
        const response = await get(`solicitudes/estado/PENDIENTE`);
        const resp_propiedades = await get(`propiedades/ACTIVO`);
        setState({
          solicitudes: response,
          propiedades: resp_propiedades,
        });
        if (isAdmin) {
          setState({
            solicitudes: response,
            propiedades: resp_propiedades,
          });
        } else {
          if (rol == 'Presidente' || rol == 'Vicepresidente') {
            setState({
              solicitudes: response,
              propiedades: resp_propiedades,
            });
          } else {
            let temporal = [];
            let auxiliar = [];
            resp_propiedades.map(item => {
              if (item.id_propietario == id) {
                auxiliar.push(item);
              }
            });
            response.map(item => {
              if (item.propietario_id_propietario == id) {
                temporal.push(item);
              }
            });
            setState({
              solicitudes: temporal,
              propiedades: auxiliar,
            });
          }
        }
        setCargando(false);
        setRefresh(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Se encontró un error al cargar la información.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }

    cargarData();
  }, [refresh]);

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
            <h1 className="fw-bold" style={{ fontSize: '25px' }}>
              <i className="fa fa-credit-card me-1" />
              Solicitudes
            </h1>
            <Button
              colorScheme="telegram"
              className="px-3"
              variant="solid"
              onClick={openModalRegsitro}
              size={'sm'}
            >
              Agregar
              <i className="fa fa-plus-circle ms-1" />
            </Button>
          </div>
          <div className="container-fluid border shadow-sm">
            <InformacionSolicitudes
              {...state}
              stateChanger={setRefresh}
              isOpenModal={isOpenModal}
            />

            <RegistroSolicitud
              {...state}
              stateChanger={setRefresh}
              isOpen={isOpenModal}
              setIsOpen={setIsOpenModal}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
