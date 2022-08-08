import React, { useEffect, useState } from 'react';
import user from '../../img/usuario.png';
import { Button, Icon } from '@chakra-ui/react';
import { FaEnvelope, FaInfoCircle, FaPhoneAlt, FaUserCircle } from 'react-icons/fa';

export const CardsAdministradores = props => {
  const { administradores, setAdministrador, showInfo, setShowInfo } = props;
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(administradores);
    console.log(showInfo);
  }, []);

  const handleData = rowdata => {
    setAdministrador(rowdata);
    setShowInfo(true);
  };

  return (
    <>
      {state ? (
        <>
          {state.map((item, i) => (
            <div className="col-sm-3 mb-2" key={i}>
              <div className="card shadow-sm">
                <div className="card-body border-top">
                  <h1
                    className="card-title fw-bold"
                    style={{ fontSize: '25px' }}
                  >
                    {item.nombre_administrador}
                  </h1>
                  <p className="card-text">
                    <Icon as={FaUserCircle} color="gray.900" className="me-3" />
                    {item.cedula_administrador}
                  </p>
                  <p className="card-text">
                    <Icon as={FaPhoneAlt} color="gray.900" className="me-3" />
                    {item.celular_administrador}
                  </p>
                  <p className="card-text">
                    <Icon as={FaEnvelope} color="gray.900" className="me-3" />
                    {item.correo_administrador}
                  </p>
                  <p className="card-text">
                    <Icon as={FaInfoCircle} color="gray.900" className="me-3" />
                    {item.estado_administrador}
                  </p>
                </div>
                <Button
                  colorScheme="telegram"
                  style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                  onClick={() => handleData(item)}
                  className="pt-1 pb-2"
                >
                  Más información <i className="fa fa-info-circle ms-1" />
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div>No hay datos</div>
        </>
      )}
    </>
  );
};
