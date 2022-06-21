import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { toast, ToastContainer } from "react-toastify";
import { Registro } from "./dialogs/Registro";
import { Empleado } from "./dialogs/Empleado";
import { Editar } from "./dialogs/Editar";
import { Eliminar } from "./dialogs/Eliminar";

export const EmpleadosList = (props) => {
  const { stateChanger } = props;
  const { roles } = props;
  const { idEmpresa } = props;
  const { data } = props;
  const [personal, setPersonal] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // const passwordHeader = <h6>Ingresa una contraseña</h6>;
  // const passwordFooter = (
  //   <>
  //     <Divider />
  //     <p className="p-mt-2">Sugerencias</p>
  //     <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
  //       <li>Al menos una letra minúscula</li>
  //       <li>Al menos una letra mayúscula</li>
  //       <li>Al menos un caracter numérico</li>
  //       <li>Mínimo 8 caracteres</li>
  //     </ul>
  //   </>
  // );

  const accionVer = (personal) => {
    setPersonal({ ...personal });
    setViewModal(true);
  };

  const accionGuardar = () => {
    setSaveModal(true);
  };

  const accionEditar = (personal) => {
    setPersonal({ ...personal });
    setEditModal(true);
  };

  const accionBorrar = (personal) => {
    setPersonal({ ...personal });
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
              <em className="mx-3">
                Buscar por código, nombre, apellido, cédula o departamento
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

  return (
    <>
      <div className="card">
        <DataTable
          size="small"
          value={data}
          paginator
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
        >
          <Column
            field="codigo_empleado"
            header="Código"
            bodyClassName={"py-1 ps-4 center"}
            className={"py-2 bg-light fw-bold ps-4 center"}
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

      <Registro
        stateChanger={stateChanger}
        saveModal={saveModal}
        setSaveModal={setSaveModal}
        roles={roles}
        idEmpresa={idEmpresa}
      />

      <Empleado
        {...personal}
        viewModal={viewModal}
        setViewModal={setViewModal}
      />

      <Editar
        {...personal}
        stateChanger={stateChanger}
        roles={roles}
        idEmpresa={idEmpresa}
        editModal={editModal}
        setEditModal={setEditModal}
      />

      <Eliminar
        {...personal}
        stateChanger={stateChanger}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />

      <ToastContainer autoClose={5000} />
    </>
  );
};
