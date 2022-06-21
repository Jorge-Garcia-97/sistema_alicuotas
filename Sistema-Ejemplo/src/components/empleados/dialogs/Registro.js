import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { toast, ToastContainer } from "react-toastify";
import {
  validadorIdentidades,
  validarExistencia,
} from "../../validaciones/validaciones";
import { saveEmpleado } from "../../webServices/Post";

export const Registro = (props) => {
  const { stateChanger, roles, idEmpresa, saveModal, setSaveModal } = props;

  let defaultPersonal = {
    codigo: "",
    nombre: "",
    apellido: "",
    cedula: "",
    direccion: "",
    telefono: "",
    correo: "",
    genero: "",
    date: new Date(),
    rol: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultPersonal });
  const generos = [{ name: "MASCULINO" }, { name: "FEMENINO" }];

  const guardarRegistro = async (data) => {
    try {
      const response = await saveEmpleado(data);
      if (response) {
        hideDialog();
        toast.success("Registro exitoso.");
        stateChanger(true);
      } else {
        toast.error("Ups! algo ha salido mal. Intente nuevamente. ");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const onSubmit = (data) => {
    if (
      data.date === undefined ||
      data.rol === undefined ||
      data.genero === undefined
    ) {
      toast.error("Debe ingresar todos los campos del formulario");
    } else {
      if (validadorIdentidades(data.cedula)) {
        validarExistencia(data.cedula, idEmpresa, "cedula").then((res) => {
          if (res) {
            toast.error("Cédula en uso. Verifique los datos ingresados.");
          } else {
            data.id_empresa = idEmpresa;
            guardarRegistro(data);
          }
        });
      } else {
        toast.error("Cédula ingresada no es válida. Verifique los datos ingresados.");
      }
    }
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const hideDialog = () => {
    setSaveModal(false);
    reset();
  };

  const saveDialogFooter = (
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
      {/* Modal para guardar la información del personal */}
      <Dialog
        visible={saveModal}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Registrar información"
        modal
        footer={saveDialogFooter}
        onHide={hideDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                <span className="p-input-icon-left">
                  <i className="fa fa-id-badge" />
                  <Controller
                    name="codigo"
                    control={control}
                    rules={{
                      required: "Código es requerido",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: EM-002"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("codigo")}
              </div>
              <div className="ps-1 w-100">
                <label
                  htmlFor="cedula"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Cédula:{" "}
                </label>
                <span className="p-float-label p-input-icon-left">
                  <i className="fa fa-id-card" />
                  <Controller
                    name="cedula"
                    control={control}
                    rules={{
                      required: "Número de cédula es requerido",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        keyfilter={"num"}
                        placeholder={"Ej: 1710034065"}
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("cedula")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Nombres:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-user" />
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: "Nombre es requerido",
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                        message: "Debe ingresar solo caracteres alfabéticos",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Pedro"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("nombre")}
              </div>
              <div className="ps-1 w-100 mt-2">
                <label
                  htmlFor="apellido"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Apellidos:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-user" />
                  <Controller
                    name="apellido"
                    control={control}
                    rules={{
                      required: "Apellido es requerido",
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                        message: "Debe ingresar solo caracteres alfabéticos",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Castillo"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("apellido")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="telefono"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Teléfono:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-phone-square-alt" />
                  <Controller
                    name="telefono"
                    control={control}
                    rules={{
                      required: "Número de teléfono es requerido",
                      pattern: {
                        value: /^[0]{1}[2-9]{1}[0-9]{7,8}$/,
                        message: "Dato no es válido. Verifique Ej: 0999878985",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        keyfilter={"num"}
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: 0999878985"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("telefono")}
              </div>
              <div className="ps-1 w-100 mt-2">
                <label
                  htmlFor="correo"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Correo:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-envelope" />
                  <Controller
                    name="correo"
                    control={control}
                    rules={{
                      required: "Dirección de correo es requerida",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message:
                          "Dato no es válido. Verifique Ej: example@email.com",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: example@email.com"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("correo")}
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
                <span className="p-input-icon-left">
                  <i className="fa fa-map" />
                  <Controller
                    name="direccion"
                    control={control}
                    rules={{
                      required: "Dirección es requerida",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Santo Domingo EC-210202"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("direccion")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="date"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  F. Nacimiento:{" "}
                </label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Calendar
                      id={field.name}
                      value={field.value}
                      showIcon
                      placeholder="Fecha Nacimiento"
                      onChange={(e) => field.onChange(e.value)}
                      dateFormat="yy-mm-dd"
                      monthNavigator
                      yearNavigator
                      yearRange="1950:2003"
                      monthNavigatorTemplate={monthNavigatorTemplate}
                      yearNavigatorTemplate={yearNavigatorTemplate}
                    />
                  )}
                />
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="genero"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Género:{" "}
                </label>
                <Controller
                  name="genero"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={generos}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Seleccione un género"
                    />
                  )}
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
                <Controller
                  name="rol"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={roles}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="nombre_rol"
                      optionValue="id_rol"
                      placeholder="Seleccione un rol"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              className="mt-4 w-25"
              label="Guardar"
              icon="pi pi-check"
              autoFocus
              type="submit"
            />
          </div>
        </form>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
