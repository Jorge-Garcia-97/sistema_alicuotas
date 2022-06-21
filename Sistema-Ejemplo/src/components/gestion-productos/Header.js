import React from "react";

export const Header = (props) => {
  const { productos } = props;
  const { categorias } = props;
  const { proveedores } = props;

  return (
    <>
      <div>
        <div className="row ms-0 me-0 mt-1">
          <div className="col-lg-4 col-md-12 col-sm-12 px-0">
            <div className="card w-100 h-100 shadow-sm rounded">
              <div className="card-body">
                <div className="text-center">
                  <h2 className="card-title mb-1">
                    {productos.length}
                    <i
                      className="fa fa-box ms-2"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </h2>
                </div>
                <div className="text-center py-1">
                  <h5 className="card-text">Productos</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 ps-1 pe-1">
            <div className="card w-100 h-100 shadow-sm rounded">
              <div className="card-body p-m-0 w-100 h-100">
                <div className="text-center">
                  <h2 className="card-title mb-1">
                    {proveedores.length}
                    <i
                      className="fa fa-parachute-box ms-2"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </h2>
                </div>
                <div className="text-center py-1">
                  <h5 className="card-text">Proveedores</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-0">
            <div className="card w-100 h-100 shadow-sm rounded">
              <div className="card-body p-m-0 w-100 h-100">
                <div className="text-center">
                <h2 className="card-title mb-1">
                    {categorias.length}
                    <i
                      className="fa fa-th-large ms-2"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </h2>
                </div>
                <div className="text-center py-1">
                  <h5 className="card-text">Categorías</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
