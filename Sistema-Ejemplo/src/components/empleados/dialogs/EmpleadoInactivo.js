import React from "react";

export const EmpleadoInactivo = (props) => {
    const{ viewModal, setViewModal}

    const hideDialog = () => {
        setViewModal(false);
      };

    const viewDialogFooter = (
        <>
          <Button
            label="Cerrar"
            icon="pi pi-times"
            autoFocus
            className="p-button-outlined p-button-secondary"
            onClick={hideDialog}
          />
        </>
      );
    
      const viewDialogHeader = (
        <>
          <div>
            <h5>
              Información de {personal.nombre_empleado} {personal.apellido_empleado}
            </h5>
          </div>
        </>
      );

    

  return (
    <>
      {/* Modal para ver la información del personal */}
      <Dialog
        visible={viewModal}
        style={{ width: "35vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header={viewDialogHeader}
        modal
        footer={viewDialogFooter}
        onHide={hideDialog}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm">
              <p>
                <i className="fa fa-id-badge align-middle"></i>
                <strong className="align-middle"> Código: </strong>
                <span className="align-middle">{personal.codigo_empleado}</span>
              </p>
            </div>
            <div className="col-sm">
              <p>
                <i className="fa fa-id-card align-middle"></i>
                <strong className="align-middle"> Cédula: </strong>
                <span className="align-middle">{personal.cedula_empleado}</span>
              </p>
            </div>
          </div>
          <p>
            <i className="fa fa-user align-middle"></i>
            <strong className="align-middle"> Nombres: </strong>
            <span className="align-middle">{personal.nombre_empleado}</span>
          </p>
          <p>
            <i className="fa fa-user align-middle"></i>
            <strong className="align-middle"> Apellidos: </strong>
            <span className="align-middle">{personal.apellido_empleado}</span>
          </p>
          <div className="row">
            <div className="col-sm">
              <p>
                <i className="fa fa-phone-square-alt align-middle"></i>
                <strong className="align-middle"> Teléfono: </strong>
                <span className="align-middle">
                  {personal.telefono_empleado}
                </span>
              </p>
            </div>
            <div className="col-sm">
              <p>
                <i className="fa fa-calendar-alt align-middle"></i>
                <strong className="align-middle"> Nacimiento: </strong>
                <span className="align-middle">
                  {moment(personal.fecha_nacimiento_empleado).format(
                    "YYYY-MM-DD"
                  )}
                </span>
              </p>
            </div>
          </div>
          <p>
            <i className="fa fa-envelope align-middle"></i>
            <strong className="align-middle"> Correo: </strong>
            <span className="align-middle">{personal.correo_empleado}</span>
          </p>
          <p>
            <i className="fa fa-map align-middle"></i>
            <strong className="align-middle"> Dirección: </strong>
            <span className="align-middle">{personal.direccion_empleado}</span>
          </p>
          <div className="row">
            <div className="col-sm">
              <p>
                <i className="fa fa-th-large align-middle"></i>
                <strong className="align-middle"> Rol: </strong>
                <span className="align-middle">{personal.nombre_rol}</span>
              </p>
            </div>
            <div className="col-sm">
              <p>
                <i className="fa fa-birthday-cake align-middle"></i>
                <strong className="align-middle"> Edad: </strong>
                <span className="align-middle">
                  {moment().diff(personal.fecha_nacimiento_empleado, "years")}{" "}
                  años
                </span>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p>
                <i className="fa fa-venus-mars align-middle"></i>
                <strong className="align-middle"> Género: </strong>
                <span className="align-middle">{personal.genero_empleado}</span>
              </p>
            </div>
            <div className="col">
              <p>
                <i className="fa fa-question-circle align-middle"></i>
                <strong className="align-middle"> Estado: </strong>
                <span className="align-middle">{personal.estado_empleado}</span>
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
