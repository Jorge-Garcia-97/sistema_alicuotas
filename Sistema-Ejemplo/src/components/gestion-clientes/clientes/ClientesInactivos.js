import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { editEstadoCliente } from "../../webServices/Post";

export const ClientesInactivos = (props) => {
  const { clientesinactivos, stateChanger } = props; 
  const [cliente, setCliente] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const actualizarRegistro = async () => {
    try {
      const response = await editEstadoCliente(cliente.id_cliente, "ACTIVO");
      if (response) {
        hideDialog();
        stateChanger(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hideDialog = () => {
    //setSubmitted(false);
    setViewModal(false);
    setEditModal(false);
  };
  const accionVer = (cliente) => {
    setCliente({ ...cliente });
    setViewModal(true);
  };
  const accionEditar = (cliente) => {
    setCliente({ ...cliente });
    setEditModal(true);
  };

  //DIALOG

  const viewDialogHeader = (
    <>
      <div>
        <h5>
          Información de {cliente.nombre_cliente} {cliente.apellido_cliente}
        </h5>
      </div>
    </>
  );

  const viewDialogFooter = (
    <>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        autoFocus
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
      />
    </>
  );

  const editDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        autoFocus
        className="p-button-outlined p-button-warning"
        onClick={actualizarRegistro}
      />
    </>
  );

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
    nombre_cliente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    apellido_cliente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    telefono_cliente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ruc_cliente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
              <em className="mx-3">Buscar por RUC nombre o apellido</em>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={globalFilterValue}
                  onChange={onGlobalFilterChange}
                  placeholder="Buscar"
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
        <DataTable size="small"
          value={clientesinactivos}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={[
            "ruc_cliente",
            "nombre_cliente",
            "apellido_cliente",
          ]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
        >
          <Column
            field="ruc_cliente"
            header="Ruc"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="nombre_cliente"
            header="Nombres"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="apellido_cliente"
            header="Apellidos"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="correo_cliente"
            header="Correo"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="telefono_cliente"
            header="Teléfono"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
<Column
            bodyClassName={"py-1 text-center"}
            className={"py-2 bg-light fw-bold"}
            body={actions}
          ></Column>
        </DataTable>
      </div>

      {/* Modal para ver la información del personal */}
      <Dialog
        visible={viewModal}
        style={{ width: "35vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header={viewDialogHeader}
        modal
        footer={viewDialogFooter}
        onHide={hideDialog}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm">
              <p>
                <i className="fa fa-id-card align-middle"></i>
                <strong className="align-middle"> Ruc: </strong>
                <span className="align-middle">{cliente.ruc_cliente}</span>
              </p>
            </div>
          </div>
          <p>
            <i className="fa fa-user align-middle"></i>
            <strong className="align-middle"> Nombres: </strong>
            <span className="align-middle">{cliente.nombre_cliente}</span>
          </p>
          <p>
            <i className="fa fa-user align-middle"></i>
            <strong className="align-middle"> Apellidos: </strong>
            <span className="align-middle">{cliente.apellido_cliente}</span>
          </p>
          <div className="row">
            <div className="col-sm">
              <p>
                <i className="fa fa-phone-square-alt align-middle"></i>
                <strong className="align-middle"> Teléfono: </strong>
                <span className="align-middle">{cliente.telefono_cliente}</span>
              </p>
            </div>
          </div>
          <p>
            <i className="fa fa-envelope align-middle"></i>
            <strong className="align-middle"> Correo: </strong>
            <span className="align-middle">{cliente.correo_cliente}</span>
          </p>
        </div>
      </Dialog>

      {/* Dialog para confirmar la reactivación del cliente */}
      <Dialog
        header="Confirmación"
        visible={editModal}
        style={{ width: "30vw" }}
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="container">
          <div className="row d-flex h-100">
            <div className="col-sm-2 justify-content-center align-self-center">
              <i
                className="pi pi-exclamation-triangle"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <div className="col-sm-10 justify-content-center align-self-center pt-2">
              <p>¿Está seguro que desea activar nuevamente este cliente?</p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
