import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
//import { RegistroPropietario } from './RegistroPropietario';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { CardPropiedades } from './CardPropiedades';
import { RegistroPropiedades } from './RegistroPropiedades';
import { InformacionPropiedad } from './InformacionPropiedad';
//import { InformacionPropietario } from './InformacionPropietario';

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
  // const [propietario, setPropietario] = useState({
  //   propietario: [],
  // });
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setCargando(true);
    cargarData();
  }, [refresh]);

  async function cargarData() {
    try {
      const response = await get(`propiedades/ACTIVO`);
      setPropiedades({
        propiedades: response
      });
      const responsePropietarios = await get(`propietarios/Activo`);
      setPropietarios({
        propietarios: responsePropietarios.data
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
              <i className="fa fa-home me-1" />
              Propiedades
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
            { propiedades.propiedades ? (
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
                <h1>ESTOY EN MAIN PROPIEDADES No hay datos a mostrar</h1>
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
              propietarios={propietarios}
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              stateChanger={setRefresh}
            />
          </div>
        </div>
      )}
    </>
  );
};
