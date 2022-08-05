import React, { useEffect, useState } from 'react';
import user from '../../img/usuario.png';
import { Button } from '@chakra-ui/react';

export const CardsPropietarios = props => {
  const { propietarios, setPropietario, showInfo, setShowInfo } = props;
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(propietarios);
    return () => {
      setPropietario([]);
    }
  }, [showInfo]);

  const handleData = (rowdata) => {
    // setPropietario({
    //   propietario: rowdata,
    // });
    setPropietario(rowdata);
    setShowInfo(true);
  };

  return (
    <>
      {state ? (
        <>
          {state.map((item, i) => (
            <div className="col-sm-3" key={i}>
              <div className="card shadow-sm">
                <>
                  {item.imagen_propietario ? (
                    <img
                      src={`http://localhost:4000/${item.imagen_propietario}`}
                      alt={'Imagen referencial'}
                      style={{ height: '150px', width: '150px' }}
                      className="d-block mx-auto"
                    />
                  ) : (
                    <img
                      src={user}
                      alt={'Imagen referencial'}
                      style={{ height: '150px', width: '150px' }}
                      className="d-block mx-auto w-100 h-100"
                    />
                  )}
                </>
                <div className="card-body border-top">
                  <h1 className="card-title fw-bold" style={{fontSize: '20px'}}>
                    {item.nombre_propietario + ' ' + item.apellido_propietario}
                  </h1>
                  <p className="card-text">
                    <i className="fa fa-briefcase" style={{width: '30px'}} />
                    {item.rol_propietario}
                  </p>
                  <p className="card-text">
                    <i className="fa fa-address-card" style={{width: '30px'}} />
                    {item.cedula_propietario}
                  </p>
                  <p className="card-text">
                    <i className="fa fa-mobile" style={{width: '30px'}} />
                    {item.celular_propietario}
                  </p>
                  <p className="card-text">
                    <i className="fa fa-envelope" style={{width: '30px'}} />
                    {item.correo_propietario}
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
