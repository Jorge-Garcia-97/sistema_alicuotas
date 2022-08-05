import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CardPropiedades } from './CardPropiedades';
import { RegistroPropiedades } from './RegistroPropiedades';
import { InformacionPropiedad } from './InformacionPropiedad';
import { createStandaloneToast } from '@chakra-ui/toast';
import { useSelector } from 'react-redux';

export const MainPropiedades = () => {
  const [propiedades, setPropiedades] = useState({
    propiedades: [],
  });
  const [propietarios, setPropietarios] = useState({
    propietarios: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [propiedad, setPropiedad] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();
  const { isAdmin, id, rol } = useSelector(state => state.auth);
  useEffect(() => {
    setCargando(true);
    cargarData();
  }, [refresh]);

  async function cargarData() {
    try {
      const response = await get(`propiedades/ACTIVO`);
      setPropiedades({
        propiedades: response,
      });
      if (isAdmin) {
        setPropiedades({
          propiedades: response,
        });
      } else {
        if (rol == 'Presidente' || rol == 'Vicepresidente') {
          setPropiedades({
            propiedades: response,
          });
        } else {
          let temporal = [];
          response.map(item => {
            if (item.id_propietario == id) {
              temporal.push(item);
            }
          });
          setPropiedades({
            propiedades: temporal,
          });
        }
      }
      const responsePropietarios = await get(`propietarios/Activo`);
      setPropietarios({
        propietarios: responsePropietarios.data,
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
              <i className="fa fa-home me-1" />
              Propiedades
            </h1>
            <Button
              colorScheme="telegram"
              className="px-3"
              variant="solid"
              size={'sm'}
              onClick={openModal}
            >
              Agregar
              <i className="fa fa-plus-circle ms-1" />
            </Button>
          </div>
          <div className="row">
            {propiedades.propiedades ? (
              <>
                <CardPropiedades
                  {...propiedades}
                  setPropiedad={setPropiedad}
                  showInfo={showInfo}
                  setShowInfo={setShowInfo}
                />
              </>
            ) : (
              <>
                <h1>No hay datos a mostrar</h1>
              </>
            )}

            <RegistroPropiedades
              {...propietarios}
              stateChanger={setRefresh}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <InformacionPropiedad
              propiedad={propiedad}
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
