import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { CardsAreas } from './CardsAreas';
import { RegistroArea } from './RegistrarArea';
import { InformacionArea } from './InformacionArea';

export const MainAreas = () => {
  const [state, setState] = useState({
    areas: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [area, setArea] = useState({});
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setCargando(true);
    cargarData();
  }, [refresh]);

  async function cargarData() {
    try {
      const response = await get(`areacomunal/ACTIVO`);
      setState({
        areas: response.data,
      });
      setRefresh(false);
      setCargando(false);
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
              <i className="fa fa-users me-1" />
              Areas Comunales
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
            {state.areas ? (
              <>
                <CardsAreas
                  {...state}
                  setArea={setArea}
                  showInfo={showInfo}
                  setShowInfo={setShowInfo}
                />
              </>
            ) : (
              <>
                <h1>No hay datos a mostrar</h1>
              </>
            )}

            <RegistroArea
              stateChanger={setRefresh}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <InformacionArea
              area={area}
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
