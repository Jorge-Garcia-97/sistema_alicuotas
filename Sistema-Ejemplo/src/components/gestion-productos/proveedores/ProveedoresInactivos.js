import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { editEstadoProveedor } from "../../webServices/Post";
import { toast, ToastContainer } from "react-toastify";

export const ProveedoresInactivos = (props) => {
  const { prInactivos } = props;
  const { stateChanger } = props;
  const [proveedor, setProveedor] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const actualizarRegistro = async () => {
    try {
      const response = await editEstadoProveedor(
        proveedor.id_proveedor,
        "ACTIVO"
      );
      if (response) {
        hideDialog();
        toast.success("Actualización exitosa.");
        stateChanger(true);
      }
    } catch (error) {
      toast.success(error);
    }
  };

  const accionVer = (proveedor) => {
    setProveedor({ ...proveedor });
    setViewModal(true);
  };

  const accionEditar = (proveedor) => {
    setProveedor({ ...proveedor });
    setEditModal(true);
  };

  const hideDialog = () => {
    //setSubmitted(false);
    setViewModal(false);
    setEditModal(false);
  };

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
    ruc_proveedor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre_proveedor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
              <em className="mx-2">Buscar por RUC o nombre</em>
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
        <DataTable size="small"
          value={prInactivos}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={["ruc_proveedor", "nombre_proveedor"]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
        >
          <Column
            field="ruc_proveedor"
            header="Ruc"
            sortable
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="nombre_proveedor"
            header="Nombre"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="telefono_proveedor"
            header="Teléfono"
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

      {/* Modal para ver la información del proveedor */}
      <Dialog
        visible={viewModal}
        style={{ width: "35vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header={"Información de " + proveedor.nombre_proveedor}
        modal
        footer={viewDialogFooter}
        onHide={hideDialog}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm">
              <p>
                <span className="align-middle">
                  <ion-icon name="man-outline" color={"black"} size="small" />
                </span>
                <strong className="align-middle">Ruc: </strong>
                <span className="align-middle">{proveedor.ruc_proveedor}</span>
              </p>
            </div>
            <div className="col-sm">
              <p>
                <i className="fa fa-id-card align-middle"></i>
                <strong className="align-middle"> Nombre: </strong>
                <span className="align-middle">
                  {proveedor.nombre_proveedor}
                </span>
              </p>
            </div>
          </div>
          <p>
            <span className="align-middle">
              <ion-icon
                name="person-circle-outline"
                color={"black"}
                size="small"
              />
            </span>
            <strong className="align-middle"> Dirección: </strong>
            <span className="align-middle">
              {proveedor.direccion_proveedor}
            </span>
          </p>
          <p>
            <span className="align-middle">
              <ion-icon
                name="person-circle-outline"
                color={"black"}
                size="small"
              />
            </span>
            <strong className="align-middle"> Teléfono: </strong>
            <span className="align-middle">{proveedor.telefono_proveedor}</span>
          </p>
          <div className="row">
            <div className="col-sm">
              <p>
                <span className="align-middle">
                  <ion-icon name="call-outline" color={"black"} size="small" />
                </span>
                <strong className="align-middle"> Correo: </strong>
                <span className="align-middle">
                  {proveedor.correo_proveedor}
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>

      {/* Dialog para confirmar la reactivación del usuario */}
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
              <p>¿Está seguro que desea activar nuevamente este usuario?</p>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
