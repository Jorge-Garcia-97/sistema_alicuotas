import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Empleado } from "./dialogs/Empleado";
import { Reactivar } from "./dialogs/Reactivar";

export const EmpleadosInactivos = (props) => {
  const { stateChanger, inactivos } = props;
  const [personal, setPersonal] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const accionVer = (personal) => {
    setPersonal({ ...personal });
    setViewModal(true);
  };

  const accionEditar = (personal) => {
    setPersonal({ ...personal });
    setEditModal(true);
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
          icon="fa fa-plus"
          className="p-button-success mx-1 my-1 text-white"
          onClick={() => accionEditar(rowData)}
        />
      </>
    );
  };

  /////////////////////Busqueda global/////////////
  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    codigo_empleado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre_empleado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    apellido_empleado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    cedula_empleado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    telefono_empleado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre_rol: { value: null, matchMode: FilterMatchMode.EQUALS },
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
              <em className="mx-2">
                Buscar por código, nombre, apellido, cédula o departamento
              </em>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={globalFilterValue}
                  onChange={onGlobalFilterChange}
                  placeholder="Buscar"
                  className="me-2"
                />
              </span>
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
          value={inactivos}
          paginator
          className="p-datatable-responsive-demo"
          rows={10}
          filters={filters}
          globalFilterFields={[
            "codigo_empleado",
            "nombre_empleado",
            "apellido_empleado",
            "cedula_empleado",
            "telefono_empleado",
            "nombre_rol",
          ]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
          size="small"
        >
          <Column
            field="codigo_empleado"
            header="Código"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
            sortable
          ></Column>
          <Column
            field="nombre_empleado"
            header="Nombres"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="apellido_empleado"
            header="Apellidos"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="cedula_empleado"
            header="Cédula"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="telefono_empleado"
            header="Teléfono"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="nombre_rol"
            header="Rol"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="correo_empleado"
            header="Correo"
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

      <Empleado
        {...personal}
        viewModal={viewModal}
        setViewModal={setViewModal}
      />

      <Reactivar
        {...personal}
        stateChanger={stateChanger}
        editModal={editModal}
        setEditModal={setEditModal}
      />
    </>
  );
};
