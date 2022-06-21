import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import {
  validadorIdentidades,
  validarRuc,
} from "../../validaciones/validaciones";
import { saveEmpresa, saveImagenEmpresa } from "../../webServices/Post";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducer/auth";

export const RegistrarEmpresa = (props) => {
  const { visible, setVisible, stateChanger } = props;
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [file, setfile] = useState(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const guardarRegistro = async (data, imagenData) => {
    try {
      const response = await saveEmpresa(data);
      if (response.id > 0) {
        if (imagenData) {
          const imageResponse = await saveImagenEmpresa(imagenData, response.id);
          if (imageResponse) {
            toast.success("Imagen registrada correctamente");
          } else {
            toast.error(
              "Error al guardar la imagen. Comuníquese con el proveedor."
            );
          }
        }
        reset();
        setVisible(false);
        stateChanger(true);
        toast.success("Registro exitoso");
      } else {
        reset();
        toast.error("Ups! Algo ha salido mal. Comuníquese con el proveedor.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    if (validadorIdentidades(data.ruc)) {
      data.id_admin = id;
      if (file) {
        const formdata = new FormData();
        formdata.append("image", file);
        guardarRegistro(data, formdata);

        document.getElementById("fileinput").value = null;
        setfile(null);
      } else {
        guardarRegistro(data, null);
      }
    } else {
      toast.error("Número de RUC ingresado no es válido");
    }
  };

  const cerrarSesion = () => {
    dispatch(logout());
    localStorage.clear;
  };

  const selectedHandler = (e) => {
    setfile(e.target.files[0]);
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <>
      {/* Modal para guardar la información dE CATEGORIA */}
      <Dialog
        style={{ width: "50vw" }}
        visible={visible}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header={"Bienvenido a SAG"}
        onHide={cerrarSesion}
        modal
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="container-fluid px-4 align-items-center justify-content-center">
            <h5 className="text-primary">Primer paso</h5>
            <p>
              Iniciemos registrando información de tu empresa u organización.
              Esta información será importante para poder gestionar todos los
              recursos a los que SAG te da acceso.
            </p>
            <div className="d-sm-flex">
              <div className="pe-1 w-100">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Nombre Comercial:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-tag" />
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: "Nombre comercial es requerido",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Diskmark"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("nombre")}
              </div>
              <div className="ps-1 w-100">
                <label
                  htmlFor="ruc"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  RUC:{" "}
                </label>
                <span className="p-float-label p-input-icon-left">
                  <i className="fa fa-id-card" />
                  <Controller
                    name="ruc"
                    control={control}
                    rules={{
                      required: "Número de RUC es requerido",
                      pattern: {
                        value: /^[0-9]{0,13}$/,
                        message: "Ingrese solo números",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        type="text"
                        placeholder="Ej: 2302455585001"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("ruc")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="actividad"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Actividad comercial:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-tag" />
                  <Controller
                    name="actividad"
                    control={control}
                    rules={{
                      required: "Actividad comercial es requerida",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Venta y distribución de productos varios"
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
                  Ciudad:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-map-marker-alt" />
                  <Controller
                    name="ciudad"
                    control={control}
                    rules={{
                      required: "Nombre de ciudad es requerido",
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
                        placeholder="Ej: Santo Domingo de los Tsáchilas"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("descripcion")}
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
                  style={{ fontWeight: "bold" }}
                  className="align-middle my-1"
                >
                  Logo, logotipo o representación gráfica (Opcional):
                </label>
                <div className="mx-2">
                  <input
                    id="fileinput"
                    onChange={selectedHandler}
                    className="form-control"
                    type="file"
                  />
                </div>
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
