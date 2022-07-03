import React, { useEffect, useState } from 'react';
import user from '../../img/usuario.png';
import { Button } from '@chakra-ui/react';

export const CardsPropietarios = props => {
  const { data_propietario, setOpenEditModal, data_imagen } = props;
  const [propietario, setPropietario] = useState();
  const [imagen, setImagen] = useState();

  useEffect(() => {
    console.log(props);
    // let img_name = imgs.find(
    //   element => element == `${data_propietario.id_propietario}-propietario.png`
    // );
    // setImagen(img_name);
    setPropietario(data_propietario);
    return () => {
      setPropietario();
      setImagen();
    };
  }, []);

  const abrirModal = () => {
    setOpenEditModal(true);
  };

  return (
    <>
      {propietario ? (
        <div className="card w-100">
          {imagen ? (
            <img
              src={`http://localhost:4000/${imagen}`}
              alt={'Imagen referencial'}
              style={{ maxHeight: '300px' }}
              className="d-block mx-auto w-100 h-100"
            />
          ) : (
            <img
              src={user}
              alt={'Imagen referencial'}
              style={{ maxHeight: '300px' }}
              className="d-block mx-auto w-100 h-100"
            />
          )}
          <div className="card-body text-center border-top">
            <h1 className="card-title fw-bold">
              {propietario.nombre_propietario +
                ' ' +
                propietario.apellido_propietario}
            </h1>
            <p className="card-text">
              <i className="fa fa-briefcase me-1" />
              {propietario.rol_propietario}
            </p>
            <p className="card-text">
              <i className="fa fa-address-card me-1" />
              {propietario.cedula_propietario}
            </p>
            <p className="card-text">
              <i className="fa fa-mobile me-1" />
              {propietario.celular_propietario}
            </p>
            <p className="card-text">
              <i className="fa fa-envelope me-1" />
              {propietario.correo_propietario}
            </p>
            <Button colorScheme="blue" className="mt-2" onClick={abrirModal}>
              Editar Datos <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
      ) : (
        <div>Algo ha salido mal</div>
      )}
    </>
  );
};
