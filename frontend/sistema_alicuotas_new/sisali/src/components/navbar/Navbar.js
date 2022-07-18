import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../reducer/auth';

export const Navbar = () => {
  const { nombre, apellido } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const cerrarSesion = () => {
    dispatch(logout());
    // localStorage.clear;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ps-2 pe-5">
        <div className="container-fluid">
          <div className="collapse navbar-collapse d-flex justify-content-between">
            <div className='text-white'>
              <h4>Sistema de Alicuotas</h4>
            </div>
            <div>
              <form className="d-flex">
                <input
                  className="form-control bg-transparent text-white me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-light" type="submit">
                  Search
                </button>
              </form>
            </div>
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to={`/`}>
                    <i className="fa fa-bell me-2" />
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
                    {nombre + " " + apellido}
                  </Link>
                  <ul
                    className="dropdown-menu shadow"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/">
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
          </div>
        </div>
      </nav>
    </>
  );
};
