import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { toast, ToastContainer } from "react-toastify";
import { editEmpleado } from "../../webServices/Post";
import {
  validarTelefonos,
  validarLetras,
  validarCorreo,
} from "../../validaciones/validaciones";
import moment from "moment";

export const Editar = (props) => {
  const {
    editModal,
    setEditModal,
    stateChanger,
    roles,
    id_empleado,
    nombre_empleado,
    apellido_empleado,
    telefono_empleado,
    direccion_empleado,
    correo_empleado,
    codigo_empleado,
    cedula_empleado,
    fecha_nacimiento_empleado,
    genero_empleado,
    rol_id_rol,
  } = props;
  const generos = [{ name: "MASCULINO" }, { name: "FEMENINO" }];
  const [personal, setPersonal] = useState({});

  useEffect(() => {
    setPersonal({
      id_empleado: id_empleado,
      nombre_empleado: nombre_empleado,
      apellido_empleado: apellido_empleado,
      cedula_empleado: cedula_empleado,
      direccion_empleado: direccion_empleado,
      telefono_empleado: telefono_empleado,
      correo_empleado: correo_empleado,
      codigo_empleado: codigo_empleado,
      fecha_nacimiento_empleado: fecha_nacimiento_empleado,
      genero_empleado: genero_empleado,
      rol_id_rol: rol_id_rol,
    });
  }, [editModal]);

  const actualizarRegistro = async () => {
    try {
      const response = await editEmpleado(personal.id_empleado, personal);
      if (response) {
        hideDialog();
        toast.success("Actualización exitosa.");
        stateChanger(true);
      } else {
        toast.error("Error al actualizar el registro seleccionado.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const onInputChange = (e, name) => {
    if (e.target.value !== "") {
      let _personal = { ...personal };
      if (name === "telefono") {
        if (validarTelefonos(e.target.value)) {
          const val = e.target && e.target.value;
          _personal[`${name}_empleado`] = val;
          setPersonal(_personal);
        } else {
          toast.warning("No. teléfono ingresado no es válido.");
        }
      }
      if (name === "nombre" || name === "apellido") {
        if (validarLetras(e.target.value)) {
          const val = e.target && e.target.value;
          _personal[`${name}_empleado`] = val;
          setPersonal(_personal);
        } else {
          toast.warning(
            "Nombres o apellidos deben contener solo caracteres alfabéticos."
          );
        }
      }
      if (name === "correo") {
        if (validarCorreo(e.target.value)) {
          const val = e.target && e.target.value;
          _personal[`${name}_empleado`] = val;
          setPersonal(_personal);
        } else {
          toast.warning("Correo ingresado no tiene una estructura válida.");
        }
      }
      if (name === "direccion") {
        const val = e.target && e.target.value;
        _personal[`${name}_empleado`] = val;
        setPersonal(_personal);
      }
      if (name === "fecha_nacimiento") {
        const val = e.target && e.target.value;
        _personal[`${name}_empleado`] = val;
        setPersonal(_personal);
      }
      if (name === "genero") {
        const val = e.target && e.target.value;
        _personal[`${name}_empleado`] = val;
        setPersonal(_personal);
      }
    } else {
      toast.error("Es obligatorio llenar todos los campos.");
    }
  };

  const onInputChangeRol = (e) => {
    const val = (e.target && e.target.value) || "";
    let _personal = { ...personal };
    _personal[`rol_id_rol`] = val;
    setPersonal(_personal);
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

  const monthNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    );
  };

  const yearNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        className="p-ml-2"
        style={{ lineHeight: 1 }}
      />
    );
  };
  return (
    <>
      {/* Modal para editar la información del personal */}
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
            <div className="pe-1 w-100">
              <label
                htmlFor="codigo"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Código:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-id-badge" />
                <InputText
                  id="codigo"
                  type="text"
                  autoFocus
                  value={personal.codigo_empleado}
                  disabled
                  className="w-100"
                />
              </span>
            </div>
            <div className="ps-1 w-100">
              <label
                htmlFor="cedula"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Cédula:{" "}
              </label>
              <span className="p-float-label p-input-icon-left w-100">
                <i className="fa fa-id-card" />
                <InputText
                  id="cedula"
                  type="text"
                  autoFocus
                  value={personal.cedula_empleado}
                  disabled
                  className="w-100"
                />
              </span>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="w-100 pe-1 mt-2">
              <label
                htmlFor="nombre"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Nombres:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-user" />
                <InputText
                  id="nombre"
                  type="text"
                  autoFocus
                  value={personal.nombre_empleado}
                  onChange={(e) => onInputChange(e, "nombre")}
                  required
                  className="w-100"
                />
              </span>
            </div>
            <div className="ps-1 w-100 mt-2">
              <label
                htmlFor="apellido"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Apellidos:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-user" />
                <InputText
                  id="apellido"
                  type="text"
                  autoFocus
                  value={personal.apellido_empleado}
                  onChange={(e) => onInputChange(e, "apellido")}
                  required
                  className="w-100"
                />
              </span>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="w-100 pe-1 mt-2">
              <label
                htmlFor="telefono"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Teléfono:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-phone-square-alt" />
                <InputText
                  id="telefono"
                  type="text"
                  autoFocus
                  value={personal.telefono_empleado}
                  onChange={(e) => onInputChange(e, "telefono")}
                  required
                  className="w-100"
                />
              </span>
            </div>
            <div className="ps-1 w-100 mt-2">
              <label
                htmlFor="correo"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Correo:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-envelope" />
                <InputText
                  id="correo"
                  type="email"
                  autoFocus
                  value={personal.correo_empleado}
                  onChange={(e) => onInputChange(e, "correo")}
                  required
                  className="w-100"
                />
              </span>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="w-100 mt-2">
              <label
                htmlFor="direccion"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Dirección:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-map" />
                <InputText
                  id="direccion"
                  type="text"
                  autoFocus
                  value={personal.direccion_empleado}
                  onChange={(e) => onInputChange(e, "direccion")}
                  required
                  className="w-100"
                />
              </span>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="w-100 mt-2">
              <label
                htmlFor="date"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Fecha de Nacimiento:{" "}
              </label>
              <Calendar
                id="date"
                value={moment(personal.fecha_nacimiento_empleado).format()}
                placeholder={moment(personal.fecha_nacimiento_empleado).format(
                  "YYYY-MM-DD"
                )}
                showIcon
                hourFormat="24"
                onChange={(e) => onInputChange(e, "fecha_nacimiento")}
                dateFormat="yy-mm-dd"
                monthNavigator
                yearNavigator
                yearRange="1950:2003"
                monthNavigatorTemplate={monthNavigatorTemplate}
                yearNavigatorTemplate={yearNavigatorTemplate}
                className="w-100"
              />
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="w-100 pe-1 mt-2">
              <label
                htmlFor="genero"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Género:{" "}
              </label>
              <Dropdown
                id="genero"
                value={personal.genero_empleado}
                options={generos}
                onChange={(e) => onInputChange(e, "genero")}
                optionLabel="name"
                optionValue="name"
                className="w-100"
              />
            </div>
            <div className="ps-1 w-100 mt-2">
              <label
                htmlFor="rol"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Rol:{" "}
              </label>
              <Dropdown
                id="rol"
                value={personal.rol_id_rol}
                options={roles}
                onChange={(e) => onInputChangeRol(e)}
                optionLabel="nombre_rol"
                optionValue="id_rol"
                className="w-100"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            className="mt-4 w-25"
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
