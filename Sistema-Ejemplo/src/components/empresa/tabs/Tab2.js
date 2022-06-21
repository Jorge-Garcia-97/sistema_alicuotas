import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { RegistrarUsuario } from "./dialogs/RegistrarUsuario";
import { useSelector } from "react-redux";
import { EditarUsuario } from "./dialogs/EditarUsuario";
import { EliminarUsuario } from "./dialogs/EliminarUsuario";

export const Tab2 = (props) => {
  const { usuarios, stateChanger, idEmpresa, empleados } = props;
  const { isAdmin } = useSelector((state) => state.auth);
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [usuario, setUsuario] = useState({});
  const inputUsuario = [];

  usuarios.map((user) => {
    inputUsuario.push({
      id_usuario: user.id_usuario,
      nombre_empleado: user.nombre_empleado + " " + user.apellido_empleado,
      cedula_empleado: user.cedula_empleado,
      correo_empleado: user.correo_empleado,
      telefono_empleado: user.telefono_empleado,
      password_usuario: user.password_usuario,
    });
  });

  const accionGuardar = () => {
    setSaveModal(true);
  };

  const accionEditar = (rawData) => {
    setUsuario({ ...rawData });
    setEditModal(true);
  };

  const accionBorrar = (rawData) => {
    setUsuario({ ...rawData });
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

  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre_empleado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    correo_empleado: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
              <em className="mx-3">Buscar nombre o correo</em>
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
      {isAdmin ? (
        <>
          <div className="card">
            <DataTable
              size="small"
              value={inputUsuario}
              paginator
              rows={10}
              filters={filters}
              globalFilterFields={["nombre_empleado", "correo_empleado"]}
              header={header}
              emptyMessage="No se han encontrado coincidencias."
            >
              <Column
                field="nombre_empleado"
                header="Nombre"
                bodyClassName={"py-1 ps-4"}
                className={"py-2 bg-light fw-bold ps-4"}
                sortable
              ></Column>
              <Column
                field="cedula_empleado"
                header="Cedula"
                bodyClassName={"py-1"}
                className={"py-2 bg-light fw-bold"}
              ></Column>
              <Column
                field="correo_empleado"
                header="Correo"
                bodyClassName={"py-1"}
                className={"py-2 bg-light fw-bold"}
                sortable
              ></Column>
              <Column
                field="telefono_empleado"
                header="Teléfono"
                bodyClassName={"py-1"}
                className={"py-2 bg-light fw-bold"}
                sortable
              ></Column>
              <Column
                header="Acciones"
                bodyClassName={"py-1"}
                className={"py-2 bg-light fw-bold"}
                body={actions}
              ></Column>
            </DataTable>
          </div>

          <RegistrarUsuario
            stateChanger={stateChanger}
            saveModal={saveModal}
            setSaveModal={setSaveModal}
            empleados={empleados}
            idEmpresa={idEmpresa}
            usuarios={usuarios}
          />

          <EditarUsuario 
            {...usuario}
            stateChanger={stateChanger}
            editModal={editModal}
            setEditModal={setEditModal}
          />

          <EliminarUsuario
            {...usuario}
            stateChanger={stateChanger}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          />
        </>
      ) : (
        <>
          <h6>Acceso permitido solo para el usuario administrador</h6>
        </>
      )}
    </>
  );
};
