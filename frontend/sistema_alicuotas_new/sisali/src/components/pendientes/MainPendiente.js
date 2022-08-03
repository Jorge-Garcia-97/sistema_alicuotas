import { Button, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { get } from '../../services/Get';
import { InformacionValoresPendientes } from './InformacionValoresPendientes';

export const MainPendiente = () => {
  const [state, setState] = useState({
    valores_pendientes: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();
  const openModalRegsitro = () => {
    setIsOpenModal(true);
  };

  useEffect(() => {
    setCargando(true);

    async function cargarData() {
      try {
        const response = await get(`valores_pendientes/estado/PENDIENTE`);
        setState({
          valores_pendientes: response,
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
            <h1 className="display-6 fw-bold">
              <i className="fa fa-credit-card me-1" />
              Valores Pendientes
            </h1>
            <Button
              colorScheme="teal"
              className="px-3"
              variant="solid"
              onClick={openModalRegsitro}
            >
              Agregar
              <i className="fa fa-plus-circle ms-1" />
            </Button>
          </div>
          <div className="container-fluid border shadow-sm">
            <InformacionValoresPendientes
              {...state}
              stateChanger={setRefresh}
              isOpenModal={isOpenModal}
            />
            {/* 
            <RegistroSolicitud
              {...state}
              stateChanger={setRefresh}
              isOpen={isOpenModal}
              setIsOpen={setIsOpenModal}
            /> */}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
