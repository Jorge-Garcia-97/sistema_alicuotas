import React, { useState } from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarHeader,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './sidebar.css';

export const Sidebar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  return (
    <>
      <ProSidebar
        collapsed={menuCollapse}
        onMouseEnter={() => setMenuCollapse(false)}
        onMouseLeave={() => setMenuCollapse(true)}
      >
        <SidebarContent className="children">
          <SidebarHeader>
            <div className="border-bottom w-100 px-3 pb-2">
              {menuCollapse ? (
                <div className="d-flex justify-content-center align-items-center">
                  <h4 className="mt-2">
                    <i className="fa fa-home" />
                  </h4>
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <h4 className="mt-2">
                    <i className="fa fa-home me-2" /> San Marino
                  </h4>
                </div>
              )}
            </div>
          </SidebarHeader>
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
                    icon={<i className="fa fa-address-card-o"></i>}
                  ></MenuItem>
                  <MenuItem
                    className="py-3 my-2"
                    icon={<i className="fa fa-map"></i>}
                  ></MenuItem>
                  <MenuItem
                    className="py-3 my-2"
                    icon={<i className="fa fa-credit-card"></i>}
                  ></MenuItem>
                  <MenuItem
                    className="py-3 my-2"
                    icon={<i className="fa fa-calendar-check"></i>}
                  ></MenuItem>
                  <MenuItem
                    className="py-3 my-2"
                    icon={<i className="fa fa-file-alt"></i>}
                  ></MenuItem>
                  
                </>
              ) : (
                <>                  
                  <Link to={'/propietarios'}>
                    <MenuItem
                      className="link py-3 my-2"
                      icon={<i className="fa fa-users me-1"></i>}
                    >
                      Propietarios
                    </MenuItem>
                  </Link>
                  <Link to={'/propiedades'}>
                    <MenuItem
                      className="link py-3 my-2"
                      icon={<i className="fa fa-home me-1"></i>}
                    >
                      Propiedades
                    </MenuItem>
                  </Link>
                  <Link to={'/administradores'}>
                    <MenuItem
                      className="link py-3 my-2"
                      icon={<i className="fa fa-address-card-o me-1"></i>}
                    >
                      Administradores
                    </MenuItem>
                  </Link>
                  <Link to={'/areas'}>
                    <MenuItem
                      className="link py-3 my-2"
                      icon={<i className="fa fa-map me-1"></i>}
                    >
                      Areas
                    </MenuItem>
                  </Link>
                  <Link to={'/alicuotas'}>
                    <MenuItem
                      className="link py-3 my-2"
                      icon={<i className="fa fa-credit-card me-1"></i>}
                    >
                      Alicuotas
                    </MenuItem>
                  </Link>
                  <Link to={'/reservaciones'}>
                    <MenuItem
                      className="link py-3 my-2"
                      icon={<i className="fa fa-calendar-check me-1"></i>}
                    >
                      Reservas
                    </MenuItem>
                  </Link>
                  <Link to={'/solicitudes'}>
                    <MenuItem
                      className="link py-3 my-2"
                      icon={<i className="fa fa-file-alt me-1"></i>}
                    >
                      Solicitudes
                    </MenuItem>
                  </Link>
                  
                  
                </>
              )}
            </div>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};
