import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { toast, ToastContainer } from "react-toastify";
import { FilterMatchMode } from "primereact/api";
import { RegistrarPedido } from "./dialogs/RegistrarPedido";
import { Pedido } from "./dialogs/Pedido";
import { get } from "../webServices/Get";
import { EditarPedido } from "./dialogs/EditarPedido";
import { EliminarPedido } from "./dialogs/EliminarPedido";

export const PedidosList = (props) => {
  const {
    establecimientos,
    pedidos,
    productos,
    empleados,
    stateChanger,
    idEmpresa,
  } = props;
  const [pedido, setPedido] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [factura, setFactura] = useState({ factura: [], detalles: [] });
  const [numeroFactura, setNumeroFactura] = useState({ numeroFactura: 0 });

  const cargarData = async (id) => {
    try {
      const factura = await get(`factura/${id}/`);
      const detalles = await get(`factura/detalles/${id}/`);
      setFactura({ factura: factura, detalles: detalles });
    } catch (error) {
      toast.error(error);
    }
  };

  const cargarFacturas = async (id) => {
    try {
      const response = await get(`facturas/empresa/${id}`);
      setNumeroFactura({ numeroFactura: response.length });
    } catch (e) {
      toast.error(e);
    }
  };

  const accionVer = async (row) => {
    setPedido({ ...row });
    await cargarData(row.id_factura);
    setViewModal(true);
  };

  const accionGuardar = async () => {
    await cargarFacturas(idEmpresa);
    setSaveModal(true);
  };

  const accionEditar = async (row) => {
    setPedido({ ...row });
    await cargarData(row.id_factura);
    setEditModal(true);
  };

  const accionBorrar = (row) => {
    setPedido({ ...row });
    setDeleteModal(true);
  };

  const actions = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-info-circle"
          className="p-button-primary mx-1 my-1"
          onClick={() => accionVer(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning mx-1 my-1"
          onClick={() => accionEditar(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger mx-1 my-1"
          onClick={() => accionBorrar(rowData)}
        />
      </>
    );
  };

  /////////////////////Busqueda global/////////////
  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ruc_cliente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    codigo_estab: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre_cliente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    codigo_factura: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    fecha_pedido: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
                Buscar por cliente, establecimiento, factura o fecha
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
                label="Generar Pedido"
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
          value={pedidos}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={[
            "ruc_cliente",
            "codigo_estab",
            "nombre_cliente",
            "codigo_factura",
            "fecha_pedido",
          ]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
          size="small"
        >
          <Column
            field="codigo_factura"
            header="Factura"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="codigo_estab"
            header="Establecimiento"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="nombre_cliente"
            header="Cliente"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="ruc_cliente"
            header="RUC"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="correo_cliente"
            header="Correo"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field={"fecha_pedido"}
            header="Fecha"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="estado_pedido"
            header="Estado"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            bodyClassName={"py-1 text-center"}
            className={"py-2 bg-light fw-bold"}
            body={actions}
          ></Column>
        </DataTable>
      </div>

      <RegistrarPedido
        {...numeroFactura}
        productos={productos}
        estabs={establecimientos}
        empleados={empleados}
        saveModal={saveModal}
        setSaveModal={setSaveModal}
        stateChanger={stateChanger}
      />

      <Pedido
        {...factura}
        {...pedido}
        empleados={empleados}
        viewModal={viewModal}
        setViewModal={setViewModal}
      />

      <EditarPedido
        {...factura}
        {...pedido}
        productos={productos}
        editModal={editModal}
        setEditModal={setEditModal}
        stateChanger={stateChanger}
      />

      <EliminarPedido
        {...pedido}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        stateChanger={stateChanger}
      />

      <ToastContainer autoClose={5000} />
    </>
  );
};
