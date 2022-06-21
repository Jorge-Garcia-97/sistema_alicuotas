import React, { useState } from "react";
import "./Login.css";
import logo from "../../img/logo_white.png";
import sag from "../../img/SAG.png";
import { useDispatch } from "react-redux";
import { autenticacion } from "../../reducer/auth";
import { ToastContainer } from "react-toastify";

export const Login = () => {
  const [state, setstate] = useState({ correo: "", password: "" });
  const dispatch = useDispatch();

  function inicioSesion(event) {
    event.preventDefault();
    dispatch(autenticacion(state.correo, state.password));
  }

  function handleInput(event, name) {
    if (name === "correo") {
      setstate({ ...state, correo: event.target.value });
    }
    if (name === "password") {
      setstate({ ...state, password: event.target.value });
    }
  }

  return (
    <>
      <div className="h-100 gradient-form ">
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col col-xl-10">
              <div className="card shadow-lg" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-sm-12 col-md-12 col-lg-6 text center p-2">
                    <div className="card-body p-md-5 mx-md-3">
                      <div className="text-center">
                        <img
                          src={sag}
                          style={{ width: "250px" }}
                          alt="logo"
                          className="mb-4"
                        />
                        <h4 className="mt-1 mb-3 pb-1">
                          Sistema de Administración & Gestión
                        </h4>
                      </div>
                      <form method="post" onSubmit={inicioSesion}>
                        <p>Ingresa tus credenciales</p>
                        <div className="form-floating mb-4">
                          <input
                            type="email"
                            id="correo"
                            className="form-control"
                            placeholder="usuario@dominio.com"
                            required
                            value={state.correo}
                            onChange={(e) => handleInput(e, "correo")}
                          />
                          <label
                            className="form-floating w-100"
                            htmlFor="correo"
                          >
                            Correo
                          </label>
                        </div>
                        <div className="form-floating mb-4">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Contraseña"
                            required
                            onChange={(e) => handleInput(e, "password")}
                          />
                          <label className="form-floating" htmlFor="password">
                            Contraseña
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-4 pb-1">
                          <input
                            className="btn btn-outline-primary py-2 px-3"
                            type="submit"
                            value="Iniciar sesión"
                          ></input>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="col-sm-12 col-md-12 col-lg-6 d-flex align-items-center gradient"
                    style={{ borderRadius: "0rem 1rem 1rem 0rem" }}
                  >
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <img
                        src={logo}
                        style={{ width: "150px" }}
                        alt="logo"
                        className="mb-4 d-block mx-auto"
                      />
                      <p className="mb-0">
                        Un sistema de administración y gestión de recursos
                        empresariales enfocado en aquellas empresas relacionadas
                        a la venta y distribución de productos varios. Podrás
                        gestionar todo lo relacionado a personal, productos,
                        proveedores, pedidos, entregas y caja.
                      </p>
                      <hr />
                      <div className="text-center">
                        <p style={{ fontSize: 30 }}>
                          <i className="fa fa-users"></i>
                          <i className="fa fa-box-open ms-3"></i>
                          <i className="fa fa-user-tie ms-3"></i>
                          <i className="fa fa-store ms-3"></i>
                          <i className="fa fa-shipping-fast ms-3"></i>
                          <i className="fa fa-hand-holding-usd ms-3"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  );
};
