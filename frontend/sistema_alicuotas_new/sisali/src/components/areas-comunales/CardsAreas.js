import React, { useEffect, useState } from 'react';
import user from '../../img/usuario.png';
import { Button, Icon } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

export const CardsAreas = props => {
  const { areas, setArea, showInfo, setShowInfo } = props;
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(areas);
  }, []);

  const handleData = rowdata => {
    setArea(rowdata);
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
                  {item.imagen_area ? (
                    <img
                      src={`http://18.231.89.19:4000/${item.imagen_area}`}
                      alt={'Imagen referencial'}
                      style={{ height: '250px', width: '100%' }}
                      className="d-block mx-auto"
                    />
                  ) : (
                    <img
                      src={user}
                      alt={'Imagen referencial'}
                      style={{ height: '150px', width: '100%' }}
                      className="d-block mx-auto"
                    />
                  )}
                </>
                <div className="card-body border-top">
                  <h1
                    className="card-title fw-bold"
                    style={{ fontSize: '20px' }}
                  >
                    {item.nombre_area}
                  </h1>
                  <div className="d-flex">
                    <Icon as={FaInfoCircle} className="mt-1 me-2" />
                    <p className="card-text">{item.descripcion_area}</p>
                  </div>
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
