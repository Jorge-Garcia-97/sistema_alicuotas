import React, { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { PedidosList } from "./PedidosList";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { get } from "../webServices/Get";
import moment from "moment";

export const PedidosMain = () => {
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);
  const [state, setstate] = useState({
    pedidos: [],
    establecimientos: [],
    productos: [],
    empleados: [],
    idEmpresa: undefined,
  });
  const [refresh, setrefresh] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    if(idEmpresa){
      cargarData(idEmpresa);
    }else{
      cargarDataEmpleado(id, id_Empresa);
    }
  }, [refresh]);

  const cargarData = async (id) => {
    try {
      let inputData = [];
      const pedidos = await get(`pedidos/empresa/${id}/REALIZADO`);
      const establecimientos = await get(`establecimientos/empresa/${id}`);
      const productos = await get(`productos/empresa/${id}/`);
      const empleados = await get(`empleados/empresa/${id}/ACTIVO`);
      pedidos.map((pedido) => {
        inputData.push({
          id_pedido: pedido.id_pedido,
          id_factura: pedido.factura_id_factura,
          codigo_factura: pedido.codigo_factura,
          codigo_estab: pedido.codigo_estab,
          nombre_cliente: pedido.nombre_cliente + " " + pedido.apellido_cliente,
          ruc_cliente: pedido.ruc_cliente,
          telefono_cliente: pedido.telefono_cliente,
          correo_cliente: pedido.correo_cliente,
          codigo_pedido: pedido.codigo_pedido,
          fecha_pedido: moment(pedido.fecha_pedido).add(1, 'day').format("YYYY-MM-DD"),
          estado_pedido: pedido.estado_pedido,
        });
      });
      setstate({
        pedidos: inputData,
        establecimientos: establecimientos,
        productos: productos,
        empleados: empleados,
        idEmpresa: id,
      });
      setrefresh(false);
      setCargando(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const cargarDataEmpleado = async (id, idEmpresa) => {
    try {
      let inputData = [];
      const pedidos = await get(`pedidos/empleado/${id}/REALIZADO`);
      const establecimientos = await get(`establecimientos/empresa/${idEmpresa}`);
      const productos = await get(`productos/empresa/${idEmpresa}/`);
      const empleados = await get(`empleados/empresa/${idEmpresa}/ACTIVO`);
      pedidos.map((pedido) => {
        inputData.push({
          id_pedido: pedido.id_pedido,
          id_factura: pedido.factura_id_factura,
          codigo_factura: pedido.codigo_factura,
          codigo_estab: pedido.codigo_estab,
          nombre_cliente: pedido.nombre_cliente + " " + pedido.apellido_cliente,
          ruc_cliente: pedido.ruc_cliente,
          telefono_cliente: pedido.telefono_cliente,
          correo_cliente: pedido.correo_cliente,
          codigo_pedido: pedido.codigo_pedido,
          fecha_pedido: moment(pedido.fecha_pedido).format("YYYY-MM-DD"),
          estado_pedido: pedido.estado_pedido,
        });
      });
      setstate({
        pedidos: inputData,
        establecimientos: establecimientos,
        productos: productos,
        empleados: empleados,
        idEmpresa: idEmpresa,
      });
      setrefresh(false);
      setCargando(false);
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
          <div className="mt-2 ms-2">
            <div>{/* <HeaderClientes {...state} /> */}</div>
            <div className="mt-2">
              <div className="mb-2 shadow-sm bg-body rounded">
                <div className="pt-2 px-3 gradient rounded-top">
                  <div className="d-flex align-items-center justify-content-start text-white">
                    <h5>
                      Gestión de Pedidos
                      <i className="fa fa-shipping-fast ms-2"></i>
                    </h5>
                  </div>
                </div>
                <div className="px-3 py-3">
                  <PedidosList {...state} stateChanger={setrefresh} />
                </div>
              </div>
            </div>
            <ToastContainer autoClose={5000} />
          </div>
        </>
      )}
    </>
  );
};
