import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import { toast, ToastContainer } from "react-toastify";
import { saveUsuario } from "../../../webServices/Post";

export const RegistrarUsuario = (props) => {
  const { stateChanger, saveModal, setSaveModal, empleados, usuarios } = props;
  const [state, setState] = useState({
    usuario_id: 0,
    usuario_correo: "",
    usuario_password: "",
  });
  const [searchUsuario, setsearchUsuario] = useState();
  const [suggUsuario, setSuggUsuario] = useState({ usuarios: [] });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(state);
    const validador = usuarios.find(
      (usuario) => usuario.correo_empleado === state.usuario_correo
    );
    if (validador === undefined) {
      const response = await saveUsuario(state);
      if (response) {
        stateChanger(true);
        hideDialog();
      } else {
        toast.error("Ups! Algo ha salido mal. Intente nuevamente");
      }
    } else {
      toast.error("Ya existe un usuario relacionado al correo ingresado");
    }
  };

  const filterUsuario = (event) => {
    let text = event.target.value;
    const data = empleados;
    const newData = data.filter(function (item) {
      const itemData = item.nombre_empleado;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setSuggUsuario({ usuarios: newData });
    setsearchUsuario(text);
  };

  const handleSuggest = (suggest) => {
    setState({
      ...state,
      usuario_id: suggest.id_empleado,
      usuario_correo: suggest.correo_empleado,
    });
    setsearchUsuario(suggest.nombre_empleado);
    setSuggUsuario({ usuarios: [] });
  };

  const hideDialog = () => {
    setSaveModal(false);
    setState({
      usuario_id: 0,
      usuario_correo: "",
      usuario_password: "",
    });
    setSuggUsuario({ usuarios: [] });
    setsearchUsuario("");
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

  const passwordHeader = <h6>Ingresa una contraseña</h6>;
  const passwordFooter = (
    <>
      <Divider />
      <p className="p-mt-2">Sugerencias</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>Al menos una letra minúscula</li>
        <li>Al menos una letra mayúscula</li>
        <li>Al menos un caracter numérico</li>
        <li>Mínimo 8 caracteres</li>
      </ul>
    </>
  );

  return (
    <>
      <Dialog
        visible={saveModal}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Registrar información"
        modal
        footer={saveDialogFooter}
        onHide={hideDialog}
      >
        <form method="post" onSubmit={onSubmit} className="p-fluid">
          <div className="container-fluid px-4 align-items-center justify-content-center">
            <div className="d-sm-flex">
              <div className="w-100">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Buscar miembro del personal para asignar usuario:
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-user" />
                  <InputText
                    value={searchUsuario}
                    onChange={(e) => filterUsuario(e)}
                    onBlur={() => {
                      setTimeout(() => {
                        setSuggUsuario({ usuarios: [] });
                      }, 100);
                    }}
                    autoFocus
                    placeholder="Ingrese un nombre para buscar"
                    required
                  />
                </span>
                <div
                  id="result"
                  className="card shadow rounded border w-75"
                  style={{ position: "absolute", zIndex: 2 }}
                >
                  <ul>
                    {suggUsuario.usuarios &&
                      suggUsuario.usuarios.slice(0, 5).map((emp, i) => (
                        <li
                          className="mx-2 mt-1"
                          onMouseDown={() => handleSuggest(emp)}
                          key={i}
                        >
                          {emp.nombre_empleado}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-sm-flex mt-2">
              <div className="w-100">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Correo para el inicio de sesión:
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-envelope" />
                  <InputText
                    value={state.usuario_correo}
                    placeholder="Aquí aparecerá el correo del usuario designado"
                    readOnly
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
                  Contraseña:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-tags" />
                  <Password
                    value={state.usuario_password}
                    onChange={(e) =>
                      setState({ ...state, usuario_password: e.target.value })
                    }
                    autoFocus
                    placeholder="Password"
                    header={passwordHeader}
                    footer={passwordFooter}
                    required
                  />
                </span>
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
