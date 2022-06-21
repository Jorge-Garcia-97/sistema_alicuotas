import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { toast, ToastContainer } from "react-toastify";
import { FilterMatchMode } from "primereact/api";
import { get } from "../../webServices/Get";
import {
  editEstablecimiento,
  editImagenEstab,
  saveEstablecimiento,
  saveImagenEstab,
} from "../../webServices/Post";
import { Mapa } from "../../rutas/Mapa";

export const EstablecimientoList = (props) => {
  const { establecimientos } = props;
  const { clientesactivos } = props;
  const { stateChanger } = props;
  const [item, setitem] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [file, setfile] = useState(null);
  const [img, setimg] = useState(null);
  const [latitud, setlatitud] = useState(null);
  const [longitud, setlongitud] = useState(null);
  const [ubicacion, setubicacion] = useState(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  let nombres = [];

  clientesactivos.map((cliente) => {
    nombres.push({
      data:
        "CLIENTE: " +
        cliente.nombre_cliente +
        " " +
        cliente.apellido_cliente +
        " - RUC: " +
        cliente.ruc_cliente,
      value: cliente.id_cliente,
    });
  });

  const getImg = async (id, tipo) => {
    if (tipo === "ver") {
      const img_name = await get(`establecimiento/imagen/${id}`);
      if (img_name !== undefined) {
        setimg(img_name.name);
        setViewModal(true);
      } else {
        toast.error("Error al cargar la imagen");
      }
    }
    if (tipo === "editar") {
      const img_name = await get(`establecimiento/imagen/${id}`);
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
      const response = await saveEstablecimiento(data);
      if (response.id > 0) {
        if (imagenData) {
          await saveImagenEstab(imagenData, response.id);
        }
        hideDialog();
        reset();
        stateChanger(true);
        toast.success("Registro exitoso");
      } else {
        toast.error("Error al guardar");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const actualizarRegistro = async () => {
    try {
      const response = await editEstablecimiento(item.id_estab, item);
      if (response) {
        if (file) {
          if (img) {
            const formdata = new FormData();
            formdata.append("image", file);
            await editImagenEstab(formdata, item.id_estab);
          }else{
            const formdata = new FormData();
            formdata.append("image", file);
            await saveImagenEstab(formdata, item.id_estab);
          }
        }
        hideDialog();
        toast.success("Actualización exitosa.");
        stateChanger(true);
      } else {
        toast.error("Error al actualizar el registro seleccionado");
      }
    } catch (error) {
      toast.error(
        "Se ha producido un error. Comuníquese con el proveedor del servicio."
      );
    }
  };

  const onSubmit = (data) => {
    if (data.id_cliente === undefined) {
      toast.error("Debe ingresar todos los campos del formulario");
    } else {
      if (longitud && latitud) {
        data.longitud = longitud;
        data.latitud = latitud;
        if (file) {
          const formdata = new FormData();
          formdata.append("image", file);
          guardarRegistro(data, formdata);

          document.getElementById("fileinput").value = null;
          setfile(null);
        } else {
          guardarRegistro(data, null);
        }
      } else {
        toast.warning("Debe ingresar todos los campos del formulario");
      }
    }
  };

  const onInputChange = (e, name) => {
    if (e.target.value !== "") {
      let _item = { ...item };
      const val = e.target && e.target.value;
      _item[`${name}_estab`] = val;
      setitem(_item);
    } else {
      toast.error("Es obligatorio llenar todos los campos.");
    }
  };

  const selectedHandler = (e) => {
    setfile(e.target.files[0]);
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const hideDialog = () => {
    setimg(null);
    setlatitud(null);
    setlongitud(null);
    setViewModal(false);
    setEditModal(false);
    setSaveModal(false);
    reset();
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

  const accionVer = async (establecimiento) => {
    setitem({ ...establecimiento });
    await getImg(establecimiento.id_estab, "ver");
  };

  const accionGuardar = () => {
    setSaveModal(true);
  };

  const accionEditar = async (establecimiento) => {
    setitem({ ...establecimiento });
    await getImg(establecimiento.id_estab, "editar");
  };

  /////////////////////Busqueda global/////////////
  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    codigo_estab: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
              <em className="mx-3">Buscar por código</em>
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

  const viewDialogHeader = (
    <>
      <div>
        <h5>Información Registrada</h5>
      </div>
    </>
  );

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

  return (
    <>
      <div className="card">
        <DataTable
          size="small"
          value={establecimientos}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={["codigo_estab"]}
          header={header}
          emptyMessage={"No se han encontrado coincidencias."}
        >
          <Column
            field={"codigo_estab"}
            header={"Código"}
            sortable
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field={"ruc_cliente"}
            header="Cliente asociado"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field={"nombre_cliente"}
            header="Nombre del Cliente"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="telefono_cliente"
            header="Teléfono"
            bodyClassName={"py-1"}
            className={"py-2 bg-light fw-bold"}
          ></Column>
          <Column
            field="ubicacion_estab"
            header="Ubicación"
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
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header={viewDialogHeader}
        modal
        footer={viewDialogFooter}
        onHide={hideDialog}
      >
        <div className="container py-0">
          <div className="row">
            <div className="col-7 px-0 border">
              <div className="d-flex h-100 justify-content-center align-items-center">
                {img ? (
                  <img
                    src={"http://3.134.76.83:5001/" + img}
                    alt={"Imagen referencial"}
                    style={{ maxHeight: "320px" }}
                    className="d-block mx-auto w-100 h-100"
                  />
                ) : (
                  <i
                    className="fa fa-infinity text-primary"
                    style={{ fontSize: "150px" }}
                  />
                )}
              </div>
            </div>
            <div className="col-5 bg-light">
              <h5 className="mt-2 border-bottom fw-bold">Detalles:</h5>
              <p className="my-1">
                <i className="fa fa-user-tag align-middle"></i>
                <strong className="align-middle"> Código: </strong>
                <span className="align-middle">{item.codigo_estab}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-user align-middle"></i>
                <strong className="align-middle"> Cliente: </strong>
                <span className="align-middle">
                  {item.nombre_cliente + " " + item.apellido_cliente}
                </span>
              </p>
              <p className="my-1">
                <i className="fa fa-id-card align-middle"></i>
                <strong className="align-middle"> RUC Cliente: </strong>
                <span className="align-middle">{item.ruc_cliente}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-phone-square-alt align-middle"></i>
                <strong className="align-middle"> Teléfono: </strong>
                <span className="align-middle">{item.telefono_cliente}</span>
              </p>
              <p className="my-1">
                <i className="fa fa-map-marker-alt align-middle"></i>
                <strong className="align-middle"> Ubicación: </strong>
                <span className="align-middle">{item.ubicacion_estab}</span>
              </p>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Modal para guardar la información dE CATEGORIA */}
      <Dialog
        visible={saveModal}
        style={{ width: "80vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Registrar información"
        modal
        footer={saveDialogFooter}
        onHide={hideDialog}
      >
        <div className="container-fluid px-4 py-2 align-items-center justify-content-center bg-light">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12">
              <Mapa
                altitudMapa={"300px"}
                setLongitud={setlongitud}
                setLatitud={setlatitud}
              />
              <div className="d-sm-flex mt-2">
                <div className="w-100">
                  <label
                    htmlFor="codigo"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Longitud:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-map-pin" />
                    <InputText
                      id="longitud"
                      value={longitud}
                      className="w-100"
                    />
                  </span>
                </div>
                <div className="ps-1 w-100">
                  <label
                    htmlFor="codigo"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Latitud:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-map-pin" />
                    <InputText
                      id="longitud"
                      value={longitud}
                      className="w-100"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                          required: "Código es obligatorio.",
                        }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            autoFocus
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            placeholder="Ej. EST-001"
                          />
                        )}
                      />
                    </span>
                    {getFormErrorMessage("codigo")}
                  </div>
                </div>
                <div className="d-sm-flex">
                  <div className="w-100 mt-2">
                    <label
                      htmlFor="ubicacion"
                      style={{ fontWeight: "bold" }}
                      className="align-middle"
                    >
                      Ubicación:{" "}
                    </label>
                    <span className="p-input-icon-left">
                      <i className="fa fa-map" />
                      <Controller
                        name="ubicacion"
                        control={control}
                        rules={{
                          required: "Ubicación es obligatoria.",
                        }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            autoFocus
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            placeholder="Ej. Santo Domingo. Av. Santa Rosa y Guatemala"
                          />
                        )}
                      />
                    </span>
                    {getFormErrorMessage("ubicacion")}
                  </div>
                </div>
                <div className="d-sm-flex">
                  <div className="w-100 mt-2">
                    <label
                      htmlFor="id_cliente"
                      style={{ fontWeight: "bold" }}
                      className="align-middle"
                    >
                      Cliente asociado:
                    </label>
                    <Controller
                      name="id_cliente"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          options={nombres}
                          onChange={(e) => field.onChange(e.value)}
                          optionLabel={"data"}
                          optionValue={"value"}
                          placeholder="Seleccionar un cliente"
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
                    className="mt-5 w-50"
                    label="Guardar"
                    icon="pi pi-check"
                    autoFocus
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>

      {/* Modal para editar la información de la categoria */}
      <Dialog
        visible={editModal}
        style={{ width: "80vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Actualizar información"
        modal
        footer={editDialogFooter}
        onHide={hideDialog}
      >
        <div className="container-fluid px-4 py-2 align-items-center justify-content-center bg-light">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12">
              <Mapa
                altitudMapa={"300px"}
                setLongitud={setlongitud}
                setLatitud={setlatitud}
              />
              <div className="d-sm-flex mt-2">
                <div className="w-100">
                  <label
                    htmlFor="longitud"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Longitud:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-map-pin" />
                    <InputText
                      id="longitud"
                      value={item.longitud_estab}
                      onChange={(e) => onInputChange(e, "longitud")}
                      className="w-100"
                    />
                  </span>
                </div>
                <div className="ps-1 w-100">
                  <label
                    htmlFor="latitud"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Latitud:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-map-pin" />
                    <InputText
                      id="longitud"
                      value={item.latitud_estab}
                      onChange={(e) => onInputChange(e, "latitud")}
                      className="w-100"
                    />
                  </span>
                </div>
              </div>
              <div className="d-sm-flex">
                <div className="w-100 mt-2">
                  <label
                    htmlFor="ubicacion"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Ubicación:{" "}
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-map" />
                    <InputText
                      id="ubicacion"
                      type="text"
                      autoFocus
                      value={item.ubicacion_estab}
                      onChange={(e) => onInputChange(e, "ubicacion")}
                      required
                      className="w-100"
                    />
                  </span>
                </div>
                <div className="ps-1 w-100 mt-2">
                  <label
                    htmlFor="cliente"
                    style={{ fontWeight: "bold" }}
                    className="align-middle"
                  >
                    Cliente asociado:
                  </label>
                  <Dropdown
                    id="cliente"
                    value={item.cliente_id_cliente}
                    options={clientesactivos}
                    optionLabel="nombre_cliente"
                    optionValue="id_cliente"
                    className="w-100"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="d-flex justify-content-center align-items-center">
                {img ? (
                  <img
                    src={"http://3.134.76.83:5001/" + img}
                    alt={"Imagen referencial"}
                    style={{ maxHeight: "347px" }}
                    className="d-block mx-auto w-100 mt-1"
                  />
                ) : (
                  <i
                    className="fa fa-infinity text-primary"
                    style={{ fontSize: "150px" }}
                  />
                )}
              </div>
              <div className="d-sm-flex">
                <div className="w-100 mt-2">
                  <label
                    style={{ fontWeight: "bold" }}
                    className="align-middle my-1"
                  >
                    Imagen de Referencia:
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
              <div className="d-sm-flex mt-2">
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
                      value={item.codigo_estab}
                      onChange={(e) => onInputChange(e, "codigo")}
                      disabled
                      className="w-100"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            className="mt-4 w-25"
            label="Actualizar"
            icon="pi pi-check"
            autoFocus
            onClick={actualizarRegistro}
          />
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
      <ToastContainer autoClose={5000} />
    </>
  );
};
