import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { BsCalendarFill, BsFillInfoCircleFill } from 'react-icons/bs';
import {
  FaCoins,
  FaHome,
  FaMountain,
  FaUsers,
  FaUsersCog,
} from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './menu.css';

export const MenuOpciones = () => {
  const { isAdmin, rol } = useSelector(state => state.auth);
  return (
    <div className="container-fluid h-100">
      {isAdmin && (
        <div className="row h-100 align-items-center">
          <div className="col-sm-3">
            <div className="card shadow">
              <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                <div>
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
              </div>
              <Button
                colorScheme="gray"
                style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                className="pt-1 pb-2"
              >
                <Link to={'/propietarios'}>
                  Más información <i className="fa fa-info-circle ms-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card shadow">
              <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                <div>
                  <div className="w-100 d-flex justify-content-center">
                    <Icon as={FaHome} h={'32'} w={'32'} />
                  </div>
                  <h1
                    className="card-title fw-bold text-center mt-3"
                    style={{ fontSize: '25px' }}
                  >
                    Propiedades
                  </h1>
                </div>
              </div>
              <Button
                colorScheme="gray"
                style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                className="pt-1 pb-2"
              >
                <Link to={'/propiedades'}>
                  Más información <i className="fa fa-info-circle ms-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card shadow">
              <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                <div>
                  <div className="w-100 d-flex justify-content-center">
                    <Icon as={FaUsersCog} h={'32'} w={'32'} />
                  </div>
                  <h1
                    className="card-title fw-bold text-center mt-3"
                    style={{ fontSize: '25px' }}
                  >
                    Usuarios Administradores
                  </h1>
                </div>
              </div>
              <Button
                colorScheme="gray"
                style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                className="pt-1 pb-2"
              >
                <Link to={'/administradores'}>
                  Más información <i className="fa fa-info-circle ms-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card shadow">
              <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                <div>
                  <div className="w-100 d-flex justify-content-center">
                    <Icon as={FaMountain} h={'32'} w={'32'} />
                  </div>
                  <h1
                    className="card-title fw-bold text-center mt-3"
                    style={{ fontSize: '25px' }}
                  >
                    Áreas Comunales
                  </h1>
                </div>
              </div>
              <Button
                colorScheme="gray"
                style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                className="pt-1 pb-2"
              >
                <Link to={'/areas'}>
                  Más información <i className="fa fa-info-circle ms-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card shadow">
              <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                <div>
                  <div className="w-100 d-flex justify-content-center">
                    <Icon as={GiPayMoney} h={'32'} w={'32'} />
                  </div>
                  <h1
                    className="card-title fw-bold text-center mt-3"
                    style={{ fontSize: '25px' }}
                  >
                    Pago y Gestión de Alicuotas
                  </h1>
                </div>
              </div>
              <Button
                colorScheme="gray"
                style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                className="pt-1 pb-2"
              >
                <Link to={'/alicuotas'}>
                  Más información <i className="fa fa-info-circle ms-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card shadow">
              <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                <div>
                  <div className="w-100 d-flex justify-content-center">
                    <Icon as={FaCoins} h={'32'} w={'32'} />
                  </div>
                  <h1
                    className="card-title fw-bold text-center mt-3"
                    style={{ fontSize: '25px' }}
                  >
                    Valores Pendientes
                  </h1>
                </div>
              </div>
              <Button
                colorScheme="gray"
                style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                className="pt-1 pb-2"
              >
                <Link to={'/pendiente'}>
                  Más información <i className="fa fa-info-circle ms-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card shadow">
              <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                <div>
                  <div className="w-100 d-flex justify-content-center">
                    <Icon as={BsCalendarFill} h={'32'} w={'32'} />
                  </div>
                  <h1
                    className="card-title fw-bold text-center mt-3 "
                    style={{ fontSize: '25px' }}
                  >
                    Gestión de Reservas
                  </h1>
                </div>
              </div>
              <Button
                colorScheme="gray"
                style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                className="pt-1 pb-2"
              >
                <Link to={'/reservaciones'}>
                  Más información <i className="fa fa-info-circle ms-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card shadow">
              <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                <div>
                  <div className="w-100 d-flex justify-content-center">
                    <Icon as={BsFillInfoCircleFill} h={'32'} w={'32'} />
                  </div>
                  <h1
                    className="card-title fw-bold text-center mt-3 mt-3"
                    style={{ fontSize: '25px' }}
                  >
                    Gestión de Solicitudes
                  </h1>
                </div>
              </div>
              <Button
                colorScheme="gray"
                style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                className="pt-1 pb-2"
              >
                <Link to={'/solicitudes'}>
                  Más información <i className="fa fa-info-circle ms-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isAdmin && (
        <>
          {rol == 'Presidente' && (
            <div className="row h-100 align-items-center">
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
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
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/propietarios'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaHome} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Propiedades
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/propiedades'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaUsersCog} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Usuarios Administradores
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/administradores'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaMountain} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Áreas Comunales
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/areas'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={GiPayMoney} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Pago y Gestión de Alicuotas
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/alicuotas'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaCoins} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Valores Pendientes
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/pendiente'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={BsCalendarFill} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3 "
                        style={{ fontSize: '25px' }}
                      >
                        Gestión de Reservas
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/reservaciones'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={BsFillInfoCircleFill} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3 mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Gestión de Solicitudes
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/solicitudes'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
          {rol == 'Vicepresidente' && (
            <div className="row h-100 align-items-center">
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
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
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/propietarios'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaHome} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Propiedades
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/propiedades'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaUsersCog} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Usuarios Administradores
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/administradores'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaMountain} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Áreas Comunales
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/areas'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={GiPayMoney} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Pago y Gestión de Alicuotas
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/alicuotas'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaCoins} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Valores Pendientes
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/pendiente'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={BsCalendarFill} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3 "
                        style={{ fontSize: '25px' }}
                      >
                        Gestión de Reservas
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/reservaciones'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={BsFillInfoCircleFill} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3 mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Gestión de Solicitudes
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/solicitudes'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
          {rol == 'Tesorero' ? (
            <div className="row h-100 align-items-center">
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
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
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/propietarios'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaHome} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Propiedades
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/propiedades'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaMountain} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Áreas Comunales
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/areas'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={GiPayMoney} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Pago y Gestión de Alicuotas
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/alicuotas'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaCoins} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Valores Pendientes
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/pendiente'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={BsFillInfoCircleFill} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3 mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Gestión de Solicitudes
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/solicitudes'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="row h-100 align-items-center">
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
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
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/propietarios'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaHome} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Propiedades
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/propiedades'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaMountain} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Áreas Comunales
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/areas'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={GiPayMoney} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Pago y Gestión de Alicuotas
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/alicuotas'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={FaCoins} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Valores Pendientes
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/pendiente'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-body border-top gradient rounded-top text-white d-grid h-100 align-items-center">
                    <div>
                      <div className="w-100 d-flex justify-content-center">
                        <Icon as={BsFillInfoCircleFill} h={'32'} w={'32'} />
                      </div>
                      <h1
                        className="card-title fw-bold text-center mt-3 mt-3"
                        style={{ fontSize: '25px' }}
                      >
                        Gestión de Solicitudes
                      </h1>
                    </div>
                  </div>
                  <Button
                    colorScheme="gray"
                    style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
                    className="pt-1 pb-2"
                  >
                    <Link to={'/solicitudes'}>
                      Más información <i className="fa fa-info-circle ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
