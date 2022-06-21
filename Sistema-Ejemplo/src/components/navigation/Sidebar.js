import React, { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = (props) => {
  const { nombreEmpresa, img_name } = props;
  const {
    gestionEmpleados,
    gestionProductos,
    gestionClientes,
    gestionPedidos,
    gestionRutas,
    gestionCaja,
    informacionGeneral,
  } = useSelector((state) => state.data);
  const { isAdmin } = useSelector((state) => state.auth);
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [img, setimg] = useState();
  const [active, setactive] = useState({
    informacion: false,
    personalactivo: false,
    personalinactivo: false,
    productos: false,
    proveedoresactivos: false,
    proveedoresinactivos: false,
    categorias: false,
    clientesactivos: false,
    clientesinactivos: false,
    establecimientos: false,
    entregas: false,
    rutas: false,
    cuenta: false,
    home: true,
    rol: false,
    rutero: false,
    gastos: false,
    conciliacion: false,
  });

  return (
    <>
      <ProSidebar
        collapsed={menuCollapse}
        onMouseEnter={() => setMenuCollapse(false)}
        onMouseLeave={() => setMenuCollapse(true)}
      >
        <div className="h-100 border-end">
          <SidebarContent>
            <SidebarHeader>
              {menuCollapse ? (
                <div className="d-flex justify-content-center align-items-center">
                  {(img_name) ? (
                    <img
                      src={"http://3.134.76.83:5001/" + img_name}
                      alt={"logo_empresa"}
                      style={{ width: "45px", height: "50px" }}
                      className="rounded-circle py-1"
                    />
                  ) : (
                    <i
                      className="fa fa-infinity text-primary"
                      style={{ fontSize: "45px" }}
                    />
                  )}
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  {(img_name) ? (
                    <img
                      src={"http://3.134.76.83:5001/" + img_name}
                      alt={"logo_empresa"}
                      style={{ width: "45px", height: "50px" }}
                      className="me-2 rounded-circle py-1"
                    />
                  ) : (
                    <i
                      className="fa fa-infinity text-primary me-2"
                      style={{ fontSize: "45px" }}
                    />
                  )}
                  <h6 className="mt-2">{nombreEmpresa}</h6>
                </div>
              )}
            </SidebarHeader>
            <Menu>
              <MenuItem
                active={active.home}
                onClick={() => {
                  setactive({
                    informacion: false,
                    personalactivo: false,
                    personalinactivo: false,
                    productos: false,
                    proveedoresactivos: false,
                    proveedoresinactivos: false,
                    categorias: false,
                    clientesactivos: false,
                    clientesinactivos: false,
                    establecimientos: false,
                    entregas: false,
                    rutas: false,
                    cuenta: false,
                    home: true,
                    rol: false,
                    rutero: false,
                    gastos: false,
                    conciliacion: false,
                  });
                }}
                icon={<i className="fa fa-home"></i>}
              >
                Inicio
                <Link to={"/home"} />
              </MenuItem>
              {(isAdmin || gestionEmpleados === "SI") && (
                <>
                  <SubMenu
                    title="Gestión del personal"
                    icon={<i className="fa fa-user-tie" />}
                  >
                    <MenuItem
                      active={active.rol}
                      onClick={() => {
                        setactive({
                          informacion: false,
                          personalactivo: false,
                          personalinactivo: false,
                          productos: false,
                          proveedoresactivos: false,
                          proveedoresinactivos: false,
                          categorias: false,
                          clientesactivos: false,
                          clientesinactivos: false,
                          establecimientos: false,
                          entregas: false,
                          rutas: false,
                          cuenta: false,
                          home: false,
                          rol: true,
                          rutero: false,
                          gastos: false,
                          conciliacion: false,
                        });
                      }}
                      icon={<i className="fa fa-th-large" />}
                    >
                      Roles
                      <Link to={"/personal/roles"} />
                    </MenuItem>
                    <MenuItem
                      active={active.personalactivo}
                      onClick={() => {
                        setactive({
                          informacion: false,
                          personalactivo: true,
                          personalinactivo: false,
                          productos: false,
                          proveedoresactivos: false,
                          proveedoresinactivos: false,
                          categorias: false,
                          clientesactivos: false,
                          clientesinactivos: false,
                          establecimientos: false,
                          entregas: false,
                          rutas: false,
                          cuenta: false,
                          home: false,
                          rol: false,
                          rutero: false,
                          gastos: false,
                          conciliacion: false,
                        });
                      }}
                      icon={<i className="fa fa-toggle-on" />}
                    >
                      Personal activo
                      <Link to={"/personal/activos"} />
                    </MenuItem>
                    <MenuItem
                      active={active.personalinactivo}
                      onClick={() => {
                        setactive({
                          informacion: false,
                          personalactivo: false,
                          personalinactivo: true,
                          productos: false,
                          proveedoresactivos: false,
                          proveedoresinactivos: false,
                          categorias: false,
                          clientesactivos: false,
                          clientesinactivos: false,
                          establecimientos: false,
                          entregas: false,
                          rutas: false,
                          cuenta: false,
                          home: false,
                          rol: false,
                          rutero: false,
                          gastos: false,
                          conciliacion: false,
                        });
                      }}
                      icon={<i className="fa fa-toggle-off" />}
                    >
                      Dados de baja
                      <Link to={"/personal/inactivos"} />
                    </MenuItem>
                  </SubMenu>
                </>
              )}
              {(isAdmin || gestionProductos === "SI") && (
                <>
                  <SubMenu
                    title="Gestión de productos"
                    icon={<i className="fa fa-box-open" />}
                  >
                    <MenuItem
                      active={active.categorias}
                      onClick={() => {
                        setactive({
                          informacion: false,
                          personalactivo: false,
                          personalinactivo: false,
                          productos: false,
                          proveedoresactivos: false,
                          proveedoresinactivos: false,
                          categorias: true,
                          clientesactivos: false,
                          clientesinactivos: false,
                          establecimientos: false,
                          entregas: false,
                          rutas: false,
                          cuenta: false,
                          home: false,
                          rol: false,
                          rutero: false,
                          gastos: false,
                          conciliacion: false,
                        });
                      }}
                      icon={<i className="fa fa-th-large" />}
                    >
                      Categorías
                      <Link to={"/productos/categorias"} />
                    </MenuItem>
                    <MenuItem
                      active={active.productos}
                      onClick={() => {
                        setactive({
                          informacion: false,
                          personalactivo: false,
                          personalinactivo: false,
                          productos: true,
                          proveedoresactivos: false,
                          proveedoresinactivos: false,
                          categorias: false,
                          clientesactivos: false,
                          clientesinactivos: false,
                          establecimientos: false,
                          entregas: false,
                          rutas: false,
                          cuenta: false,
                          home: false,
                          rol: false,
                          rutero: false,
                          gastos: false,
                          conciliacion: false,
                        });
                      }}
                      icon={<i className="fa fa-box" />}
                    >
                      Productos
                      <Link to={"/productos/productos"} />
                    </MenuItem>
                    <SubMenu
                      title="Proveedores"
                      icon={<i className="fa fa-parachute-box" />}
                    >
                      <MenuItem
                        active={active.proveedoresactivos}
                        onClick={() => {
                          setactive({
                            informacion: false,
                            personalactivo: false,
                            personalinactivo: false,
                            productos: false,
                            proveedoresactivos: true,
                            proveedoresinactivos: false,
                            categorias: false,
                            clientesactivos: false,
                            clientesinactivos: false,
                            establecimientos: false,
                            entregas: false,
                            rutas: false,
                            cuenta: false,
                            home: false,
                            rol: false,
                            rutero: false,
                            gastos: false,
                            conciliacion: false,
                          });
                        }}
                        icon={<i className="fa fa-toggle-on" />}
                      >
                        Activos
                        <Link to={"/proveedores/activos"} />
                      </MenuItem>
                      <MenuItem
                        active={active.proveedoresinactivos}
                        onClick={() => {
                          setactive({
                            informacion: false,
                            personalactivo: false,
                            personalinactivo: false,
                            productos: false,
                            proveedoresactivos: false,
                            proveedoresinactivos: true,
                            categorias: false,
                            clientesactivos: false,
                            clientesinactivos: false,
                            establecimientos: false,
                            entregas: false,
                            rutas: false,
                            cuenta: false,
                            home: false,
                            rol: false,
                            rutero: false,
                            gastos: false,
                            conciliacion: false,
                          });
                        }}
                        icon={<i className="fa fa-toggle-off" />}
                      >
                        Dados de baja
                        <Link to={"/proveedores/inactivos"} />
                      </MenuItem>
                    </SubMenu>
                  </SubMenu>
                </>
              )}

              {(isAdmin || gestionClientes === "SI") && (
                <>
                  <SubMenu
                    title="Gestión de clientes"
                    icon={<i className="fa fa-users-cog" />}
                  >
                    <SubMenu
                      title="Clientes"
                      icon={<i className="fa fa-users" />}
                    >
                      <MenuItem
                        active={active.clientesactivos}
                        onClick={() => {
                          setactive({
                            informacion: false,
                            personalactivo: false,
                            personalinactivo: false,
                            productos: false,
                            proveedoresactivos: false,
                            proveedoresinactivos: false,
                            categorias: false,
                            clientesactivos: true,
                            clientesinactivos: false,
                            establecimientos: false,
                            entregas: false,
                            rutas: false,
                            cuenta: false,
                            home: false,
                            rol: false,
                            rutero: false,
                            gastos: false,
                            conciliacion: false,
                          });
                        }}
                        icon={<i className="fa fa-toggle-on"></i>}
                      >
                        Activos
                        <Link to={"/clientes/activos"} />
                      </MenuItem>
                      <MenuItem
                        active={active.clientesinactivos}
                        onClick={() => {
                          setactive({
                            informacion: false,
                            personalactivo: false,
                            personalinactivo: false,
                            productos: false,
                            proveedoresactivos: false,
                            proveedoresinactivos: false,
                            categorias: false,
                            clientesactivos: false,
                            clientesinactivos: true,
                            establecimientos: false,
                            entregas: false,
                            rutas: false,
                            cuenta: false,
                            home: false,
                            rol: false,
                            rutero: false,
                            gastos: false,
                            conciliacion: false,
                          });
                        }}
                        icon={<i className="fa fa-toggle-off"></i>}
                      >
                        Dados de baja
                        <Link to={"/clientes/inactivos"} />
                      </MenuItem>
                    </SubMenu>
                    <MenuItem
                      active={active.establecimientos}
                      onClick={() => {
                        setactive({
                          informacion: false,
                          personalactivo: false,
                          personalinactivo: false,
                          productos: false,
                          proveedoresactivos: false,
                          proveedoresinactivos: false,
                          categorias: false,
                          clientesactivos: false,
                          clientesinactivos: false,
                          establecimientos: true,
                          entregas: false,
                          rutas: false,
                          cuenta: false,
                          home: false,
                          rol: false,
                          rutero: false,
                          gastos: false,
                          conciliacion: false,
                        });
                      }}
                      icon={<i className="fa fa-store"></i>}
                    >
                      Establecimientos
                      <Link to={"/establecimientos/"} />
                    </MenuItem>
                  </SubMenu>
                </>
              )}

              {(isAdmin || gestionPedidos === "SI") && (
                <>
                  <MenuItem
                    active={active.entregas}
                    onClick={() => {
                      setactive({
                        informacion: false,
                        personalactivo: false,
                        personalinactivo: false,
                        productos: false,
                        proveedoresactivos: false,
                        proveedoresinactivos: false,
                        categorias: false,
                        clientesactivos: false,
                        clientesinactivos: false,
                        establecimientos: false,
                        entregas: true,
                        rutas: false,
                        cuenta: false,
                        home: false,
                        rol: false,
                        rutero: false,
                        gastos: false,
                        conciliacion: false,
                      });
                    }}
                    icon={<i className="fa fa-shipping-fast"></i>}
                  >
                    Gestión de pedidos
                    <Link to="/pedidos" />
                  </MenuItem>
                </>
              )}

              {(isAdmin || gestionRutas === "SI") && (
                <>
                  <MenuItem
                    active={active.rutas}
                    onClick={() => {
                      setactive({
                        informacion: false,
                        personalactivo: false,
                        personalinactivo: false,
                        productos: false,
                        proveedoresactivos: false,
                        proveedoresinactivos: false,
                        categorias: false,
                        clientesactivos: false,
                        clientesinactivos: false,
                        establecimientos: false,
                        entregas: false,
                        rutas: true,
                        cuenta: false,
                        home: false,
                        rol: false,
                        rutero: false,
                        gastos: false,
                        conciliacion: false,
                      });
                    }}
                    icon={<i className="fa fa-map-marked-alt"></i>}
                  >
                    Rutas de Entrega
                    <Link to="/rutas" />
                  </MenuItem>
                </>
              )}

              {(isAdmin || gestionCaja === "SI") && (
                <>
                  <SubMenu
                    title="Rutero & Conciliación"
                    icon={<i className="fa fa-hand-holding-usd" />}
                  >
                    <MenuItem
                      active={active.rutero}
                      onClick={() => {
                        setactive({
                          informacion: false,
                          personalactivo: false,
                          personalinactivo: false,
                          productos: false,
                          proveedoresactivos: false,
                          proveedoresinactivos: false,
                          categorias: false,
                          clientesactivos: false,
                          clientesinactivos: false,
                          establecimientos: false,
                          entregas: false,
                          rutas: false,
                          cuenta: false,
                          home: false,
                          rol: false,
                          rutero: true,
                          gastos: false,
                          conciliacion: false,
                        });
                      }}
                      icon={<i className="fa fa-th-list"></i>}
                    >
                      Planificación de entregas
                      <Link to="/arqueo/rutero" />
                    </MenuItem>
                    <MenuItem
                      active={active.conciliacion}
                      onClick={() => {
                        setactive({
                          informacion: false,
                          personalactivo: false,
                          personalinactivo: false,
                          productos: false,
                          proveedoresactivos: false,
                          proveedoresinactivos: false,
                          categorias: false,
                          clientesactivos: false,
                          clientesinactivos: false,
                          establecimientos: false,
                          entregas: false,
                          rutas: false,
                          cuenta: false,
                          home: false,
                          rol: false,
                          rutero: false,
                          gastos: false,
                          conciliacion: true,
                        });
                      }}
                      icon={<i className="fa fa-cash-register"></i>}
                    >
                      Conciliación
                      <Link to="/arqueo/conciliacion" />
                    </MenuItem>
                  </SubMenu>
                </>
              )}

              {(isAdmin || informacionGeneral === "SI") && (
                <>
                  <MenuItem
                    active={active.informacion}
                    onClick={() => {
                      setactive({
                        informacion: true,
                        personalactivo: false,
                        personalinactivo: false,
                        productos: false,
                        proveedoresactivos: false,
                        proveedoresinactivos: false,
                        categorias: false,
                        clientesactivos: false,
                        clientesinactivos: false,
                        establecimientos: false,
                        entregas: false,
                        rutas: false,
                        cuenta: false,
                        home: false,
                        rol: false,
                        rutero: false,
                        gastos: false,
                        conciliacion: false,
                      });
                    }}
                    icon={<i className="fa fa-chart-pie"></i>}
                  >
                    Información general
                    <Link to="/dashboard" />
                  </MenuItem>
                </>
              )}
            </Menu>
          </SidebarContent>
        </div>
      </ProSidebar>
    </>
  );
};
