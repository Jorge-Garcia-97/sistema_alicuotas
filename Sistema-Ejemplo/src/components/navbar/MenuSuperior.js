import React from "react";
import { Link } from "react-router-dom";
import "./estiloNavbar.css";
import logo from "../../img/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../reducer/auth";
import { limpiarContext } from "../../reducer/datosContext";

export const MenuSuperior = (props) => {
  const { nombreUsuario, apellidoUsuario, nombreEmpresa, limpiar} = props;
  const dispatch = useDispatch();

  const cerrarSesion = () => {
    dispatch(limpiarContext());
    dispatch(logout());
    localStorage.clear;
    limpiar();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark gradient">
        <Link className="navbar-brand logotipo" to="/">
          <img
            className="d-inline-block align-top ms-3"
            src={logo}
            alt="Logotipo"
          />
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav me-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={`/empresa`}>
                <i className="fa fa-briefcase me-2" />
                {nombreEmpresa}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle active"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="/"
              >
                <i className="fa fa-user-circle me-2" />
                {nombreUsuario + " " + apellidoUsuario}
              </Link>
              <ul
                className="dropdown-menu shadow"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/cuenta">
                    <i className="fa fa-user-circle me-1" />
                    Cuenta
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" onClick={cerrarSesion} to="/">
                    <i className="fa fa-sign-out-alt me-1" />
                    Cerrar sesión
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
