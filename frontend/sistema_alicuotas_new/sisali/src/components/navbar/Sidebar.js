import { Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarHeader,
} from 'react-pro-sidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCoins, FaMountain, FaUsersCog } from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi';
import { BsCalendarFill, BsFillInfoCircleFill } from 'react-icons/bs';
import './sidebar.css';

export const Sidebar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const { isAdmin, rol } = useSelector(state => state.auth);
  return (
    <>
      <ProSidebar
        collapsed={menuCollapse}
        onMouseEnter={() => setMenuCollapse(false)}
        onMouseLeave={() => setMenuCollapse(true)}
        className="bg-light shadow-sm border-end"
      >
        <SidebarContent className="children">
          <SidebarHeader>
            <div className="border-bottom w-100 px-3 pb-2">
              {menuCollapse ? (
                <div className="d-flex justify-content-center align-items-center">
                  <h4 className="link pt-2 pb-2 mt-1 mb-1">
                    <i className="fa fa-home" />
                  </h4>
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <Link to={'/'}>
                    <h4 className="link pt-3 pb-2">
                      <i className="fa fa-home me-2" /> San Marino
                    </h4>
                  </Link>
                </div>
              )}
            </div>
          </SidebarHeader>
          {isAdmin && (
            <Menu className="h-100 d-flex flex-column">
              <div className="mt-2 text-center px-2 h-100">
                {menuCollapse ? (
                  <>
                    <MenuItem
                      className="py-3 my-2"
                      icon={<i className="fa fa-users"></i>}
                    ></MenuItem>
                    <MenuItem
                      className="py-3 my-2"
                      icon={<i className="fa fa-home"></i>}
                    ></MenuItem>
                    <MenuItem
                      className="py-3 my-2"
                      icon={<Icon as={FaUsersCog} />}
                    ></MenuItem>
                    <MenuItem
                      className="py-3 my-2"
                      icon={<Icon as={FaMountain} />}
                    ></MenuItem>
                    <MenuItem
                      className="py-3 my-2"
                      icon={<Icon as={GiPayMoney} />}
                    ></MenuItem>
                    <MenuItem
                      className="py-3 my-2"
                      icon={<Icon as={FaCoins} />}
                    ></MenuItem>
                    <MenuItem
                      className="py-3 my-2"
                      icon={<Icon as={BsCalendarFill} />}
                    ></MenuItem>
                    <MenuItem
                      className="py-3 my-2"
                      icon={<Icon as={BsFillInfoCircleFill} />}
                    ></MenuItem>
                  </>
                ) : (
                  <>
                    <Link to={'/propietarios'}>
                      <MenuItem
                        className="link py-3 my-2"
                        icon={<i className="fa fa-users me-2"></i>}
                      >
                        Propietarios
                      </MenuItem>
                    </Link>
                    <Link to={'/propiedades'}>
                      <MenuItem
                        className="link py-3 my-2"
                        icon={<i className="fa fa-home me-2"></i>}
                      >
                        Propiedades
                      </MenuItem>
                    </Link>
                    <Link to={'/administradores'}>
                      <MenuItem
                        className="link py-3 my-2"
                        icon={<Icon as={FaUsersCog} className="me-2" />}
                      >
                        Administradores
                      </MenuItem>
                    </Link>
                    <Link to={'/areas'}>
                      <MenuItem
                        className="link py-3 my-2"
                        icon={<Icon as={FaMountain} className="me-2" />}
                      >
                        Areas
                      </MenuItem>
                    </Link>
                    <Link to={'/alicuotas'}>
                      <MenuItem
                        className="link py-3 my-2"
                        icon={<Icon as={GiPayMoney} className="me-2" />}
                      >
                        Alicuotas
                      </MenuItem>
                    </Link>
                    <Link to={'/pendiente'}>
                      <MenuItem
                        className="link py-3 my-2"
                        icon={<Icon as={FaCoins} className="me-2" />}
                      >
                        Pendientes
                      </MenuItem>
                    </Link>
                    <Link to={'/reservaciones'}>
                      <MenuItem
                        className="link py-3 my-2"
                        icon={<Icon as={BsCalendarFill} className="me-2" />}
                      >
                        Reservas
                      </MenuItem>
                    </Link>
                    <Link to={'/solicitudes'}>
                      <MenuItem
                        className="link py-3 my-2"
                        icon={
                          <Icon as={BsFillInfoCircleFill} className="me-2" />
                        }
                      >
                        Solicitudes
                      </MenuItem>
                    </Link>
                  </>
                )}
              </div>
            </Menu>
          )}
          {!isAdmin && (
            <>
              {rol == 'Propietario' && (
                <Menu className="h-100 d-flex flex-column">
                  <div className="mt-2 text-center px-2 h-100">
                    {menuCollapse ? (
                      <>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<i className="fa fa-users"></i>}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<i className="fa fa-home"></i>}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={GiPayMoney} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsFillInfoCircleFill} />}
                        ></MenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={'/propietarios'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<i className="fa fa-users me-2"></i>}
                          >
                            Propietarios
                          </MenuItem>
                        </Link>
                        <Link to={'/propiedades'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<i className="fa fa-home me-2"></i>}
                          >
                            Propiedades
                          </MenuItem>
                        </Link>
                        <Link to={'/alicuotas'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={GiPayMoney} className="me-2" />}
                          >
                            Alicuotas
                          </MenuItem>
                        </Link>
                        <Link to={'/solicitudes'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={
                              <Icon
                                as={BsFillInfoCircleFill}
                                className="me-2"
                              />
                            }
                          >
                            Solicitudes
                          </MenuItem>
                        </Link>
                      </>
                    )}
                  </div>
                </Menu>
              )}
              {rol == 'Arrendatario' && (
                <Menu className="h-100 d-flex flex-column">
                  <div className="mt-2 text-center px-2 h-100">
                    {menuCollapse ? (
                      <>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsFillInfoCircleFill} />}
                        ></MenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={'/solicitudes'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={
                              <Icon
                                as={BsFillInfoCircleFill}
                                className="me-2"
                              />
                            }
                          >
                            Solicitudes
                          </MenuItem>
                        </Link>
                      </>
                    )}
                  </div>
                </Menu>
              )}
              {rol == 'Presidente' && (
                <Menu className="h-100 d-flex flex-column">
                  <div className="mt-2 text-center px-2 h-100">
                    {menuCollapse ? (
                      <>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<i className="fa fa-users"></i>}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<i className="fa fa-home"></i>}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={FaUsersCog} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={FaMountain} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={GiPayMoney} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={FaCoins} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsCalendarFill} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsFillInfoCircleFill} />}
                        ></MenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={'/propietarios'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<i className="fa fa-users me-2"></i>}
                          >
                            Propietarios
                          </MenuItem>
                        </Link>
                        <Link to={'/propiedades'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<i className="fa fa-home me-2"></i>}
                          >
                            Propiedades
                          </MenuItem>
                        </Link>
                        <Link to={'/administradores'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={FaUsersCog} className="me-2" />}
                          >
                            Administradores
                          </MenuItem>
                        </Link>
                        <Link to={'/areas'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={FaMountain} className="me-2" />}
                          >
                            Areas
                          </MenuItem>
                        </Link>
                        <Link to={'/alicuotas'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={GiPayMoney} className="me-2" />}
                          >
                            Alicuotas
                          </MenuItem>
                        </Link>
                        <Link to={'/pendiente'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={FaCoins} className="me-2" />}
                          >
                            Pendientes
                          </MenuItem>
                        </Link>
                        <Link to={'/reservaciones'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={BsCalendarFill} className="me-2" />}
                          >
                            Reservas
                          </MenuItem>
                        </Link>
                        <Link to={'/solicitudes'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={
                              <Icon
                                as={BsFillInfoCircleFill}
                                className="me-2"
                              />
                            }
                          >
                            Solicitudes
                          </MenuItem>
                        </Link>
                      </>
                    )}
                  </div>
                </Menu>
              )}
              {rol == 'Vicepresidente' && (
                <Menu className="h-100 d-flex flex-column">
                  <div className="mt-2 text-center px-2 h-100">
                    {menuCollapse ? (
                      <>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<i className="fa fa-users"></i>}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<i className="fa fa-home"></i>}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={FaUsersCog} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={FaMountain} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={GiPayMoney} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={FaCoins} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsCalendarFill} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsFillInfoCircleFill} />}
                        ></MenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={'/propietarios'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<i className="fa fa-users me-2"></i>}
                          >
                            Propietarios
                          </MenuItem>
                        </Link>
                        <Link to={'/propiedades'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<i className="fa fa-home me-2"></i>}
                          >
                            Propiedades
                          </MenuItem>
                        </Link>
                        <Link to={'/administradores'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={FaUsersCog} className="me-2" />}
                          >
                            Administradores
                          </MenuItem>
                        </Link>
                        <Link to={'/areas'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={FaMountain} className="me-2" />}
                          >
                            Areas
                          </MenuItem>
                        </Link>
                        <Link to={'/alicuotas'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={GiPayMoney} className="me-2" />}
                          >
                            Alicuotas
                          </MenuItem>
                        </Link>
                        <Link to={'/pendiente'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={FaCoins} className="me-2" />}
                          >
                            Pendientes
                          </MenuItem>
                        </Link>
                        <Link to={'/reservaciones'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={BsCalendarFill} className="me-2" />}
                          >
                            Reservas
                          </MenuItem>
                        </Link>
                        <Link to={'/solicitudes'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={
                              <Icon
                                as={BsFillInfoCircleFill}
                                className="me-2"
                              />
                            }
                          >
                            Solicitudes
                          </MenuItem>
                        </Link>
                      </>
                    )}
                  </div>
                </Menu>
              )}
              {rol == 'Secretario' && (
                <Menu className="h-100 d-flex flex-column">
                  <div className="mt-2 text-center px-2 h-100">
                    {menuCollapse ? (
                      <>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsCalendarFill} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsFillInfoCircleFill} />}
                        ></MenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={'/reservaciones'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={BsCalendarFill} className="me-2" />}
                          >
                            Reservas
                          </MenuItem>
                        </Link>
                        <Link to={'/solicitudes'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={
                              <Icon
                                as={BsFillInfoCircleFill}
                                className="me-2"
                              />
                            }
                          >
                            Solicitudes
                          </MenuItem>
                        </Link>
                      </>
                    )}
                  </div>
                </Menu>
              )}
              {rol == 'Tesorero' && (
                <Menu className="h-100 d-flex flex-column">
                  <div className="mt-2 text-center px-2 h-100">
                    {menuCollapse ? (
                      <>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={GiPayMoney} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={FaCoins} />}
                        ></MenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={'/alicuotas'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={GiPayMoney} className="me-2" />}
                          >
                            Alicuotas
                          </MenuItem>
                        </Link>
                        <Link to={'/pendiente'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={FaCoins} className="me-2" />}
                          >
                            Pendientes
                          </MenuItem>
                        </Link>
                      </>
                    )}
                  </div>
                </Menu>
              )}
              {rol == 'Vocal' && (
                <Menu className="h-100 d-flex flex-column">
                  <div className="mt-2 text-center px-2 h-100">
                    {menuCollapse ? (
                      <>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsCalendarFill} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsFillInfoCircleFill} />}
                        ></MenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={'/reservaciones'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={BsCalendarFill} className="me-2" />}
                          >
                            Reservas
                          </MenuItem>
                        </Link>
                        <Link to={'/solicitudes'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={
                              <Icon
                                as={BsFillInfoCircleFill}
                                className="me-2"
                              />
                            }
                          >
                            Solicitudes
                          </MenuItem>
                        </Link>
                      </>
                    )}
                  </div>
                </Menu>
              )}
              {rol == 'Vocal Suplente' && (
                <Menu className="h-100 d-flex flex-column">
                  <div className="mt-2 text-center px-2 h-100">
                    {menuCollapse ? (
                      <>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsCalendarFill} />}
                        ></MenuItem>
                        <MenuItem
                          className="py-3 my-2"
                          icon={<Icon as={BsFillInfoCircleFill} />}
                        ></MenuItem>
                      </>
                    ) : (
                      <>
                        <Link to={'/reservaciones'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={<Icon as={BsCalendarFill} className="me-2" />}
                          >
                            Reservas
                          </MenuItem>
                        </Link>
                        <Link to={'/solicitudes'}>
                          <MenuItem
                            className="link py-3 my-2"
                            icon={
                              <Icon
                                as={BsFillInfoCircleFill}
                                className="me-2"
                              />
                            }
                          >
                            Solicitudes
                          </MenuItem>
                        </Link>
                      </>
                    )}
                  </div>
                </Menu>
              )}
            </>
          )}
        </SidebarContent>
      </ProSidebar>
    </>
  );
};
