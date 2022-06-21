import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { editEstadoEmpleado } from "../../webServices/Post";

export const Eliminar = (props) => {
  const {
    deleteModal,
    setDeleteModal,
    stateChanger,
    id_empleado,
    nombre_empleado,
    apellido_empleado,
  } = props;
  const [personal, setPersonal] = useState({});

  useEffect(() => {
      setPersonal({
          id_empleado: id_empleado,
          nombre_empleado: nombre_empleado,
          apellido_empleado: apellido_empleado
      })
      return () => {
          setPersonal({});
      }
  }, [deleteModal])

  const borrarRegistro = async () => {
    try {
      const response = await editEstadoEmpleado(
        personal.id_empleado,
        "INACTIVO"
      );
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
            ¿Estás seguro de querer eliminar el registro de{" "}
            {personal.nombre_empleado} {personal.apellido_empleado}?
          </span>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
