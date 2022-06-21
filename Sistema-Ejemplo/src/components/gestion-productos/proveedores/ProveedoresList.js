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
  saveProveedor,
  editProveedor,
  editEstadoProveedor,
} from "../../webServices/Post";
import { validadorIdentidades, validarExistencia } from "../../validaciones/validaciones";
import { toast, ToastContainer } from "react-toastify";

export const ProveedoresList = (props) => {
  const { proveedores } = props;
  const { stateChanger } = props;
  const { idEmpresa } = props;
  const [viewModal, setViewModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [proveedor, setProveedor] = useState({});
  let defaultProveedor = {
    id_proveedor: null,
    ruc_proveedor: "",
    nombre_proveedor: "",
    direccion_proveedor: "",
    telefono_proveedor: "",
    correo_proveedor: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultProveedor });

  const guardarRegistro = async (data) => {
    try {
      const response = await saveProveedor(data);
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
      const response = await editProveedor(proveedor.id_proveedor, proveedor);
      if (response) {
        hideDialog();
        toast.success("Actualización exitosa.");
        stateChanger(true);
      } else {
        toast.error("Error al actualizar el registro seleccionado.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const borrarRegistro = async () => {
    try {
      const response = await editEstadoProveedor(
        proveedor.id_proveedor,
        "INACTIVO"
      );
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

  const onSubmit = (data) => {
    if (validadorIdentidades(data.ruc)) {
      validarExistencia(data.ruc, idEmpresa, "ruc-proveedor").then((res) => {
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

  const accionVer = (proveedor) => {
    setProveedor({ ...proveedor });
    setViewModal(true);
  };

  const accionGuardar = () => {
    setSaveModal(true);
  };
  const accionEditar = (proveedor) => {
    setProveedor({ ...proveedor });
    setEditModal(true);
  };

  const accionBorrar = (proveedor) => {
    setProveedor({ ...proveedor });
    setDeleteModal(true);
  };

  const hideDialog = () => {
    setViewModal(false);
    setEditModal(false);
    setSaveModal(false);
    setDeleteModal(false);
    reset();
  };

  const viewDialogHeader = (
    <>
      <div>
        <h5>Información de {proveedor.nombre_proveedor}</h5>
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

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onInputChange = (e, name) => {
    if (e.target.value !== "") {
      if (name === "telefono") {
        var alph = /^([0-9]{0,10})$/;
        if (alph.test(e.target.value)) {
          const val = (e.target && e.target.value) || "";
          let _proveedor = { ...proveedor };
          _proveedor[`${name}_proveedor`] = val;
          setProveedor(_proveedor);
        } else {
          toast.warning(
            "Este campo no puede contener caracteres alfabéticos. Además, debe tener un mínimo y máximo de 10 dígitos."
          );
        }
      } else if (name === "nombre") {
        var alph = /^[a-zA-Z ]{2,200}$/;
        if (alph.test(e.target.value)) {
          const val = (e.target && e.target.value) || "";
          let _proveedor = { ...proveedor };
          _proveedor[`${name}_proveedor`] = val;
          setProveedor(_proveedor);
        } else {
          toast.warning("El nombre de la empresa no debe contener números.");
        }
      } else {
        const val = (e.target && e.target.value) || "";
        let _proveedor = { ...proveedor };
        _proveedor[`${name}_proveedor`] = val;
        setProveedor(_proveedor);
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
          value={proveedores}
          paginator
          className="p-datatable-responsive-demo"
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
            field="correo_proveedor"
            header="Correo"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="direccion_proveedor"
            header="Dirección"
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
        header={viewDialogHeader}
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
      </Dialog>

      {/* Modal para guardar la información del proveedor */}
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
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        keyfilter={"num"}
                        placeholder="Ej: 1712555555001"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("ruc")}
              </div>
              <div className="ps-1 w-100">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Nombre:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-user" />
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: "Nombre es requerido",
                      pattern: {
                        value:
                          /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/,
                        message: "Debe ingresar solo caracteres alfabéticos",
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
                        placeholder="Ej: Livansud S.A."
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("nombre")}
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
                        placeholder="Ej: 0999878985"
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
                        message: "Correo inválido. Ej: example@email.com",
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
                        placeholder="Ej: usurio@correo.com"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("correo")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="direccion"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Dirección:{" "}
                </label>
                <span
                  className="p-input-icon-left w-100"
                  style={{ paddingRight: 20 }}
                >
                  <i className="fa fa-map" />
                  <Controller
                    name="direccion"
                    control={control}
                    rules={{
                      required: "Dirección es obligatorio.",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Santo Domingo EC-210202"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("direccion")}
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
        <ToastContainer autoClose={5000} />
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
                  keyfilter={"num"}
                  autoFocus
                  value={proveedor.ruc_proveedor}
                  onChange={(e) => onInputChange(e, "ruc")}
                  className="w-100"
                  disabled
                />
              </span>
            </div>
            <div className="ps-1 w-100">
              <label
                htmlFor="nombre"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Nombre:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-user" />
                <InputText
                  id="nombre"
                  type="text"
                  autoFocus
                  value={proveedor.nombre_proveedor}
                  onChange={(e) => onInputChange(e, "nombre")}
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
                  value={proveedor.telefono_proveedor}
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
                  value={proveedor.correo_proveedor}
                  onChange={(e) => onInputChange(e, "correo")}
                  required
                  className="w-100"
                />
              </span>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="w-100 mt-2">
              <label
                htmlFor="direccion"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Dirección:{" "}
              </label>
              <span
                className="p-input-icon-left w-100"
                style={{ paddingRight: 20 }}
              >
                <i className="fa fa-map" />
                <InputText
                  id="direccion"
                  type="text"
                  autoFocus
                  value={proveedor.direccion_proveedor}
                  onChange={(e) => onInputChange(e, "direccion")}
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
        <ToastContainer autoClose={5000} />
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
            {proveedor.nombre_proveedor} ?
          </span>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>

      <ToastContainer autoClose={5000} />
    </>
  );
};
