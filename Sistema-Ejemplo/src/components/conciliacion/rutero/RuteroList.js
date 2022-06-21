import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { toast, ToastContainer } from "react-toastify";
import { FilterMatchMode } from "primereact/api";
import { get } from "../../webServices/Get";
import { RuteroView } from "./dialogs/RuteroView";
import { RegistrarRutero } from "./dialogs/RegistrarRutero";
import { ProgressSpinner } from "primereact/progressspinner";
import { EliminarRutero } from "./dialogs/EliminarRutero";
import moment from "moment";

export const RuteroList = (props) => {
  const { stateChanger, ruteros, idEmpresa, id_Empresa } = props;
  const [viewModal, setViewModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [rutero, setRutero] = useState({});
  const [pedidos, setPedidos] = useState({ pedidos: [], totalRecaudo: 0 });
  const [cargando, setCargando] = useState(false);

  const cargarPedidos = async (id) => {
    try {
      let temp = [];
      let aRecaudar = 0;
      const pedido_resp = await get(`rutero/has/${id}/`);
      pedido_resp.map((p) => {
        temp.push({
          pedido_id_pedido: p.pedido_id_pedido,
          codigo_pedido: p.codigo_pedido,
          fecha_pedido: moment(p.fecha_pedido).add(1, 'day').format("YYYY-MM-DD"),
          estado_pedido: p.estado_pedido,
          id_factura: p.id_factura,
          total_factura: Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(p.total_factura),
          id_estab: p.id_estab,
          codigo_estab: p.codigo_estab,
          ubicacion_estab: p.ubicacion_estab,
          id_cliente: p.id_cliente,
          nombre_cliente: p.nombre_cliente+" "+p.apellido_cliente,
          telefono_cliente: p.telefono_cliente,
        });
        aRecaudar = aRecaudar + p.total_factura;
      });
      setPedidos({
        pedidos: temp,
        totalRecaudo: Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(aRecaudar),
      });
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarParaGuardar = async (id) => {
    try {
      let temp = [];
      const pedidos = await get(`pedidos/empresa/${id}/REALIZADO`);
      pedidos.map((pedido) => {
        temp.push({
          id_pedido: pedido.id_pedido,
          codigo_estab: pedido.codigo_estab,
          nombre_cliente: pedido.nombre_cliente + " " + pedido.apellido_cliente,
          ruc_cliente: pedido.ruc_cliente,
          telefono_cliente: pedido.telefono_cliente,
          codigo_pedido: pedido.codigo_pedido,
          fecha_pedido: moment(pedido.fecha_pedido).add(1, 'day').format("YYYY-MM-DD"),
          estado_pedido: pedido.estado_pedido,
          total_factura: pedido.total_factura,
        });
      });
      setPedidos({ ...pedidos, pedidos: temp });
      setCargando(false);
    } catch (e) {
      console.log(e);
    }
  };

  const accionVer = async (row) => {
    setCargando(true);
    setRutero({ ...row });
    await cargarPedidos(row.id_rutero);
    setViewModal(true);
  };

  const accionGuardar = async () => {
    setCargando(true);
    if (idEmpresa) {
      cargarParaGuardar(idEmpresa);
    } else {
      cargarParaGuardar(id_Empresa);
    }
    setSaveModal(true);
  };

  const accionBorrar = async (row) => {
    setRutero({ ...row });
    setDeleteModal(true);
  };

  const actionVer = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-info-circle"
          label="Más Información"
          className="p-button-primary mx-1 my-1"
          onClick={() => accionVer(rowData)}
        />
      </>
    );
  };

  const actionBorrar = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-times"
          label="Eliminar"
          className="p-button-danger mx-1 my-1"
          onClick={() => accionBorrar(rowData)}
        />
      </>
    );
  };

  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    no_rutero: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    fecha_rutero: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setglobalFilterValue] = useState("");
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setfilters(_filters);
    setglobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <>
        <div className="px-4">
          <div className="d-sm-flex align-items-center justify-content-center text-center">
            <div className="flex-grow-1">
              <em className="mx-3">
                Buscar por código o fecha del rutero
              </em>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={globalFilterValue}
                  onChange={onGlobalFilterChange}
                  placeholder="Buscar"
                />
              </span>
            </div>
            <div>
              <Button
                label="Generar nuevo rutero"
                icon="pi pi-plus"
                className="p-button py-2 px-3"
                onClick={accionGuardar}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  const header = renderHeader();

  return (
    <>
      <div className="card">
        <DataTable
          value={ruteros}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={["no_rutero", "fecha_rutero"]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
          size="small"
        >
          <Column
            field="no_rutero"
            header="Rutero"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="fecha_rutero"
            header="Fecha de creación"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field={"total_rutero"}
            header="Total a recaudar"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            header="Más información"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            body={actionVer}
          ></Column>
          <Column
            header="Acciones"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            body={actionBorrar}
          ></Column>
        </DataTable>
      </div>

      {cargando ? (
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
          <RegistrarRutero
            {...pedidos}
            stateChanger={stateChanger}
            saveModal={saveModal}
            setSaveModal={setSaveModal}
          />

          <RuteroView
            {...rutero}
            {...pedidos}
            idEmpresa={idEmpresa}
            id_Empresa={id_Empresa}
            viewModal={viewModal}
            setViewModal={setViewModal}
          />

          <EliminarRutero
            {...rutero}
            stateChanger={stateChanger}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          />
        </>
      )}

      <ToastContainer autoClose={5000} />
    </>
  );
};
