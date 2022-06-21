import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { editEstadoEmpleado } from "../../webServices/Post";

export const Reactivar = (props) => {
  const { stateChanger, editModal, setEditModal, id_empleado } = props;

  const actualizarRegistro = async () => {
    try {
      const response = await editEstadoEmpleado(id_empleado, "ACTIVO");
      if (response) {
        hideDialog();
        stateChanger(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hideDialog = () => {
    setEditModal(false);
  };

  const editDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        autoFocus
        className="p-button-outlined p-button-success"
        onClick={actualizarRegistro}
      />
    </>
  );

  return (
    <>
      {/* Dialog para confirmar la reactivación del usuario */}
      <Dialog
        header="Confirmación"
        visible={editModal}
        style={{ width: "30vw" }}
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="container">
          <div className="row d-flex h-100">
            <div className="col-sm-2 justify-content-center align-self-center">
              <i
                className="pi pi-exclamation-triangle"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <div className="col-sm-10 justify-content-center align-self-center pt-2">
              <p>¿Está seguro que desea activar nuevamente este usuario?</p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
