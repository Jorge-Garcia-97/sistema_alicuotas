import React from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { toast, ToastContainer } from "react-toastify";
import { saveRol } from "../../webServices/Post";

export const RegistrarRol = (props) => {
  const { stateChanger, idEmpresa, saveModal, setSaveModal } = props;
  const opciones = [{ name: "SI" }, { name: "NO" }];
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const guardarRegistro = async (data) => {
    try {
      const response = await saveRol(data);
      if (response) {
        hideDialog();
        stateChanger(true);
        toast.success("Registro exitoso");
      } else {
        toast.error("Error al guardar");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const onSubmit = (data) => {
    if (data.gestion_empleados == undefined || data.gestion_productos == undefined || data.gestion_clientes == undefined || data.gestion_pedidos == undefined || data.gestion_rutas == undefined || data.gestion_caja == undefined || data.informacion_general == undefined ) {
      toast.warning("Debe ingresar todos los campos del formulario");
    } else {
      let aux = data.nombre;
      data.nombre = aux.toUpperCase();
      data.id_empresa = idEmpresa;
      data.estado = "ACTIVO";
      guardarRegistro(data);
    }
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const hideDialog = () => {
    reset();
    setSaveModal(false);
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

  return (
    <>
      <Dialog
        visible={saveModal}
        style={{ width: "60vw" }}
        breakpoints={{ "960px": "60vw", "640px": "100vw" }}
        header="Registrar información sobre un nuevo Rol"
        footer={saveDialogFooter}
        onHide={hideDialog}
        modal
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="container-fluid px-4 align-items-center justify-content-center">
            <div className="d-sm-flex w-100 justify-content-center mb-2 border-bottom border-top border-primary">
              <h6 className="mt-1">
                Datos Generales
              </h6>
            </div>
            <div className="d-sm-flex">
              <div className="w-100">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Nombre de Referencia:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-tag" />
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: "Nombre de referencia es requerido",
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]$/,
                        message: "Debe ingresar solo caracteres alfabéticos",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: VENTAS"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("nombre")}
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
                <span className="p-input-icon-left">
                  <i className="fa fa-tags" />
                  <Controller
                    name="descripcion"
                    control={control}
                    rules={{
                      required: "Descripción es requerida",
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+[.]*$/,
                        message: "Debe ingresar solo caracteres alfabéticos",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Destinado a los miembros del personal dedicados a la venta."
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("descripcion")}
              </div>
            </div>
            <div className="d-sm-flex w-100 justify-content-center mt-3 border-bottom border-top border-primary">
              <h6 className="mt-1">
                ¿Qué permisos tendrá sobre los módulos del sistema?
              </h6>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="gestion_empleados"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Gestión de Empleados:{" "}
                </label>
                <Controller
                  name="gestion_empleados"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={opciones}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Seleccione"
                    />
                  )}
                />
              </div>
              <div className="w-100 mt-2 px-1">
                <label
                  htmlFor="gestion_productos"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Gestión de Productos:{" "}
                </label>
                <Controller
                  name="gestion_productos"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={opciones}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Seleccione"
                    />
                  )}
                />
              </div>
              <div className="w-100 mt-2">
                <label
                  htmlFor="gestion_clientes"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Gestión de Clientes:{" "}
                </label>
                <Controller
                  name="gestion_clientes"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={opciones}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Seleccione"
                    />
                  )}
                />
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="gestion_pedidos"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Gestión de Pedidos:{" "}
                </label>
                <Controller
                  name="gestion_pedidos"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={opciones}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Seleccione"
                    />
                  )}
                />
              </div>
              <div className="w-100 mt-2 px-1">
                <label
                  htmlFor="gestion_rutas"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Gestión de Rutas:{" "}
                </label>
                <Controller
                  name="gestion_rutas"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={opciones}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Seleccione"
                    />
                  )}
                />
              </div>
              <div className="w-100 mt-2">
                <label
                  htmlFor="gestion_caja"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Rutero & Conciliacion:{" "}
                </label>
                <Controller
                  name="gestion_caja"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={opciones}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Seleccione"
                    />
                  )}
                />
              </div>
            </div>
            <div className="d-sm-flex justify-content-center">
              <div className="mt-2 w-50">
                <label
                  htmlFor="informacion_general"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Información General:
                </label>
                <Controller
                  name="informacion_general"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={opciones}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="name"
                      placeholder="Seleccione"
                      className="w-100"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              className="mt-3 w-25"
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
