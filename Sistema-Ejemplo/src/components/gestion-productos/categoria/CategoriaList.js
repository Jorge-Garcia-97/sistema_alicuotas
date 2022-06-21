import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import { saveCategoria, editCategoria } from "../../webServices/Post";
import { validarLetras } from "../../validaciones/validaciones";
import { toast, ToastContainer } from "react-toastify";

export const CategoriaList = (props) => {
  const { categorias } = props;
  const { idEmpresa } = props;
  const { stateChanger } = props;
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [categoria, setCategoria] = useState({});
  let defaultCategoria = {
    id_cat: null,
    nombre_cat: "",
    descripcion_cat: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultCategoria });

  const guardarRegistro = async (data) => {
    try {
      const response = await saveCategoria(data);
      if (response) {
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
      const response = await editCategoria(categoria.id_cat, categoria);
      if (response) {
        hideDialog();
        stateChanger(true);
        toast.success("Actualización exitosa.");
      } else {
        toast.error("Error al actualizar el registro seleccionado");
      }
    } catch (error) {
      toast.error(
        "Se ha producido un error. Comuníquese con el proveedor del servicio."
      );
    }
  };

  //acciones de botones

  const onSubmit = (data) => {
    data.id_empresa = idEmpresa;
    guardarRegistro(data);
  };

  const accionGuardar = () => {
    setSaveModal(true);
  };

  const accionEditar = (categoria) => {
    setCategoria({ ...categoria });
    setEditModal(true);
  };

  //DIALOGS
  const hideDialog = () => {
    setSaveModal(false);
    setEditModal(false);
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

  const onInputChange = (e, name) => {
    if (e.target.value !== "") {
      if (name === "nombre" || name === "descripcion") {
        let _categoria = { ...categoria };
        if (validarLetras(e.target.value)) {
          const val = e.target && e.target.value;
          _categoria[`${name}_cat`] = val;
          setCategoria(_categoria);
        } else {
          toast.warning(
            "Nombre y descripción deben contener solo caracteres alfabéticos."
          );
        }
      }
    } else {
      toast.error("Es obligatorio llenar todos los campos.");
    }
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const actions = (rowData) => {
    return (
      <>
<Button
          icon="pi pi-pencil"
          className="p-button-warning mx-1 my-1"
          onClick={() => accionEditar(rowData)}
        />
      </>
    );
  };
  /////////////////////Busqueda global/////////////
  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre_cat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
              <em className="mx-2">Buscar por nombre</em>
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
        <DataTable size="small"
          value={categorias}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={["nombre_cat"]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
        >
          <Column
            field="nombre_cat"
            header="Categoría"
            sortable
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="descripcion_cat"
            header="Descripción"
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

      {/* Modal para guardar la información dE CATEGORIA */}
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
              <div className="w-100">
                <label
                  htmlFor="nombre"
                  style={{ fontWeight: "bold" }}
                  className="align-middle"
                >
                  Nombre de Referencia:{" "}
                </label>
                <span className="p-input-icon-left">
                  <i className="fa fa-tag" />
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: "Nombre de referencia es requerido",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej. Bebidas"
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
                  <i className="fa fa-tags" />
                  <Controller
                    name="descripcion"
                    control={control}
                    rules={{
                      required: "Descripción es requerida",
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        placeholder="Ej. Todo tipo de bebidas"
                      />
                    )}
                  />
                </span>
                {getFormErrorMessage("descripcion")}
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

      {/* Modal para editar la información de la categoria */}
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
            <div className="w-100">
              <label
                htmlFor="nombre"
                style={{ fontWeight: "bold" }}
                className="align-middle"
              >
                Nombre:{" "}
              </label>
              <span className="p-input-icon-left w-100">
                <i className="fa fa-tag" />
                <InputText
                  id="nombre"
                  type="text"
                  autoFocus
                  value={categoria.nombre_cat}
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
                <i className="fa fa-tags" />
                <InputText
                  id="descripcion"
                  type="text"
                  autoFocus
                  value={categoria.descripcion_cat}
                  onChange={(e) => onInputChange(e, "descripcion")}
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
      
      <ToastContainer autoClose={5000} />
    </>
  );
};
