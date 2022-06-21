import React from "react";

export const Tab1 = (props) => {
  const {
    ruc_empresa,
    nombre_empresa,
    actividad_empresa,
    ciudad_empresa,
    telefono_empresa,
    correo_empresa,
    roles,
    empleados,
    productos,
    proveedores,
    establecimientos,
    clientes,
    usuarios,
    categorias,
    pedidos,
    imgName
  } = props;
  return (
    <>
      <div className="container">
        <div className="row">
          <h6>Información General</h6>
          <hr />
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
            <div className="row">
              <div className="col-3 py-2 fw-bold">
                <p>
                  <i className="fa fa-id-badge me-2" />
                  RUC:
                </p>
                <p>
                  <i className="fa fa-tag me-2" />
                  Nombre comercial:
                </p>
                <p>
                  <i className="fa fa-chart-line me-2" />
                  Actividad comercial:
                </p>
                <p>
                  <i className="fa fa-map me-2" />
                  Ciudad o locación:
                </p>
                <p>
                  <i className="fa fa-phone-square-alt me-2" />
                  Teléfono:
                </p>
                <p>
                  <i className="fa fa-envelope me-2" />
                  Correo:
                </p>
              </div>
              <div className="col-9 py-2">
                <p className="border-bottom">{ruc_empresa}</p>
                <p className="border-bottom">{nombre_empresa}</p>
                <p className="border-bottom">{actividad_empresa}</p>
                <p className="border-bottom">{ciudad_empresa}</p>
                <p className="border-bottom">{telefono_empresa}</p>
                <p className="border-bottom">{correo_empresa}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className="row h-100 align-items-center">
              <img
                src={"http://3.134.76.83:5001/" + imgName}
                alt={"logo_empresa"}
                style={{ width: "200px" }}
                className="d-block mx-auto"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <h6>Información de la Organización</h6>
          <hr />
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-6 py-2 fw-bold">
                <p>
                  <i className="fa fa-user-cog me-2" />
                  Roles generados:
                </p>
                <p>
                  <i className="fa fa-user-tie me-2" />
                  Miembros del personal:
                </p>
                <p>
                  <i className="fa fa-box me-2" />
                  Productos:
                </p>
                <p>
                  <i className="fa fa-th-large me-2" />
                  Categorías:
                </p>
                <p>
                  <i className="fa fa-parachute-box me-2" />
                  Proveedores:
                </p>
              </div>
              <div className="col-6 py-2">
                <p className="border-bottom">{roles.length}</p>
                <p className="border-bottom">{empleados.length}</p>
                <p className="border-bottom">{productos.length}</p>
                <p className="border-bottom">{categorias.length}</p>
                <p className="border-bottom">{proveedores.length}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-6 py-2 fw-bold">
                <p>
                  <i className="fa fa-users me-2" />
                  Clientes registrados:
                </p>
                <p>
                  <i className="fa fa-store me-2" />
                  Establecimientos registrados:
                </p>
                <p>
                  <i className="fa fa-shipping-fast me-2" />
                  Pedidos concretados:
                </p>
                <p>
                  <i className="fa fa-user-circle me-2" />
                  Usuarios generados:
                </p>
              </div>
              <div className="col-6 py-2">
                <p className="border-bottom">{clientes.length}</p>
                <p className="border-bottom">{establecimientos.length}</p>
                <p className="border-bottom">{pedidos.length}</p>
                <p className="border-bottom">{usuarios.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
