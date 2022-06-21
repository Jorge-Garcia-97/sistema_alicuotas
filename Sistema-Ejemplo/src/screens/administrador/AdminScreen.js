import React, { useState } from "react";
import { EmpleadoChart } from "../../components/empleados/EmpleadoChart";
import { EmpleadosMain } from "../../components/empleados/EmpleadosMain";
import { ScrollPanel } from "primereact/scrollpanel";
import logo from "../../img/logo_white.png";
import "./estiloAdmin.css";
import { classNames } from "primereact/utils";
import { ProductosMain } from "../../components/productos/ProductosMain";

export const AdminScreen = () => {
  const [state, setstate] = useState({
    informacion: "",
    activeHome: true,
    activePersonal: false,
    activeClientes: false,
    activeProductos: false,
    activePedidos: false,
    activeRoutes: false,
    activeCaja: false,
  });
  const {
    activeHome,
    activePersonal,
    activeProductos,
    activeClientes,
    activePedidos,
    activeRoutes,
    activeCaja,
    informacion,
  } = state;

  function RenderGraficas() {
    return (
      <>
        <div className="ms-3 bg-white shadow-sm bg-body rounded">
          <div className="mx-2">
            <div className="row justify-content-center">
              <div className="col-sm-6 px-0 border-end border-4">
                <div>
                  <EmpleadoChart />
                </div>
              </div>
              <div className="col-sm-6 px-0 border-start border-4">
                <div>
                  <EmpleadoChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function RenderEmpleados() {
    return (
      <>
        <div className="ms-2">
          <div className="ms-2">
            <EmpleadosMain />
          </div>
        </div>
      </>
    );
  }

  function RenderProductos() {
    return (
      <>
        <div className="ms-2">
          <div className="ms-2">
            <ProductosMain />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex col-lg-auto col-md-auto col-sm-auto gradient sticky-top justify-content-center">
            <div className="d-sm-flex flex-sm-column flex-sm-row flex-nowrap align-items-center sticky-top text-center">
              <a
                href="/"
                className="pt-3 link-dark text-decoration-none text-white"
                title="inicio"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Icon-only"
              >
                <img src={logo} className="mx-1" style={{ width: 35 }} />
                <h6 className="pt-1">SAG</h6>
              </a>
              <ul className="nav nav-pills nav-flush flex-sm-column flex-sm-row flex-nowrap mx-auto my-auto">
                <div className="flex-sm-col">
                  <li className="nav-item">
                    <a
                      role="button"
                      title="Dashboard"
                      className={classNames(
                        "nav-link pt-3 pb-1",
                        "border-bottom",
                        {
                          active: activeHome,
                        }
                      )}
                      onClick={() =>
                        setstate({
                          informacion: "",
                          activeHome: true,
                          activePersonal: false,
                          activeClientes: false,
                          activeProductos: false,
                          activePedidos: false,
                          activeRoutes: false,
                          activeCaja: false,
                        })
                      }
                    >
                      <i className="fa fa-chart-pie"></i>
                      <h6 className="text-white">Información</h6>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      role="button"
                      title="Gestión del Personal"
                      className={classNames(
                        "nav-link pt-3 pb-1",
                        "border-bottom",
                        {
                          active: activePersonal,
                        }
                      )}
                      onClick={() =>
                        setstate({
                          informacion: "personal",
                          activeHome: false,
                          activePersonal: true,
                          activeClientes: false,
                          activeProductos: false,
                          activePedidos: false,
                          activeRoutes: false,
                          activeCaja: false,
                        })
                      }
                    >
                      <i className="fa fa-user-tie"></i>
                      <h6 className="text-white">Personal</h6>
                    </a>
                  </li>
                </div>
                <div className="flex-sm-col">
                  <li className="nav-item">
                    <a
                      role="button"
                      title="Gestión de Productos"
                      className={classNames(
                        "nav-link pt-3 pb-1",
                        "border-bottom",
                        {
                          active: activeProductos,
                        }
                      )}
                      onClick={() =>
                        setstate({
                          informacion: "productos",
                          activeHome: false,
                          activePersonal: false,
                          activeClientes: false,
                          activeProductos: true,
                          activePedidos: false,
                          activeRoutes: false,
                          activeCaja: false,
                        })
                      }
                    >
                      <i className="fa fa-box-open"></i>
                      <h6 className="text-white">Productos</h6>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      role="button"
                      title="Clientes"
                      className={classNames(
                        "nav-link pt-3 pb-1",
                        "border-bottom",
                        {
                          active: activeClientes,
                        }
                      )}
                      onClick={() =>
                        setstate({
                          informacion: "clientes",
                          activeHome: false,
                          activePersonal: false,
                          activeClientes: true,
                          activeProductos: false,
                          activePedidos: false,
                          activeRoutes: false,
                          activeCaja: false,
                        })
                      }
                    >
                      <i className="fa fa-users"></i>
                      <h6 className="text-white">Clientes</h6>
                    </a>
                  </li>
                </div>
                <div className="flex-sm-col">
                  <li className="nav-item">
                    <a
                      role="button"
                      title="Gestión del Pedidos"
                      className={classNames(
                        "nav-link pt-3 pb-1",
                        "border-bottom",
                        {
                          active: activePedidos,
                        }
                      )}
                      onClick={() =>
                        setstate({
                          informacion: "pedidos",
                          activeHome: false,
                          activePersonal: false,
                          activeClientes: false,
                          activeProductos: false,
                          activePedidos: true,
                          activeRoutes: false,
                          activeCaja: false,
                        })
                      }
                    >
                      <i className="fa fa-shipping-fast"></i>
                      <h6 className="text-white">Pedidos</h6>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      role="button"
                      title="Gestión de rutas"
                      className={classNames(
                        "nav-link pt-3 pb-1",
                        "border-bottom",
                        {
                          active: activeRoutes,
                        }
                      )}
                      onClick={() =>
                        setstate({
                          informacion: "rutas",
                          activeHome: false,
                          activePersonal: false,
                          activeClientes: false,
                          activeProductos: false,
                          activePedidos: false,
                          activeRoutes: true,
                          activeCaja: false,
                        })
                      }
                    >
                      <i className="fa fa-map-marked-alt"></i>
                      <h6 className="text-white">Rutas</h6>
                    </a>
                  </li>
                </div>
                <div className="flex-sm-col">
                  <li className="nav-item">
                    <a
                      role="button"
                      title="Gestión de caja"
                      className={classNames(
                        "nav-link pt-3 pb-1",
                        "border-bottom",
                        {
                          active: activeCaja,
                        }
                      )}
                      onClick={() =>
                        setstate({
                          informacion: "caja",
                          activeHome: false,
                          activePersonal: false,
                          activeClientes: false,
                          activeProductos: false,
                          activePedidos: false,
                          activeRoutes: false,
                          activeCaja: true,
                        })
                      }
                    >
                      <i className="fa fa-hand-holding-usd"></i>
                      <h6 className="text-white">Caja</h6>
                    </a>
                  </li>
                </div>
              </ul>
              <div className="w-100 mb-2 dropdown">
                <a
                  role="button"
                  className="py-3 nav-link text-decoration-none dropdown-toggle text-white border "
                  id="dropdownUser3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="24"
                    height="24"
                    className="rounded-circle mx-1"
                  />
                  Usuario
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownUser3">
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fa fa-cog me-2"></i>
                      Cuenta
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="fa fa-sign-out me-2"></i>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm p-0">
            <div className="scrollpanel-demo">
              <div>
                <div>
                  <ScrollPanel
                    style={{ height: "calc(100vh)" }}
                    className="custombar1 pe-0 me-0"
                  >
                    <div>
                      <div className="bg-white border-bottom pt-2 pb-1 justify-content-center align-items-center shadow-sm bg-body rounded">
                        {informacion === "" && (
                          <h5 className="px-3">
                            Información general
                            <i className="fa fa-info-circle ms-2"></i>
                          </h5>
                        )}
                        {informacion === "personal" && (
                          <h5 className="px-3">
                            Información sobre el personal
                            <i className="fa fa-user-tie ms-2"></i>
                          </h5>
                        )}
                        {informacion === "productos" && (
                          <h5 className="px-3">
                            Gestión de productos
                            <i className="fa fa-box-open ms-2"></i>
                          </h5>
                        )}
                        {informacion === "clientes" && (
                          <h5 className="px-3">
                            Información sobre clientes
                            <i className="fa fa-users ms-2"></i>
                          </h5>
                        )}
                        {informacion === "pedidos" && (
                          <h5 className="px-3">
                            Gestión de pedidos
                            <i className="fa fa-shipping-fast ms-2"></i>
                          </h5>
                        )}
                        {informacion === "rutas" && (
                          <h5 className="px-3">
                            Gestión de rutas
                            <i className="fa fa-map-marked-alt ms-2"></i>
                          </h5>
                        )}
                        {informacion === "caja" && (
                          <h5 className="px-3">
                            Gestión de caja
                            <i className="fa fa-hand-holding-usd ms-2"></i>
                          </h5>
                        )}
                      </div>
                      <div className="mt-2">
                        <div>
                          {informacion === "" && <RenderGraficas />}
                          {informacion === "personal" && <RenderEmpleados />}
                          {informacion === "productos" && <RenderProductos />}
                        </div>
                      </div>
                    </div>
                  </ScrollPanel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
