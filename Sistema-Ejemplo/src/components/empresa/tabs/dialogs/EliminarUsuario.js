import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { deleteUsuario } from "../../../webServices/Post";

export const EliminarUsuario = (props) => {
  const {
    stateChanger,
    deleteModal,
    setDeleteModal,
    correo_empleado,
    id_usuario,
  } = props;

  const borrarRegistro = async () => {
    const response = await deleteUsuario(id_usuario);
    if (response) {
      stateChanger(true);
      hideDialog();
    } else {
      toast.error("Ups! Algo ha salido mal. Intente nuevamente");
    }
  };

  const hideDialog = () => {
    setDeleteModal(false);
  };

  const deleteDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
      />
      <Button
        label="Borrar"
        icon="pi pi-trash"
        autoFocus
        className="p-button-outlined p-button-danger"
        onClick={borrarRegistro}
      />
    </>
  );

  return (
    <>
      {/* Diálodo para eliminar el registro */}
      <Dialog
        visible={deleteModal}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDialogFooter}
        onHide={hideDialog}
      >
        <div className="confirmation-content text-center">
          <i
            className="pi pi-exclamation-triangle p-mr-3 text-danger"
            style={{ fontSize: "2rem" }}
          />
          <br />
          <span>
            ¿Estás seguro de querer eliminar el registro de {correo_empleado}?
          </span>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
