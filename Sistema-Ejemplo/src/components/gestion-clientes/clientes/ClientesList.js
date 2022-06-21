import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import {
  saveCliente,
  editCliente,
  editEstadoCliente,
} from "../../webServices/Post";
import {
  validarTelefonos,
  validarLetras,
  validarCorreo,
  validarExistencia,
  validadorIdentidades,
} from "../../validaciones/validaciones";
import { toast, ToastContainer } from "react-toastify";

export const ClientesList = (props) => {
  const { stateChanger } = props;
  const { clientesactivos } = props;
  const { idEmpresa } = props;
  const [cliente, setCliente] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const guardarRegistro = async (data) => {
    try {
      const response = await saveCliente(data);
      if (response) {
        hideDialog();
        reset();
        toast.success("Registro exitoso.");
        stateChanger(true);
      } else {
        toast.error("Ups! algo ha salido mal. Intente nuevamente. ");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const actualizarRegistro = async () => {
    try {
      const response = await editCliente(cliente.id_cliente, cliente);
      if (response) {
        hideDialog();
        stateChanger(true);
        toast.success("Actualización exitosa.");
      } else {
        toast.error("Error al actualizar el registro seleccionado.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const borrarRegistro = async () => {
    try {
      const response = await editEstadoCliente(cliente.id_cliente, "INACTIVO");
      if (response) {
        hideDialog();
        toast.success("Exito al realizar su petición.");
        stateChanger(true);
      } else {
        toast.error("Error al dar de baja el registro seleccionado.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const hideDialog = () => {
    setViewModal(false);
    setEditModal(false);
    setSaveModal(false);
    setDeleteModal(false);
    reset();
  };

  const onSubmit = (data) => {
    if (validadorIdentidades(data.ruc)) {
      validarExistencia(data.ruc, idEmpresa, "ruc-cliente").then((res) => {
        if (res) {
          toast.error("RUC en uso. Verifique los datos ingresados.");
        } else {
          data.id_empresa = idEmpresa;
          guardarRegistro(data);
        }
      });
    } else {
      toast.error("Número de RUC ingresado no es válido");
    }
  };

  const accionVer = (cliente) => {
    setCliente({ ...cliente });
    setViewModal(true);
  };

  const accionGuardar = () => {
    setSaveModal(true);
  };

  const accionEditar = (cliente) => {
    setCliente({ ...cliente });
    setEditModal(true);
  };

  const accionBorrar = (cliente) => {
    setCliente({ ...cliente });
    setDeleteModal(true);
  };

  //DIALOGS

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const saveDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
      />
    </>
  );

  const editDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
      />
    </>
  );

  const deleteDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
      />
      <Button
        label="Borrar"
        icon="pi pi-trash"
        autoFocus
        className="p-button-outlined p-button-danger"
        onClick={borrarRegistro}
      />
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

  const viewDialogHeader = (
    <>
      <div>
        <h5>
          Información de {cliente.nombre_cliente} {cliente.apellido_cliente}
        </h5>
      </div>
    </>
  );

  const onInputChange = (e, name) => {
    if (e.target.value !== "") {
      let _cliente = { ...cliente };
      if (name === "nombre" || name === "apellido") {
        if (validarLetras(e.target.value)) {
          const val = (e.target && e.target.value) || "";
          _cliente[`${name}_cliente`] = val;
          setCliente(_cliente);
        }
      }
      if (name === "telefono") {
        if (validarTelefonos(e.target.value)) {
          const val = (e.target && e.target.value) || "";
          _cliente[`${name}_cliente`] = val;
          setCliente(_cliente);
        }
      }
      if (name === "correo") {
        if (validarCorreo(e.target.value)) {
          const val = (e.target && e.target.value) || "";
          _cliente[`${name}_cliente`] = val;
          setCliente(_cliente);
        }
      }
    } else {
      toast.warning("Es obligatorio llenar todos los campos.");
    }
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
          value={clientesactivos}
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

      {/* Modal para guardar la información del personal */}
      <Dialog
        visible={saveModal}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Registrar información"
        modal
        footer={saveDialogFooter}
        onHide={hideDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="container-fluid px-4 align-items-center justify-content-center">
            <div className="d-sm-flex">
              <div className="pe-1 w-100">
                <label
                  htmlFor="ruc"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Ruc:{" "}
                </label>
                <span className="p-float-label p-input-icon-left">
                  <i className="fa fa-id-card" />
                  <Controller
                    name="ruc"
                    control={control}
                    rules={{
                      required: "Número de RUC es obligatorio.",
                      pattern: {
                        value: /^[0-9]{0,13}$/,
                        message: "RUC debe ser numérico y tener 13 dígitos",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        keyfilter={"num"}
                        placeholder="Ej. 2302455585001"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("ruc")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="pe-1 w-100">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Nombres:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-user" />
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: "Nombre es obligatorio.",
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                        message: "Nombre inválido",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej. Pedro"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("nombre")}
              </div>
              <div className="ps-1 w-100">
                <label
                  htmlFor="apellido"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Apellidos:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-user" />
                  <Controller
                    name="apellido"
                    control={control}
                    rules={{
                      required: "Apellido es obligatorio.",
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                        message: "Apellido inválido",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej. Castillo"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("apellido")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="pe-1 w-100 mt-2">
                <label
                  htmlFor="telefono"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Teléfono:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-phone-square-alt" />
                  <Controller
                    name="telefono"
                    control={control}
                    rules={{
                      required: "Teléfono es obligatorio.",
                      pattern: {
                        value: /^[0]{1}[2-9]{1}[0-9]{7,8}$/,
                        message: "Número de teléfono inválido",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        keyfilter={"num"}
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej. 0999878985"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("telefono")}
              </div>
              <div className="ps-1 w-100 mt-2">
                <label
                  htmlFor="correo"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Correo:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-envelope" />
                  <Controller
                    name="correo"
                    control={control}
                    rules={{
                      required: "Correo es obligatorio.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Correo inválido. Ej. example@email.com",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej. usurio@correo.com"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("correo")}
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              className="mt-3 w-25"
              label="Guardar"
              icon="pi pi-check"
              autoFocus
              type="submit"
            />
          </div>
        </form>
        <ToastContainer autoClose={5000} style={{zIndex: 1}} />
      </Dialog>

      {/* Modal para editar la información del personal */}
      <Dialog
        visible={editModal}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Actualizar información"
        modal
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="container-fluid px-4 align-items-center justify-content-center">
          <div className="d-sm-flex">
            <div className="pe-1 w-100">
              <label
                htmlFor="ruc"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Ruc:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-user" />
                <InputText
                  id="ruc"
                  type="text"
                  autoFocus
                  value={cliente.ruc_cliente}
                  onChange={(e) => onInputChange(e, "ruc")}
                  disabled
                  className="w-100"
                />
              </span>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="pe-1 w-100">
              <label
                htmlFor="nombre"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Nombres:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-user" />
                <InputText
                  id="nombre"
                  type="text"
                  autoFocus
                  value={cliente.nombre_cliente}
                  onChange={(e) => onInputChange(e, "nombre")}
                  required
                  className="w-100"
                />
              </span>
            </div>
            <div className="ps-1 w-100">
              <label
                htmlFor="apellido"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Apellidos:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-user" />
                <InputText
                  id="apellido"
                  type="text"
                  autoFocus
                  value={cliente.apellido_cliente}
                  onChange={(e) => onInputChange(e, "apellido")}
                  required
                  className="w-100"
                />
              </span>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="pe-1 w-100 mt-2">
              <label
                htmlFor="telefono"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Teléfono:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-phone-square-alt" />
                <InputText
                  id="telefono"
                  keyfilter={"num"}
                  autoFocus
                  value={cliente.telefono_cliente}
                  onChange={(e) => onInputChange(e, "telefono")}
                  required
                  className="w-100"
                />
              </span>
            </div>
            <div className="ps-1 w-100 mt-2">
              <label
                htmlFor="correo"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Correo:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-envelope" />
                <InputText
                  id="correo"
                  type="email"
                  autoFocus
                  value={cliente.correo_cliente}
                  onChange={(e) => onInputChange(e, "correo")}
                  required
                  className="w-100"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            className="mt-3 w-25"
            label="Actualizar"
            icon="pi pi-check"
            autoFocus
            onClick={actualizarRegistro}
          />
        </div>
        <ToastContainer autoClose={5000} style={{zIndex: 1}} />
      </Dialog>

      {/* Diálodo para eliminar el registro */}
      <Dialog
        visible={deleteModal}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDialogFooter}
        onHide={hideDialog}
      >
        <div className="confirmation-content text-center">
          <i
            className="pi pi-exclamation-triangle p-mr-3 text-danger"
            style={{ fontSize: "2rem" }}
          />
          <br />
          <span>
            ¿Estás seguro de querer eliminar el registro de{" "}
            {cliente.nombre_cliente} {cliente.apellido_cliente}?
          </span>
        </div>
        <ToastContainer autoClose={5000} style={{zIndex: 1}} />
      </Dialog>

      <ToastContainer autoClose={5000} style={{zIndex: 1}} />
    </>
  );
};
