import React, { useEffect, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { Redirect, Route, Switch } from "react-router-dom";
import { EmpleadoChart } from "../components/empleados/EmpleadoChart";
import { EmpleadosMain } from "../components/empleados/EmpleadosMain";
import { Sidebar } from "../components/navigation/Sidebar";
import { GestionMain } from "../components/gestion-productos/GestionMain";
import { ProveedoresMain } from "../components/gestion-productos/proveedores/ProveedoresMain";
import { ClientesMain } from "../components/gestion-clientes/clientes/ClientesMain";
import { EstablecimientoMain } from "../components/gestion-clientes/establecimiento/EstablecimientoMain";
import { useDispatch, useSelector } from "react-redux";
import { MenuSuperior } from "../components/navbar/MenuSuperior";
import { MenuOpciones } from "../components/utilitarios/MenuOpciones";
import { EmpresaMain } from "../components/empresa/EmpresaMain";
import { CuentaUsuario } from "../components/utilitarios/CuentaUsuario";
import { RutasMain } from "../components/rutas/RutasMain";
import { PedidosMain } from "../components/pedidos/PedidosMain";
import "./DashboardRoutes.css";
import { get } from "../components/webServices/Get";
import { datosRequeridos, permisosRequeridos } from "../reducer/datosContext";
import { RegistrarEmpresa } from "../components/utilitarios/dialogs/RegistrarEmpresa";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast, ToastContainer } from "react-toastify";
import { ArqueoMain } from "../components/conciliacion/ArqueoMain";
import { GraficasMain } from "../components/graficas/GraficasMain";

export const DashboardRoutes = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);
  const { id_Empresa } = useSelector((state) => state.auth);
  const { nombre } = useSelector((state) => state.auth);
  const { apellido } = useSelector((state) => state.auth);
  const aux = useSelector((state) => state);
  const [visible, setvisible] = useState();
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    nombreEmpresa: "",
    idEmpresa: "",
    img_name: "",
  });

  useEffect(() => {
    async function comprobarEmpresa(id) {
      try {
        setCargando(true);
        let idAux = 0;
        const response = await get(`empresa/admin/${id}`);
        if (Object.keys(response).length > 0) {
          idAux = await response.map(function (item) {
            return item.id_empresa;
          });
          dispatch(datosRequeridos(idAux));
          return idAux;
        } else {
          return idAux;
        }
      } catch (e) {
        console.log(e);
      }
    }
    //Si es Admin
    async function cargarData(id) {
      let empresa_name = "";
      const response = await get(`empresa/${id}/`);
      if (Object.keys(response).length > 0) {
        const img_name = await get(`empresa/imagen/${id}`);
        empresa_name = await response.map(function (item) {
          return item.nombre_empresa;
        });
        if (img_name) {
          setState({
            nombreUsuario: nombre,
            apellidoUsuario: apellido,
            idEmpresa: id,
            nombreEmpresa: empresa_name,
            img_name: img_name.name,
          });
        } else {
          setState({
            nombreUsuario: nombre,
            apellidoUsuario: apellido,
            idEmpresa: id,
            nombreEmpresa: empresa_name,
            img_name: null,
          });
        }
        setRefresh(false);
      } else {
        toast.error("Ups! Algo ha salido mal, comúniquese con el proveedor");
      }
    }
    //Si no es Admin
    async function cargarDataEmpleado(id) {
      try {
        let response = await get(`empleado/${id}/`);
        const id_rol = await response.map(function (emp) {
          return emp.rol_id_rol;
        });
        response = await get(`rol/${id_rol}/`);
        if (Object.keys(response).length > 0) {
          await response.map(function (rol) {
            dispatch(
              permisosRequeridos(
                rol.gestion_empleados_rol,
                rol.gestion_productos_rol,
                rol.gestion_clientes_rol,
                rol.gestion_pedidos_rol,
                rol.gestion_rutas_rol,
                rol.gestion_caja_rol,
                rol.informacion_general_rol
              )
            );
          });
          const empresa_name = await get(`empresa/${id_Empresa}/`);
          const img_name = await get(`empresa/imagen/${id_Empresa}`);
          if (img_name) {
            setState({
              nombreUsuario: nombre,
              apellidoUsuario: apellido,
              idEmpresa: id_Empresa,
              nombreEmpresa: await empresa_name.map(function (item) {
                return item.nombre_empresa;
              }),
              img_name: img_name.name,
            });
          } else {
            setState({
              nombreUsuario: nombre,
              apellidoUsuario: apellido,
              idEmpresa: id_Empresa,
              nombreEmpresa: await empresa_name.map(function (item) {
                return item.nombre_empresa;
              }),
              img_name: null,
            });
          }
          setCargando(false);
        } else {
          toast.error("Ups! Algo ha salido mal, comúniquese con el proveedor");
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (isAdmin) {
      comprobarEmpresa(id).then((result) => {
        if (result.toString() > 0) {
          cargarData(result);
          setCargando(false);
          setvisible(false);
        } else {
          setCargando(false);
          setvisible(true);
        }
      });
    } else {
      setCargando(true);
      cargarDataEmpleado(id);
    }
  }, [refresh]);

  const limpiarEstado = () => {
    setState({
      nombreUsuario: "",
      apellidoUsuario: "",
      nombreEmpresa: "",
      idEmpresa: "",
      img_name: "",
    });
  };

  return (
    <>
      {cargando === true ? (
        <>
          <div className="container-fluid bg-white">
            <div className="row vh-100 align-items-center justify-content-center">
              <div className="col-auto">
                <ProgressSpinner strokeWidth="5" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="vw-100 vh-100">
            <MenuSuperior {...state} limpiar={limpiarEstado} />
            <div className="container-fluid">
              <div className="row">
                <div className="col-auto px-0">
                  <Sidebar {...state} />
                </div>
                <div className="col">
                  <div className="row">
                    <ScrollPanel
                      className="px-0 py-0"
                      style={{
                        height: "calc(100vh - (57px))",
                        maxWidth: "calc(100vw - (80px))",
                      }}
                    >
                      <Switch>
                        <Route
                          exact
                          path="/home"
                          component={MenuOpciones}
                        ></Route>
                        <Route
                          exact
                          path="/personal/:estado"
                          component={EmpleadosMain}
                        ></Route>
                        <Route
                          exact
                          path="/productos/:tipo"
                          component={GestionMain}
                        ></Route>
                        <Route
                          exact
                          path="/proveedores/:estado"
                          component={ProveedoresMain}
                        ></Route>
                        <Route
                          exact
                          path="/clientes/:estado"
                          component={ClientesMain}
                        ></Route>
                        <Route
                          exact
                          path="/establecimientos"
                          component={EstablecimientoMain}
                        ></Route>
                        <Route
                          exact
                          path="/empresa"
                          component={EmpresaMain}
                        ></Route>
                        <Route
                          exact
                          path="/cuenta"
                          component={CuentaUsuario}
                        ></Route>
                        <Route
                          exact
                          path="/pedidos"
                          component={PedidosMain}
                        ></Route>
                        <Route
                          exact
                          path="/rutas"
                          component={RutasMain}
                        ></Route>
                        <Route
                          exact
                          path="/arqueo/:tipo"
                          component={ArqueoMain}
                        ></Route>
                        <Route
                          exact
                          path="/dashboard"
                          component={GraficasMain}
                        ></Route>
                        <Redirect to="/home"></Redirect>
                      </Switch>
                    </ScrollPanel>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RegistrarEmpresa
            visible={visible}
            setVisible={setvisible}
            stateChanger={setRefresh}
          />
          <ToastContainer autoClose={5000} style={{ zIndex: 2 }} />
        </>
      )}
    </>
  );
};
