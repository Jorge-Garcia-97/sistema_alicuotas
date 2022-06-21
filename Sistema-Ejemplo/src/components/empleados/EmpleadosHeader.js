import React from "react";

export const EmpleadosHeader = (props) => {
  const { activos } = props;
  const { inactivos } = props;
  const { roles } = props;

  return (
    <>
      <div>
        <div className="row ms-0 me-0 mt-1">
          <div className="col-lg-4 col-md-12 col-sm-12 px-0">
            <div className="card w-100 h-100 shadow-sm rounded">
              <div className="card-body">
                <div className="text-center">
                  <h2 className="card-title mb-1">
                    {activos.length}
                    <i
                      className="fa fa-user-tie ms-2"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </h2>
                </div>
                <div className="text-center py-1">
                  <h5 className="card-text">Miembros del Personal Activos</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 ps-1 pe-1">
            <div className="card w-100 h-100 shadow-sm rounded">
              <div className="card-body p-m-0 w-100 h-100">
                <div className="text-center">
                  <h2 className="card-title mb-1">
                    {inactivos.length}
                    <i
                      className="fa fa-user-slash ms-2"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </h2>
                </div>
                <div className="text-center py-1">
                  <h5 className="card-text">Personal Dado de Baja</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-0">
            <div className="card w-100 h-100 shadow-sm rounded">
              <div className="card-body p-m-0 w-100 h-100">
                <div className="text-center">
                <h2 className="card-title mb-1">
                    {roles.length}
                    <i
                      className="fa fa-th-large ms-2"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </h2>
                </div>
                <div className="text-center py-1">
                  <h5 className="card-text">Roles en la Empresa</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
