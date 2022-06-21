import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import user from '../../img/usuario.png';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { RegistroPropietario } from './RegistroPropietario';
import { EditarPropietario } from './EditarPropietario';

export const MainPropietario = () => {
  const [state, setState] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setCargando(true);
    async function cargarData() {
      try {
        const propietarios = await get(`propietarios`);
        setState(propietarios);
        setRefresh(false);
        setCargando(false);
        console.log(propietarios);
      } catch (error) {
        toast.error(error);
      }
    }
    cargarData();
    return () => {
      setState([]);
    };
  }, [refresh]);

  const openModal = () => {
    setIsOpen(true);
  };

  const openEditModal = () => {
    setEditOpen(true);
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
            {state.length > 0 ? (
              <>
                {state.map((item, i) => (
                  <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                    <div className="card w-100">
                      <img
                        src={user}
                        className="card-img-top d-block mx-auto my-1"
                        alt="Foto usuario"
                        style={{ width: '250px', height: '220px' }}
                      />
                      <div className="card-body text-center border-top">
                        <h1 className="card-title fw-bold">
                          {item.nombre_propietario +
                            ' ' +
                            item.apellido_propietario}
                        </h1>
                        <p className="card-text">
                          <i className="fa fa-briefcase me-1" />
                          {item.rol_propietario}
                        </p>
                        <p className="card-text">
                          <i className="fa fa-address-card me-1" />
                          {item.cedula_propietario}
                        </p>
                        <p className="card-text">
                          <i className="fa fa-mobile me-1" />
                          {item.celular_propietario}
                        </p>
                        <p className="card-text">
                          <i className="fa fa-envelope me-1" />
                          {item.correo_propietario}
                        </p>
                        <Button
                          colorScheme="blue"
                          className="mt-2"
                          onClick={openEditModal}
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
            <RegistroPropietario
              stateChanger={setRefresh}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <EditarPropietario
              stateChanger={setRefresh}
              editOpen={editOpen}
              setEditOpen={setEditOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};
