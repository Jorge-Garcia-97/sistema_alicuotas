import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { BsCalendarFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { FaCoins, FaHome, FaMountain, FaUserCircle, FaUsers, FaUsersCog } from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi';
import './menu.css';

export const MenuOpciones = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 align-items-center">
        <div className="col-sm-3">
          <div className="card shadow">
            <div className="card-body border-top gradient rounded-top text-white">
              <div className="w-100 d-flex justify-content-center">
                <Icon as={FaUsers} h={'32'} w={'32'} />
              </div>
              <h1
                className="card-title fw-bold text-center mt-3"
                style={{ fontSize: '25px' }}
              >
                Propietarios
              </h1>
            </div>
            <Button
              colorScheme="gray"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card shadow">
            <div className="card-body border-top gradient rounded-top text-white">
              <div className="w-100 d-flex justify-content-center">
                <Icon as={FaHome} h={'32'} w={'32'} />
              </div>
              <h1
                className="card-title fw-bold text-center mt-3"
                style={{ fontSize: '25px' }}
              >
                Propietarios
              </h1>
            </div>
            <Button
              colorScheme="gray"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card shadow">
            <div className="card-body border-top gradient rounded-top text-white">
              <div className="w-100 d-flex justify-content-center">
                <Icon as={FaUsersCog} h={'32'} w={'32'} />
              </div>
              <h1
                className="card-title fw-bold text-center mt-3"
                style={{ fontSize: '25px' }}
              >
                Propietarios
              </h1>
            </div>
            <Button
              colorScheme="gray"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card shadow">
            <div className="card-body border-top gradient rounded-top text-white">
              <div className="w-100 d-flex justify-content-center">
                <Icon as={FaMountain} h={'32'} w={'32'} />
              </div>
              <h1
                className="card-title fw-bold text-center mt-3"
                style={{ fontSize: '25px' }}
              >
                Propietarios
              </h1>
            </div>
            <Button
              colorScheme="gray"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card shadow">
            <div className="card-body border-top gradient rounded-top text-white">
              <div className="w-100 d-flex justify-content-center">
                <Icon as={GiPayMoney} h={'32'} w={'32'} />
              </div>
              <h1
                className="card-title fw-bold text-center mt-3"
                style={{ fontSize: '25px' }}
              >
                Propietarios
              </h1>
            </div>
            <Button
              colorScheme="gray"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card shadow">
            <div className="card-body border-top gradient rounded-top text-white">
              <div className="w-100 d-flex justify-content-center">
                <Icon as={FaCoins} h={'32'} w={'32'} />
              </div>
              <h1
                className="card-title fw-bold text-center mt-3"
                style={{ fontSize: '25px' }}
              >
                Propietarios
              </h1>
            </div>
            <Button
              colorScheme="gray"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card shadow">
            <div className="card-body border-top gradient rounded-top text-white">
              <div className="w-100 d-flex justify-content-center">
                <Icon as={BsCalendarFill} h={'32'} w={'32'} />
              </div>
              <h1
                className="card-title fw-bold text-center mt-3 "
                style={{ fontSize: '25px' }}
              >
                Propietarios
              </h1>
            </div>
            <Button
              colorScheme="gray"
              style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
              //   onClick={() => handleData(item)}
              className="pt-1 pb-2"
            >
              Más información <i className="fa fa-info-circle ms-1" />
            </Button>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card shadow">
            <div className="card-body border-top gradient rounded-top text-white">
              <div className="w-100 d-flex justify-content-center">
                <Icon as={BsFillInfoCircleFill} h={'32'} w={'32'} />
              </div>
              <h1
                className="card-title fw-bold text-center mt-3 mt-3"
                style={{ fontSize: '25px' }}
              >
                Propietarios
              </h1>
            </div>
            <Button
              colorScheme="gray"
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
