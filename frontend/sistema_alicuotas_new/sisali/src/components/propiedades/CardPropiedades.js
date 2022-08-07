import React, { useEffect, useState } from 'react';
import casa from '../../img/casa_modelo.jpeg';
import { Button } from '@chakra-ui/react';

export const CardPropiedades = props => {
  const { propiedades, setPropiedad, showInfo, setShowInfo } = props;
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(propiedades);
    console.log(showInfo);
    console.log(propiedades);
  }, []);

  const handleData = rowdata => {
    setPropiedad(rowdata);
    setShowInfo(true);
  };

  return (
    <>
      {state ? (
        <>
          {state.map((item, i) => (
            <div className="col-sm-3 mb-2" key={i}>
              <div className="card shadow-sm">
                <img
                  src={casa}
                  alt={'Imagen referencial'}
                  style={{ height: '250px', width: '100%' }}
                  className="d-block mx-auto"
                />
                <div className="card-body border-top">
                  <h1
                    className="card-title fw-bold"
                    style={{ fontSize: '25px' }}
                  >
                    Casa: {item.numero_casa}
                  </h1>
                  <p className="card-text">
                    <i className="fa fa-location-arrow" style={{ width: '30px' }} />
                    {item.direccion_propiedad}
                  </p>
                  <p className="card-text">
                    <i
                      className="fa fa-user"
                      style={{ width: '30px' }}
                    />
                    {item.nombre_propietario + ' ' + item.apellido_propietario}
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
          <div>No hay datos en card </div>
        </>
      )}
    </>
  );
};
