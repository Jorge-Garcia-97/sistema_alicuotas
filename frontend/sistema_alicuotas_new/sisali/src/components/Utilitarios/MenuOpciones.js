import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

export const MenuOpciones = () => {
  return (
    <div className="bg-dark container py-5">
      <div className="row">
        <div className="col-sm-3 bg-primary">
          <div className="card shadow-sm">
            <div className="card-body border-top">
              <h1 className="card-title fw-bold" style={{ fontSize: '25px' }}>
                Propietarios
              </h1>
              <p className="card-text">
                <Icon as={FaUserCircle} color="gray.900" className="me-3" />
              </p>
            </div>
            <Button
              colorScheme="telegram"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3 bg-primary">
          <div className="card shadow-sm">
            <div className="card-body border-top">
              <h1 className="card-title fw-bold" style={{ fontSize: '25px' }}>
                Propietarios
              </h1>
              <p className="card-text">
                <Icon as={FaUserCircle} color="gray.900" className="me-3" />
              </p>
            </div>
            <Button
              colorScheme="telegram"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3 bg-primary">
          <div className="card shadow-sm">
            <div className="card-body border-top">
              <h1 className="card-title fw-bold" style={{ fontSize: '25px' }}>
                Propietarios
              </h1>
              <p className="card-text">
                <Icon as={FaUserCircle} color="gray.900" className="me-3" />
              </p>
            </div>
            <Button
              colorScheme="telegram"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3 bg-primary">
          <div className="card shadow-sm">
            <div className="card-body border-top">
              <h1 className="card-title fw-bold" style={{ fontSize: '25px' }}>
                Propietarios
              </h1>
              <p className="card-text">
                <Icon as={FaUserCircle} color="gray.900" className="me-3" />
              </p>
            </div>
            <Button
              colorScheme="telegram"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
