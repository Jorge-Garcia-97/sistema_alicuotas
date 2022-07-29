import React, { useEffect, useState } from 'react';
import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { RegistroAdministrador } from './RegistroAdministrador';
import Swal from 'sweetalert2';
import { CardsAdministradores } from './CardsAdministradores';
import { InformacionAdministrador } from './InformacionAdministrador';

export const MainAdministradores = () => {
  const [administradores, setAdministradores] = useState({
    propietarios: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [administrador, setAdministrador] = useState({});
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setCargando(true);
    
    async function cargarData() {
      try {
        const response = ""; //await get(`administradores/ACTIVO`);
        setAdministradores({
          administradores: response.data,
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
              <i className="fa fa-users me-1" />
              Administradores
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
            {administradores.administradores ? (
              <>
                <CardsAdministradores
                  {...administradores}
                  setAdministrador={setAdministrador}
                  showInfo={showInfo}
                  setShowInfo={setShowInfo}
                />
              </>
            ) : (
              <>
                <h1>No hay datos a mostrar</h1>
              </>
            )}

            <RegistroAdministrador
              stateChanger={setRefresh}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <InformacionAdministrador
              administrador={administrador}
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