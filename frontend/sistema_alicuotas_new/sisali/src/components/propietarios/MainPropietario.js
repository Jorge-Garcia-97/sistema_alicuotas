import React, { useEffect, useState } from 'react';
import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { RegistroPropietario } from './RegistroPropietario';
import { CardsPropietarios } from './CardsPropietarios';
import { InformacionPropietario } from './InformacionPropietario';
import { createStandaloneToast } from '@chakra-ui/toast'

export const MainPropietario = () => {
  const [propietarios, setPropietarios] = useState({
    propietarios: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [propietario, setPropietario] = useState({});
  const { ToastContainer, toast } = createStandaloneToast();
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setCargando(true);
    
    async function cargarData() {
      try {
        const response = await get(`propietarios/ACTIVO`);
        setPropietarios({
          propietarios: response.data,
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
        })
      }
    }
    
    cargarData();
    return () => {
      setPropietarios([]);
    }
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
              <i className="fa fa-users me-1" />
              Propietarios
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
          <div className="row">
            {propietarios.propietarios ? (
              <>
                <CardsPropietarios
                  {...propietarios}
                  setPropietario={setPropietario}
                  showInfo={showInfo}
                  setShowInfo={setShowInfo}
                />
              </>
            ) : (
              <>
                <h1>No hay datos a mostrar</h1>
              </>
            )}

            <RegistroPropietario
              stateChanger={setRefresh}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <InformacionPropietario
              // {...propietario}
              propietario={propietario}
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              stateChanger={setRefresh}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </>    
  );
};
