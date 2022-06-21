import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { get } from "../webServices/Get";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast, ToastContainer } from "react-toastify";
import { editPasswordAdmin, editPasswordUsuario } from "../webServices/Post";

export const CuentaUsuario = () => {
  const { id } = useSelector((state) => state.auth);
  const { isAdmin } = useSelector((state) => state.auth);
  const { nombre } = useSelector((state) => state.auth);
  const { apellido } = useSelector((state) => state.auth);
  const [usuario, setUsuario] = useState({
    id_usuario: "",
    password_usuario: "",
    correo_usuario: "",
    temp: "",
    aux: "",
  });
  const [habilitado, setHabilitado] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setCargando(true);
    async function cargarDataUsuario(id) {
      const userTemp = await get(`usuario/empleado/${id}`);
      setUsuario({
        ...usuario,
        id_usuario: userTemp.map(function (item) {
          return item.id_usuario;
        }),
        correo_usuario: userTemp.map(function (item) {
          return item.correo_empleado;
        }),
        password_usuario: userTemp.map(function (item) {
          return item.password_usuario;
        }),
      });
      setCargando(false);
      setRefresh(false);
    }

    async function cargarDataAdmin(id) {
      const userTemp = await get(`admin/${id}`);
      setUsuario({
        ...usuario,
        correo_usuario: userTemp.map(function (item) {
          return item.correo_admin;
        }),
        password_usuario: userTemp.map(function (item) {
          return item.password_admin;
        }),
      });
      setCargando(false);
      setRefresh(false);
    }

    if (isAdmin) {
      cargarDataAdmin(id);
    } else {
      cargarDataUsuario(id);
    }

    return () => {
      setUsuario({
        id_usuario: "",
        password_usuario: "",
        correo_usuario: "",
        temp: "",
        aux: "",
      });
    };
  }, [refresh]);

  const guardar = async (event) => {
    event.preventDefault();
    try {
      if (isAdmin) {
        const response = await editPasswordAdmin(id, usuario.aux);
        if (response) {
          setUsuario({
            ...usuario,
            temp: "",
            aux: "",
          });
          setHabilitado(true);
          setRefresh(true);
          toast.success("Actualización exitosa");
        } else {
          toast.error("Ups! algo ha salido mal. Intente nuevamente. ");
        }
      } else {
        const response = await editPasswordUsuario(
          usuario.id_usuario,
          usuario.aux
        );
        if (response) {
          setUsuario({
            ...usuario,
            temp: "",
            aux: "",
          });
          setRefresh(true);
          toast.success("Actualización exitosa");
        } else {
          toast.error("Ups! algo ha salido mal. Intente nuevamente. ");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validar = () => {
    if (usuario.temp !== "") {
      if (usuario.temp == usuario.password_usuario) {
        toast.success("Ahora ingresa tu nueva contraseña");
        setHabilitado(false);
      } else {
        toast.error("Ups! La contraseña no coincide con la actual");
      }
    } else {
      toast.warning("Ingrese una contraseña para continuar");
    }
  };

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
      {cargando === true ? (
        <>
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center">
              <div className="col-auto">
                <ProgressSpinner strokeWidth="5" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="ps-3 pt-2 h-100">
          <div className="card pb-3 h-100">
            <div className="pt-2 px-3 gradient rounded-top">
              <div className="d-flex align-items-center justify-content-start text-white">
                <h5>
                  Detalles de tu cuenta de usuario
                  <i className="fa fa-user-circle ms-2"></i>
                </h5>
              </div>
            </div>
            <div className="px-5 py-3">
              <div className="d-sm-flex justify-content-center">
                <i
                  className="fa fa-user-circle text-primary"
                  style={{ fontSize: "10rem" }}
                />
              </div>
              <div className="container mt-3 bg-white py-1 rounded">
                <div className="d-sm-flex w-100 justify-content-center mb-3 text-primary border-bottom border-top border-primary">
                  <h6 className="mt-1">Datos Generales</h6>
                </div>
                <div className="d-flex">
                  <div className="flex-fill text-center">
                    <h6>Nombre</h6>
                    <span className="p-input-icon-left w-100">
                      <i className="fa fa-user" />
                      <InputText value={nombre} className="w-100" readOnly />
                    </span>
                  </div>
                  <div className="flex-fill text-center px-1">
                    <h6>Apellido</h6>
                    <span className="p-input-icon-left w-100">
                      <i className="fa fa-user" />
                      <InputText value={apellido} className="w-100" readOnly />
                    </span>
                  </div>
                  <div className="flex-fill text-center">
                    <h6>Correo</h6>
                    <span className="p-input-icon-left w-100">
                      <i className="fa fa-envelope" />
                      <InputText
                        value={usuario.correo_usuario}
                        className="w-100"
                        readOnly
                      />
                    </span>
                  </div>
                </div>
                <div className="d-sm-flex w-100 justify-content-center mt-4 mb-3 text-primary border-bottom border-top border-primary">
                  <h6 className="mt-1">Actualizar Datos</h6>
                </div>
                <div className="text-center">
                  <p>Ingrese su contraseña actual para continuar</p>
                </div>
                <div className="container text-center">
                  <h6>
                    <i className="fa fa-key" /> Contraseña actual
                  </h6>
                  <div className="d-flex justify-content-center">
                    <Password
                      value={usuario.temp}
                      onChange={(e) =>
                        setUsuario({ ...usuario, temp: e.target.value })
                      }
                    />
                    <Button
                      icon="pi pi-check"
                      className="p-button-success ms-2"
                      label="Validar"
                      type="button"
                      onClick={validar}
                    />
                  </div>
                  <form onSubmit={guardar} method="post">
                    <h6 className="mt-2">
                      <i className="fa fa-key" /> Contraseña nueva
                    </h6>
                    <div className="d-flex justify-content-center">
                      <Password
                        value={usuario.aux}
                        onChange={(e) =>
                          setUsuario({
                            ...usuario,
                            aux: e.target.value,
                          })
                        }
                        readOnly={habilitado}
                        header={passwordHeader}
                        footer={passwordFooter}
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <Button
                        icon="pi pi-check"
                        className="p-button-primary"
                        label="Actualizar"
                        disabled={habilitado}
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer autoClose={5000} />
    </>
  );
};
