import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Style.css";
import logo from "../../img/logo.png";

export const MenuOpciones = () => {
  const { nombre } = useSelector((state) => state.auth);
  const { apellido } = useSelector((state) => state.auth);
  const { isAdmin } = useSelector((state) => state.auth);
  const {
    gestionEmpleados,
    gestionProductos,
    gestionClientes,
    gestionPedidos,
    gestionRutas,
    gestionCaja,
    informacionGeneral,
  } = useSelector((state) => state.data);
  return (
    <>
      <div className="mx-0 px-1 pt-3 w-100 h-100">
        <div className="container-fluid h-100">
          <div className="row h-100 mx-0 px-0 justify-content-center">
            <div className="col-auto w-100 gradient rounded-3 py-5">
              <div className="row px-4">
                <div className="text-center text-white border-bottom">
                  <h2 className="mb-2">
                    <i className="fa fa-user-circle me-2" />
                    Bienvenido {nombre + " " + apellido}
                  </h2>
                  <h5 className="mb-2 fst-italic">¿Qué deseas hacer?</h5>
                  <p className="mb-3">
                    Puede escoger entre las siguientes opciones, o si prefieres,
                    ir al menú laterla izquierdo para más
                  </p>
                </div>
                {isAdmin && (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card shadow rounded-3 py-2 mt-3">
                      <div className="text-center py-3 rounded-top">
                        <i className="fa fa-briefcase iCard" />
                      </div>
                      <div className="card-body pt-0 text-center">
                        <h5 className="card-title">Gestionar Empresa</h5>
                        <div className="text-center">
                          <Link
                            className="btn btn-outline-primary mt-2 px-4"
                            role="button"
                            to="/empresa"
                          >
                            Ver más
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(isAdmin || gestionEmpleados === "SI") && (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card shadow rounded-3 py-2 mt-3">
                      <div className="text-center py-3 rounded-top">
                        <i className="fa fa-user-tie iCard" />
                      </div>
                      <div className="card-body pt-0 text-center">
                        <h5 className="card-title">Gestionar Personal</h5>
                        <div className="text-center">
                          <Link
                            className="btn btn-outline-primary mt-2 px-4"
                            role="button"
                            to="/personal/activos"
                          >
                            Ver más
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(isAdmin || gestionProductos === "SI") && (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card shadow rounded-3 py-2 mt-3">
                      <div className="text-center py-3 rounded-top">
                        <i className="fa fa-box-open iCard" />
                      </div>
                      <div className="card-body pt-0 text-center">
                        <h5 className="card-title">Gestionar Productos</h5>
                        <div className="text-center">
                          <Link
                            className="btn btn-outline-primary mt-2 px-4"
                            role="button"
                            to="/productos/productos"
                          >
                            Ver más
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(isAdmin || gestionClientes === "SI") && (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card shadow rounded-3 py-2 mt-3">
                      <div className="text-center py-3 rounded-top">
                        <i className="fa fa-hands-helping iCard" />
                      </div>
                      <div className="card-body pt-0 text-center">
                        <h5 className="card-title">Gestionar Clientes</h5>
                        <div className="text-center">
                          <Link
                            className="btn btn-outline-primary mt-2 px-4"
                            role="button"
                            to="/clientes/activos"
                          >
                            Ver más
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(isAdmin || gestionPedidos == "SI") && (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card shadow rounded-3 py-2 mt-3">
                      <div className="text-center py-3 rounded-top">
                        <i className="fa fa-shipping-fast iCard" />
                      </div>
                      <div className="card-body pt-0 text-center">
                        <h5 className="card-title">Gestionar Pedidos</h5>
                        <div className="text-center">
                          <Link
                            className="btn btn-outline-primary mt-2 px-4"
                            role="button"
                            to="/pedidos"
                          >
                            Ver más
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(isAdmin || gestionRutas == "SI") && (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card shadow rounded-3 py-2 mt-3">
                      <div className="text-center py-3 rounded-top">
                        <i className="fa fa-map-marked-alt iCard" />
                      </div>
                      <div className="card-body pt-0 text-center">
                        <h5 className="card-title">Gestionar Rutas</h5>
                        <div className="text-center">
                          <Link
                            className="btn btn-outline-primary mt-2 px-4"
                            role="button"
                            to="/rutas"
                          >
                            Ver más
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(isAdmin || gestionCaja == "SI") && (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card shadow rounded-3 py-2 mt-3">
                      <div className="text-center py-3 rounded-top">
                        <i className="fa fa-hand-holding-usd iCard" />
                      </div>
                      <div className="card-body pt-0 text-center">
                        <h5 className="card-title">Rutero & Conciliación</h5>
                        <div className="text-center">
                          <Link
                            className="btn btn-outline-primary mt-2 px-4"
                            role="button"
                            to="/arqueo/rutero"
                          >
                            Ver más
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(isAdmin || informacionGeneral == "SI") && (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="card shadow rounded-3 py-2 mt-3">
                      <div className="text-center py-3 rounded-top">
                        <i className="fa fa-chart-pie iCard" />
                      </div>
                      <div className="card-body pt-0 text-center">
                        <h5 className="card-title">Información General</h5>
                        <div className="text-center">
                          <Link
                            className="btn btn-outline-primary mt-2 px-4"
                            role="button"
                            to="/dashboard"
                          >
                            Ver más
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
