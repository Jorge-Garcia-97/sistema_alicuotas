import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { editEstadoRutero } from "../../../webServices/Post";

export const EliminarRutero = (props) => {
  const { deleteModal, setDeleteModal, stateChanger, id_rutero } = props;
  const borrarRegistro = async () => {
    try {
      const response = await editEstadoRutero(id_rutero, "INACTIVO");
      if (response) {
        hideDialog();
        toast.success("Registro eliminado");
        stateChanger(true);
      } else {
        toast.error("Ups! Algo ha salido mal");
      }
    } catch (error) {
      toast.error(error);
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
            ¿Estás seguro de querer eliminar el registro de este rutero?
          </span>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
