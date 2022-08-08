import React, { useEffect, useState } from 'react';
import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { RegistroPropietario } from './RegistroPropietario';
import { CardsPropietarios } from './CardsPropietarios';
import { InformacionPropietario } from './InformacionPropietario';
import { createStandaloneToast } from '@chakra-ui/toast';
import { useSelector } from 'react-redux';

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
  const { isAdmin, id, rol } = useSelector(state => state.auth);
  useEffect(() => {
    setCargando(true);

    async function cargarData() {
      try {
        const response = await get(`propietarios/ACTIVO`);
        if (isAdmin) {
          setPropietarios({
            propietarios: response.data,
          });
        } else {
          if (rol == 'Presidente' || rol == 'Vicepresidente') {
            setPropietarios({
              propietarios: response.data,
            });
          } else {
            let temporal_propietarios = [];
            response.data.map(item => {
              if (item.id_propietario == id) {
                temporal_propietarios.push(item);
              }
            });
            setPropietarios({
              propietarios: temporal_propietarios,
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
    return () => {
      setPropietarios([]);
    };
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
            <h1 className="fw-bold" style={{ fontSize: '25px' }}>
              <i className="fa fa-users me-1" />
              Propietarios
            </h1>
            {isAdmin ? (
              <Button
                colorScheme="telegram"
                className="px-3"
                variant="solid"
                onClick={openModal}
                size={'sm'}
              >
                Agregar
                <i className="fa fa-plus-circle ms-1" />
              </Button>
            ) : (
              <>
                {rol == 'Presidente' && (
                  <Button
                    colorScheme="telegram"
                    className="px-3"
                    variant="solid"
                    onClick={openModal}
                    size={'sm'}
                  >
                    Agregar
                    <i className="fa fa-plus-circle ms-1" />
                  </Button>
                )}
              </>
            )}
          </div>
          <div className="row">
            {propietarios.propietarios.length > 0 ? (
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
