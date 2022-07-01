
import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import React  , { useEffect, useState } from 'react';


export const MainAdministradores = () => {
  const [administradores, setAdministradores] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
              <i className="fa fa-address-card-o me-1" />
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
            {administradores.length > 0 ? (
              <>
                {administradores.map((item, i) => (
                  <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                    <div className="card w-100">
                    
                      <div className="card-body text-center border-top">
                        <h1 className="card-title fw-bold">
                          {item.nombre_administrador +
                            ' ' +
                            item.apellido_propietario}
                        </h1>
                        <p className="card-text">
                          <i className="fa fa-briefcase me-1" />
                          {item.rol_propietario}
                        </p>
                        <p className="card-text">
                          <i className="fa fa-address-card me-1" />
                          {item.cedula_administrador}
                        </p>
                        <p className="card-text">
                          <i className="fa fa-mobile me-1" />
                          {item.celular_administrador}
                        </p>
                        <p className="card-text">
                          <i className="fa fa-envelope me-1" />
                          {item.correo_administrador}
                        </p>
                        <Button
                          colorScheme="blue"
                          className="mt-2"
                          //onClick={openEditModal}
                        >
                          Editar Datos <i className="fa fa-info-circle ms-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1>No hay datos a mostrar</h1>
              </>
            )}
           

            
          </div>
        </div>
      )}
    </>
  );
};
