import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { useForm, Controller } from "react-hook-form";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import {
  editImagenProducto,
  editProducto,
  saveImagenProducto,
  saveProducto,
} from "../../webServices/Post";
import { toast, ToastContainer } from "react-toastify";
import { get } from "../../webServices/Get";

export const ProductosList = (props) => {
  const { categorias } = props;
  const { proveedores } = props;
  const { stateChanger } = props;
  const { idEmpresa } = props;
  const { data } = props;
  const [item, setitem] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [file, setfile] = useState(null);
  const [img, setimg] = useState(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const opciones = [
    { name: "0%", value: 0 },
    { name: "12%", value: 0.12 },
  ];

  const getImg = async (id, tipo) => {
    if (tipo === "ver") {
      const img_name = await get(`producto/imagen/${id}`);
      if (img_name !== undefined) {
        setimg(img_name.name);
        setViewModal(true);
      } else {
        toast.error("Error al cargar la imagen");
      }
    }
    if (tipo === "editar") {
      const img_name = await get(`producto/imagen/${id}`);
      if (img_name !== undefined) {
        setimg(img_name.name);
        setEditModal(true);
      } else {
        toast.error("Error al cargar la imagen");
      }
    }
  };

  const guardarRegistro = async (data, imagenData) => {
    try {
      const response = await saveProducto(data);
      if (response.id > 0) {
        if (imagenData) {
          await saveImagenProducto(imagenData, response.id);
        }
        hideDialog();
        stateChanger(true);
        toast.success("Registro exitoso");
        reset();
      } else {
        toast.error("Error al guardar");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const actualizarRegistro = async () => {
    try {
      const response = await editProducto(item.id_prod, item);
      if (response) {
        if (file) {
          const formdata = new FormData();
          formdata.append("image", file);
          const responseImage = await editImagenProducto(
            formdata,
            item.id_prod
          );
          console.log(responseImage);
        }
        hideDialog();
        toast.success("Actualización exitosa.");
        stateChanger(true);
      } else {
        toast.error("Error al actualizar el registro seleccionado");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Se ha producido un error. Comuníquese con el proveedor del servicio."
      );
    }
  };

  const onSubmit = (data) => {
    if (
      data.proveedor === undefined ||
      data.categoria === undefined ||
      data.iva === undefined
    ) {
      toast.error("Debe ingresar todos los campos del formulario");
    } else {
      if (file) {
        data.id_empresa = idEmpresa;
        const formdata = new FormData();
        formdata.append("image", file);
        guardarRegistro(data, formdata);

        document.getElementById("fileinput").value = null;
        setfile(null);
      } else {
        guardarRegistro(data, null);
      }
    }
  };

  const onChangeProveedor = (e) => {
    if (e.target.value !== "") {
      const val = e.target && e.target.value;
      let _item = { ...item };
      _item[`proveedor_id_proveedor`] = val;
      setitem(_item);
    }
  };

  const onChangeCategoria = (e) => {
    if (e.target.value !== "") {
      const val = e.target && e.target.value;
      let _item = { ...item };
      _item[`categoria_id_cat`] = val;
      setitem(_item);
    }
  };

  const selectedHandler = (e) => {
    setfile(e.target.files[0]);
  };

  const onInputChange = (e, name) => {
    if (e.target.value !== "") {
      let _item = { ...item };
      if (
        name === "nombre" ||
        name === "descripcion" ||
        name === "marca" ||
        name === "preciounitario" ||
        name === "preciomayoreo" ||
        name === "iva"
      ) {
        const val = e.target && e.target.value;
        _item[`${name}_prod`] = val;
        setitem(_item);
      }
      if (name === "cantidad") {
        const val = e.target && e.target.value;
        _item[`${name}_stock_prod`] = val;
        setitem(_item);
      }
    } else {
      toast.error("Es obligatorio llenar todos los campos.");
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
      </>
    );
  };

  const accionVer = (producto) => {
    setitem({ ...producto });
    getImg(producto.id_prod, "ver");
  };

  const accionGuardar = () => {
    setSaveModal(true);
  };

  const accionEditar = (producto) => {
    setitem({ ...producto });
    getImg(producto.id_prod, "editar");
  };

  const hideDialog = () => {
    setimg(null);
    setViewModal(false);
    setEditModal(false);
    setSaveModal(false);
    reset();
  };

  const viewDialogFooter = (
    <>
      <div>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          autoFocus
          className="p-button-outlined p-button-secondary"
          onClick={hideDialog}
        />
      </div>
    </>
  );

  const viewDialogHeader = (
    <>
      <div>
        <h5>Información Registrada</h5>
      </div>
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

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  /////////////////////Busqueda global/////////////
  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    codigo_prod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    nombre_prod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    marca_prod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
              <em className="mx-2">Buscar por código, nombre o marca</em>
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
          value={data}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={["codigo_prod", "nombre_prod", "marca_prod"]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
        >
          <Column
            field="codigo_prod"
            header="Código"
            sortable
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="nombre_prod"
            header="Nombre"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
            sortable
          ></Column>
          <Column
            field="marca_prod"
            header="Marca"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="nombre_proveedor"
            header="Proveedor"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="nombre_cat"
            header="Categoría"
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

      {/* Modal para ver la información del personal */}
      <Dialog
        visible={viewModal}
        style={{ width: "60vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header={viewDialogHeader}
        modal
        footer={viewDialogFooter}
        onHide={hideDialog}
      >
        <div className="container py-0">
          <div className="row">
            <div className="col-6 px-0 border">
              <div className="d-flex h-100 justify-content-center align-items-center">
                {img ? (
                  <img
                    src={"http://3.134.76.83:5001/" + img}
                    alt={"Imagen referencial"}
                    style={{ maxHeight: "320px" }}
                    className="d-block mx-auto w-100 h-100"
                  />
                ) : (
                  <i className="fa fa-infinity text-primary" style={{ fontSize: "150px" }} />
                )}
              </div>
            </div>
            <div className="col-6 bg-light">
              <h5 className="mt-2 border-bottom fw-bold">Detalles:</h5>
              <p className="my-1">
                <i className="fa fa-user-tag align-middle"></i>
                <strong className="align-middle"> Código: </strong>
                <span className="align-middle">{item.codigo_prod}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-percent align-middle"></i>
                <strong className="align-middle"> IVA: </strong>
                <span className="align-middle">{item.iva_prod}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-tag align-middle"></i>
                <strong className="align-middle"> Nombre o detalle: </strong>
                <span className="align-middle">{item.nombre_prod}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-tag align-middle"></i>
                <strong className="align-middle"> Descripción: </strong>
                <span className="align-middle">{item.descripcion_prod}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-copyright align-middle"></i>
                <strong className="align-middle"> Marca: </strong>
                <span className="align-middle">{item.marca_prod}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-money-bill align-middle"></i>
                <strong className="align-middle"> Precio Unitario: </strong>
                <span className="align-middle">{item.preciounitario_prod}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-dollar-sign align-middle"></i>
                <strong className="align-middle"> Precio al por mayor: </strong>
                <span className="align-middle">{item.preciomayoreo_prod}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-th-large align-middle"></i>
                <strong className="align-middle"> Cantidad: </strong>
                <span className="align-middle">{item.cantidad_stock_prod}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-tags align-middle"></i>
                <strong className="align-middle"> Categoría: </strong>
                <span className="align-middle">{item.nombre_cat}</span>
              </p>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Modal para guardar la información del personal */}
      <Dialog
        visible={saveModal}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Registrar información"
        modal
        footer={saveDialogFooter}
        onHide={hideDialog}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="container-fluid px-4 py-2 align-items-center justify-content-center bg-light">
            <div className="d-sm-flex">
              <div className="w-100">
                <label
                  htmlFor="codigo"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Código:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-user-tag" />
                  <Controller
                    name="codigo"
                    control={control}
                    rules={{
                      required: "Código es requerido",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: PROD-001"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("codigo")}
              </div>
              <div className="ps-1 w-100">
                <label
                  htmlFor="proveedor"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Proveedor:
                </label>
                <Controller
                  name="proveedor"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={proveedores}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="nombre_proveedor"
                      optionValue="id_proveedor"
                      placeholder="Selecciona"
                    />
                  )}
                />
              </div>
              <div className="ps-1 w-100">
                <label
                  htmlFor="categoria"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Categoría:
                </label>
                <Controller
                  name="categoria"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={categorias}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="nombre_cat"
                      optionValue="id_cat"
                      placeholder="Selecciona"
                    />
                  )}
                />
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Nombre o detalle:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-tag" />
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: "Nombre es requerido",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Coca Cola 1lt"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("nombre")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="descripcion"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Descripción:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-tag" />
                  <Controller
                    name="descripcion"
                    control={control}
                    rules={{
                      required: "Descripción es obligatoria.",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Bebida gaseosa de 1lt"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("descripcion")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="marca"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Marca:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-copyright" />
                  <Controller
                    name="marca"
                    control={control}
                    rules={{
                      required: "Marca es requerida",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="text"
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: Coca Cola"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("marca")}
              </div>
              <div className="ps-1 w-100 mt-2">
                <label
                  htmlFor="preciounitario"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  $ por unidad:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-money-bill-alt" />
                  <Controller
                    name="preciounitario"
                    control={control}
                    rules={{
                      required: "Precio por unidad es requerido",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        keyfilter={"num"}
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: 2.25"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("preciounitario")}
              </div>
              <div className="ps-1 w-100 mt-2">
                <label
                  htmlFor="preciomayoreo"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  $ Al por Mayor:
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-dollar-sign" />
                  <Controller
                    name="preciomayoreo"
                    control={control}
                    rules={{
                      required: "Precio al por mayor es requerido",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        keyfilter={"num"}
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: 2.25"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("preciomayoreo")}
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  htmlFor="cantidad"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Cantidad:
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-calculator" />
                  <Controller
                    name="cantidad"
                    control={control}
                    rules={{
                      required: "Cantidad es requerida",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        keyfilter={"num"}
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej: 20"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("cantidad")}
              </div>
              <div className="ps-1 w-100 mt-2">
                <label
                  htmlFor="iva"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  IVA:
                </label>
                <Controller
                  name="iva"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      options={opciones}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      optionValue="value"
                      placeholder="Selecciona"
                    />
                  )}
                />
              </div>
            </div>
            <div className="d-sm-flex">
              <div className="w-100 mt-2">
                <label
                  style={{ fontWeight: "bold" }}
                  className="align-middle my-1"
                >
                  Imagen de Referencia (Opcional):
                </label>
                <div>
                  <input
                    id="fileinput"
                    onChange={selectedHandler}
                    className="form-control"
                    type="file"
                  />
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
          </div>
        </form>
        <ToastContainer autoClose={5000} />
      </Dialog>

      {/* Modal para guardar la información del personal */}
      <Dialog
        visible={editModal}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Actualizar información"
        modal
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="container-fluid px-2 align-items-center justify-content-center">
          <div className="row bg-light py-2 px-2">
            <div className="col-3 px-2 py-2 border text-center">
              {img ? (
                <img
                  src={"http://3.134.76.83:5001/" + img}
                  alt={"Imagen referencial"}
                  style={{ maxHeight: "320px" }}
                  className="d-block mx-auto w-100"
                />
              ) : (
                <i className="fa fa-infinity text-primary" style={{ fontSize: "150px" }} />
              )}
              <div className="d-sm-flex">
                <div className="w-100 mt-2">
                  <label
                    style={{ fontWeight: "bold" }}
                    className="align-middle my-1"
                  >
                    Imagen de Referencia (Opcional):
                  </label>
                  <div className="mx-2">
                    <input
                      id="fileinput"
                      onChange={selectedHandler}
                      className="form-control"
                      type="file"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9 py-2">
              <div className="d-sm-flex">
                <div className="w-100">
                  <label
                    htmlFor="codigo"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Código:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-user-tag" />
                    <InputText
                      id="codigo"
                      type="text"
                      autoFocus
                      value={item.codigo_prod}
                      disabled
                      className="w-100"
                    />
                  </span>
                </div>
                <div className="ps-1 w-100">
                  <label
                    htmlFor="proveedor"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Proveedor:
                  </label>
                  <Dropdown
                    id="proveedor"
                    value={item.proveedor_id_proveedor}
                    options={proveedores}
                    onChange={(e) => onChangeProveedor(e)}
                    optionLabel="nombre_proveedor"
                    optionValue="id_proveedor"
                    className="w-100"
                  />
                </div>
                <div className="ps-1 w-100">
                  <label
                    htmlFor="categoria"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Categoría:
                  </label>
                  <Dropdown
                    id="categoria"
                    value={item.categoria_id_cat}
                    options={categorias}
                    onChange={(e) => onChangeCategoria(e)}
                    optionLabel="nombre_cat"
                    optionValue="id_cat"
                    className="w-100"
                  />
                </div>
              </div>
              <div className="d-sm-flex">
                <div className="w-100 mt-2">
                  <label
                    htmlFor="nombre"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Nombre o detalle:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-tag" />
                    <InputText
                      id="nombre"
                      type="text"
                      autoFocus
                      value={item.nombre_prod}
                      onChange={(e) => onInputChange(e, "nombre")}
                      required
                      className="w-100"
                    />
                  </span>
                </div>
              </div>
              <div className="d-sm-flex">
                <div className="w-100 mt-2">
                  <label
                    htmlFor="descripcion"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Descripción:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-tag" />
                    <InputText
                      id="descripcion"
                      type="text"
                      autoFocus
                      value={item.descripcion_prod}
                      onChange={(e) => onInputChange(e, "descripcion")}
                      required
                      className="w-100"
                    />
                  </span>
                </div>
              </div>
              <div className="d-sm-flex">
                <div className="w-100 mt-2">
                  <label
                    htmlFor="marca"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Marca:{" "}
                  </label>

                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-copyright" />
                    <InputText
                      id="marca"
                      type="text"
                      autoFocus
                      value={item.marca_prod}
                      onChange={(e) => onInputChange(e, "marca")}
                      required
                      className="w-100"
                    />
                  </span>
                </div>
                <div className="ps-1 w-100 mt-2">
                  <label
                    htmlFor="preciounitario"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    $ por unidad:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-money-bill" />
                    <InputText
                      id="preciounitario"
                      keyfilter={"num"}
                      value={item.preciounitario_prod}
                      onChange={(e) => onInputChange(e, "preciounitario")}
                      required
                      className="w-100"
                    />
                  </span>
                </div>
                <div className="ps-1 w-100 mt-2">
                  <label
                    htmlFor="preciomayoreo"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    $ al por Mayor:
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-dollar-sign" />
                    <InputText
                      id="preciomayoreo"
                      keyfilter={"num"}
                      value={item.preciomayoreo_prod}
                      onChange={(e) => onInputChange(e, "preciomayoreo")}
                      required
                      className="w-100"
                    />
                  </span>
                </div>
              </div>
              <div className="d-sm-flex">
                <div className="w-100 mt-2">
                  <label
                    htmlFor="cantidad"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Cantidad:
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-calculator" />
                    <InputText
                      id="cantidad"
                      keyfilter={"num"}
                      value={item.cantidad_stock_prod}
                      onChange={(e) => onInputChange(e, "cantidad")}
                      required
                      className="w-100"
                    />
                  </span>
                </div>
                <div className="ps-1 w-100 mt-2">
                  <label
                    htmlFor="iva"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    IVA:
                  </label>
                  <Dropdown
                    id="iva"
                    value={item.iva_prod}
                    options={opciones}
                    onChange={(e) => onInputChange(e, "iva")}
                    optionLabel="name"
                    optionValue="value"
                    className="w-100"
                  />
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
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
      <ToastContainer autoClose={5000} />
    </>
  );
};
