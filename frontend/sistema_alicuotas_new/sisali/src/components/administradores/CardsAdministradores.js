import React, { useEffect, useState } from 'react';
import user from '../../img/usuario.png';
import { Button } from '@chakra-ui/react';

export const CardsAdministradores = props => {
  const { administradores, setAdministrador, showInfo, setShowInfo } = props;
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(administradores);
    console.log(showInfo)
  }, []);

  const handleData = (rowdata) => {
    setAdministrador(rowdata);
    setShowInfo(true);
  };

  return (
    <>
      {state ? (
        <>
          {state.map((item, i) => (
            <div className="col-sm-2" key={i}>
              <div className="card shadow-sm">                
                <div className="card-body border-top">
                  <h1 className="card-title fw-bold" style={{fontSize: '25px'}}>
                    {item.nombre_administrador + ' ' + item.celular_administrador}
                  </h1>
                  <p className="card-text">
                    <i className="fa fa-briefcase" style={{width: '30px'}} />
                    {item.correo_administrador}
                  </p>
                  <p className="card-text">
                    <i className="fa fa-address-card" style={{width: '30px'}} />
                    {item.cedula_administrador}
                  </p>
                  <p className="card-text">
                    <i className="fa fa-envelope" style={{width: '30px'}} />
                    {item.estado_administrador}
                  </p>
                </div>
                <Button
                  colorScheme="blue"
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
