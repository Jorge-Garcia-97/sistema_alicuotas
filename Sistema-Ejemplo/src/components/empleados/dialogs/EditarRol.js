import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { editERol } from "../../webServices/Post";
import { validarLetras } from "../../validaciones/validaciones";
import { toast, ToastContainer } from "react-toastify";

export const EditarRol = (props) => {
  const {
    stateChanger,
    editModal,
    setEditModal,
    nombre_rol,
    id_rol,
    descripcion_rol,
  } = props;

  const [rol, setrol] = useState({
    id_rol: "",
    nombre_rol: "",
    descripcion_rol: ""
  });

  useEffect(() => {
    setrol({
      id_rol: id_rol,
      nombre_rol: nombre_rol,
      descripcion_rol: descripcion_rol
    })
  }, [editModal])

  const actualizarRegistro = async () => {
    try {
      const response = await editERol(rol.id_rol, rol);
      if (response) {
        hideDialog();
        stateChanger(true);
        toast.success("Actualización exitosa.");
      } else {
        toast.error("Error al actualizar el registro seleccionado");
      }
    } catch (error) {
      toast.error(
        "Se ha producido un error. Comuníquese con el proveedor del servicio."
      );
    }
  };

  const onInputChange = (e, name) => {
    if (e.target.value !== "") {
      if (name === "nombre" || name === "descripcion") {
        let _rol = { ...rol };
        if (validarLetras(e.target.value)) {
          const val = e.target && e.target.value;
          _rol[`${name}_rol`] = val;
          setrol(_rol);
        } else {
          toast.warning(
            "Nombre y descripción deben contener solo caracteres alfabéticos."
          );
        }
      }
    } else {
      toast.error("Es obligatorio llenar todos los campos.");
    }
  };

  const hideDialog = () => {
    setEditModal(false);
  };

  const editDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
      />
    </>
  );

  return (
    <>
      {/* Modal para editar la información de la rol */}
      <Dialog
        visible={editModal}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Actualizar información"
        modal
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="container-fluid px-4 align-items-center justify-content-center">
          <div className="d-sm-flex">
            <div className="w-100">
              <label
                htmlFor="nombre"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Nombre:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-tag" />
                <InputText
                  id="nombre"
                  type="text"
                  autoFocus
                  value={rol.nombre_rol}
                  onChange={(e) => onInputChange(e, "nombre")}
                  required
                  className="w-100"
                />
              </span>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="w-100 mt-2">
              <label
                htmlFor="descripcion"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Descripción:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-tags" />
                <InputText
                  id="descripcion"
                  type="text"
                  autoFocus
                  value={rol.descripcion_rol}
                  onChange={(e) => onInputChange(e, "descripcion")}
                  required
                  className="w-100"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            className="mt-3 w-25"
            label="Actualizar"
            icon="pi pi-check"
            autoFocus
            onClick={actualizarRegistro}
          />
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
