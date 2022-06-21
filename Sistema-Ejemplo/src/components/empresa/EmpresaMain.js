import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { get } from "../webServices/Get";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import "./Style.css";
import { Tab1 } from "./tabs/Tab1";
import { Tab2 } from "./tabs/Tab2";

export const EmpresaMain = () => {
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [state, setstate] = useState({
    idEmpresa: undefined,
    ruc_empresa: undefined,
    nombre_empresa: undefined,
    actividad_empresa: undefined,
    ciudad_empresa: undefined,
    telefono_empresa: undefined,
    correo_empresa: undefined,
    empleados: [],
    productos: [],
    roles: [],
    categorias: [],
    proveedores: [],
    clientes: [],
    establecimientos: [],
    pedidos: [],
    rutas: [],
    usuarios: [],
  });
  const [img, setimg] = useState({imgName: ""});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setCargando(true);
    if(idEmpresa){
      cargarData(idEmpresa);
    }else{
      cargarData(id_Empresa);
    }
    return () => {
      setstate({});
      setimg({});
    }
  }, [refresh]);

  const cargarData = async (id) => {
    try {
      let inputEmpleados = [];
      const response = await get(`empresa/${id}/`);
      const img_name = await get(`empresa/imagen/${id}`);
      setimg({imgName: img_name.name});
      const productos = await get(`productos/empresa/${id}`);
      const roles = await get(`roles/empresa/${id}`);
      const categorias = await get(`categorias/empresa/${id}`);
      const establecimientos = await get(`establecimientos/empresa/${id}`);
      const empleados = await get(`empleados/empresa/${id}`);
      const clientes = await get(`clientes/empresa/${id}`);
      const proveedores = await get(`proveedores/empresa/${id}`);
      const usuarios = await get(`usuarios/empresa/${id}`);
      const pedidos = await get(`pedidos/empresa/${id}/REALIZADO`);

      empleados.map((emp) => {
        inputEmpleados.push({
          id_empleado: emp.id_empleado,
          nombre_empleado: emp.nombre_empleado+" "+emp.apellido_empleado,
          cedula_empleado: emp.cedula_empleado,
          correo_empleado: emp.correo_empleado,
          telefono_empleado: emp.telefono_empleado,
        })
      })
      setstate({
        ruc_empresa: response.map(function (item) {
          return item.ruc_empresa;
        }),
        nombre_empresa: response.map(function (item) {
          return item.nombre_empresa;
        }),
        actividad_empresa: response.map(function (item) {
          return item.actividad_empresa;
        }),
        ciudad_empresa: response.map(function (item) {
          return item.ciudad_empresa;
        }),
        telefono_empresa: response.map(function (item) {
          return item.telefono_empresa;
        }),
        correo_empresa: response.map(function (item) {
          return item.correo_empresa;
        }),
        productos: productos,
        roles: roles,
        categorias: categorias,
        establecimientos: establecimientos,
        empleados: inputEmpleados,
        clientes: clientes,
        proveedores: proveedores,
        usuarios: usuarios,
        idEmpresa: id,
        pedidos: pedidos,
      });
      setCargando(false);
      setRefresh(false);
    } catch (error) {
      toast.error(error);
    }
  };

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
        <>
          <div className="py-2 ms-2">
            <div className="card">
              <div className="text-white gradient rounded-top ps-2 py-1">
                <h5>
                  <i className="fa fa-briefcase me-2" />
                  Mi Empresa
                </h5>
              </div>
              <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              >
                <TabPanel header="Datos Generales">
                  <Tab1 {...state} {...img} />
                </TabPanel>
                <TabPanel header="Información de Usuarios">
                  <Tab2 {...state} stateChanger={setRefresh} />
                </TabPanel>
                <TabPanel header="Configuraciones">Content III</TabPanel>
              </TabView>
            </div>
          </div>
        </>
      )}
    </>
  );
};
