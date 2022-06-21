import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { editEstadoRol } from "../../webServices/Post";

export const EliminarRol = (props) => {
  const { deleteModal, setDeleteModal, stateChanger, id_rol, nombre_rol } =
    props;

  const borrarRegistro = async () => {
    try {
      const response = await editEstadoRol(id_rol, "INACTIVO");
      if (response) {
        toast.success("Registro eliminado");
        stateChanger(true);
        hideDialog();
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
            ¿Estás seguro de querer eliminar el registro del rol{" "}
            <strong className="text-warning">{nombre_rol}</strong>?
            <br />
            <em className="text-danger">
              Tenga en cuenta que esta acción borrará a todos los miembros del
              personal que estén bajo este rol
            </em>
          </span>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
