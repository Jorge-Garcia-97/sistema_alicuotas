import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import { toast, ToastContainer } from "react-toastify";
import { editUsuario } from "../../../webServices/Post";

export const EditarUsuario = (props) => {
  const {
    stateChanger,
    editModal,
    setEditModal,
    correo_empleado,
    password_usuario,
    id_usuario,
  } = props;
  const [state, setState] = useState({
    usuario_id: 0,
    usuario_correo: "",
    usuario_password: "",
  });

  useEffect(() => {
    setState({
      usuario_id: id_usuario,
      usuario_correo: correo_empleado,
      usuario_password: password_usuario,
    });
    return () => {
      setState({});
    };
  }, [editModal]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await editUsuario(state.usuario_id ,state.usuario_password);
    console.log(response);
    if (response) {
      stateChanger(true);
      hideDialog();
    } else {
      toast.error("Ups! Algo ha salido mal. Intente nuevamente");
    }
  };

  const hideDialog = () => {
    setEditModal(false);
    setState({
      usuario_id: 0,
      usuario_correo: "",
      usuario_password: "",
    });
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
        visible={editModal}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Registrar información"
        modal
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <form method="post" onSubmit={onSubmit} className="p-fluid">
          <div className="container-fluid px-4 align-items-center justify-content-center">
            <div className="d-sm-flex">
              <div className="w-100">
                <label
                  htmlFor="correo"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Correo para el inicio de sesión:
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-envelope" />
                  <InputText value={state.usuario_correo} readOnly />
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
