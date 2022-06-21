import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast, ToastContainer } from "react-toastify";
import { RegistrarRol } from "./dialogs/RegistrarRol";
import { EditarRol } from "./dialogs/EditarRol";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { EliminarRol } from "./dialogs/EliminarRol";

export const RolesList = (props) => {
  const { stateChanger } = props;
  const { roles } = props;
  const { idEmpresa } = props;
  const [rol, setrol] = useState({});
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  /////////////////////Busqueda global/////////////
  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre_rol: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setglobalFilterValue] = useState("");
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setfilters(_filters);
    setglobalFilterValue(value);
  };

  const accionGuardar = () => {
    setSaveModal(true);
  };

  const accionEditar = (rol) => {
    setrol({ ...rol });
    setEditModal(true);
  };

  const accionBorrar = (rol) => {
    setrol({ ...rol });
    setDeleteModal(true);
  };

  const actions = (rowData) => {
    return (
      <>
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

  const renderHeader = () => {
    return (
      <>
        <div className="px-4">
          <div className="d-sm-flex align-items-center justify-content-center text-center">
            <div className="flex-grow-1">
              <em className="mx-3">Buscar por nombre</em>
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
                label="Nuevo"
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

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          header={"Nombre"}
          rowSpan={2}
          headerClassName="ps-3 bg-light fw-bold"
          sortable
        />
        <Column
          header={"Descripción"}
          rowSpan={2}
          headerClassName="ps-3 bg-light fw-bold"
        />
        <Column
          header={"Permisos otorgados sobre los módulos"}
          headerClassName="bg-light fw-bold"
          colSpan={8}
        />
      </Row>
      <Row>
        <Column header={"Personal"} headerClassName="bg-light fw-bold" />
        <Column header={"Productos"} headerClassName="bg-light fw-bold" />
        <Column header={"Clientes"} headerClassName="bg-light fw-bold" />
        <Column header={"Pedidos"} headerClassName="bg-light fw-bold" />
        <Column header={"Conciliación"} headerClassName="bg-light fw-bold" />
        <Column header={"Rutas"} headerClassName="bg-light fw-bold" />
        <Column header={"Información"} headerClassName="bg-light fw-bold" />
        <Column header={"Acciones"} headerClassName="bg-light fw-bold" />
      </Row>
    </ColumnGroup>
  );

  return (
    <>
      <div className="card">
        <DataTable
          size="small"
          value={roles}
          headerColumnGroup={headerGroup}
          paginator
          rows={5}
          filters={filters}
          globalFilterFields={["nombre_rol"]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
        >
          <Column field="nombre_rol" bodyClassName={"ps-3"}></Column>
          <Column field="descripcion_rol"></Column>
          <Column field="gestion_empleados_rol"></Column>
          <Column field="gestion_productos_rol"></Column>
          <Column field="gestion_clientes_rol"></Column>
          <Column field="gestion_pedidos_rol"></Column>
          <Column field="gestion_caja_rol"></Column>
          <Column field="gestion_rutas_rol"></Column>
          <Column field="informacion_general_rol"></Column>
          <Column body={actions}></Column>
        </DataTable>
      </div>

      <RegistrarRol
        stateChanger={stateChanger}
        saveModal={saveModal}
        setSaveModal={setSaveModal}
        idEmpresa={idEmpresa}
      />

      <EditarRol
        {...rol}
        stateChanger={stateChanger}
        editModal={editModal}
        setEditModal={setEditModal}
      />

      <EliminarRol
        {...rol}
        stateChanger={stateChanger}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />

      <ToastContainer autoClose={5000} />
    </>
  );
};
