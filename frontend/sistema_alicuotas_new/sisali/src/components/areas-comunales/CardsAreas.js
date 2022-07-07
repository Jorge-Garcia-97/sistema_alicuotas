import React, { useEffect, useState } from 'react';
import user from '../../img/usuario.png';
import { Button } from '@chakra-ui/react';

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
            <div className="col-sm-2" key={i}>
              <div className="card shadow-sm">
                <>
                  {item.imagen_area ? (
                    <img
                      src={`http://localhost:4000/${item.imagen_area}`}
                      alt={'Imagen referencial'}
                      style={{ maxHeight: '200px', maxWidth: '300px' }}
                      className="d-block mx-auto w-100 h-100"
                    />
                  ) : (
                    <img
                      src={user}
                      alt={'Imagen referencial'}
                      style={{ height: '300px', width: '300px' }}
                      className="d-block mx-auto w-100 h-100"
                    />
                  )}
                </>
                <div className="card-body border-top">
                  <h1
                    className="card-title fw-bold"
                    style={{ fontSize: '25px' }}
                  >
                    {item.nombre_area}
                  </h1>
                  <p className="card-text">
                    <i className="fa fa-briefcase" style={{ width: '30px' }} />
                    {item.descripcion_area}
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
