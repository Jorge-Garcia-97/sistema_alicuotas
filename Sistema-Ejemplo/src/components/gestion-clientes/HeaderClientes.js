import React from "react";

export const HeaderClientes = (props) => {
  const { clientesactivos } = props;
  const { establecimientos } = props;

  return (
    <>
      <div>
        <div className="row ms-0 me-0 mt-1">
          <div className="col-lg-6 col-md-12 col-sm-12 px-0">
            <div className="card w-100 h-100 shadow-sm rounded">
              <div className="card-body p-m-0 w-100 h-100">
                <div className="text-center">
                  <h2 className="card-title mb-1">
                    {clientesactivos.length}
                    <i
                      className="fa fa-users ms-2"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </h2>
                </div>
                <div className="text-center py-1">
                  <h5 className="card-text">Clientes Activos</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 ps-1 pe-0">
            <div className="card w-100 h-100 shadow-sm rounded">
              <div className="card-body p-m-0 w-100 h-100">
                <div className="text-center">
                  <h2 className="card-title mb-1">
                    {establecimientos.length}
                    <i
                      className="fa fa-store ms-2"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </h2>
                </div>
                <div className="text-center py-1">
                  <h5 className="card-text">Establecimientos</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
