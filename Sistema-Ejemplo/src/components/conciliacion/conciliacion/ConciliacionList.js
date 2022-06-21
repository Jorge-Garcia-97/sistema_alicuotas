import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { toast, ToastContainer } from "react-toastify";
import { FilterMatchMode } from "primereact/api";
import { RegistrarArqueo } from "./dialogs/RegistrarArqueo";
import { ProgressSpinner } from "primereact/progressspinner";
import { get } from "../../webServices/Get";
import { Arqueo } from "./dialogs/Arqueo";
import { EditarArqueo } from "./dialogs/EditarArqueo";

export const ConciliacionList = (props) => {
  const { stateChanger, arqueos, ruteros, arqueosP, idEmpresa, id_Empresa } =
    props;
  const [cargando, setCargando] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [pendiente, setPendiente] = useState({
    valorPendiente: "",
    totalValor: "",
  });
  const [gastos, setGastos] = useState({ gastos: [] });
  const [arqueo, setArqueo] = useState(null);
  const [codigoRutero, setCodigoRutero] = useState({ no_rutero: "" });

  async function valoresPendientes(id) {
    try {
      let temp = 0;
      let aux = 0;
      const valores = await get(`valor/pendiente/${id}`);
      const rutero = await get(`rutero/${id}`);
      aux = rutero.map((r) => {
        return r.total_rutero;
      });
      valores.map((v) => {
        temp = temp + v.total_valor;
      });
      setPendiente({ valorPendiente: temp, totalValor: aux });
    } catch (e) {
      console.log(e);
    }
  }

  async function cargarGastos(id) {
    try {
      const gastosTemp = await get(`gastos/arqueo/${id}`);
      setGastos({ gastos: gastosTemp });
      setCargando(false);
    } catch (e) {
      console.log(e);
    }
  }

  const accionVer = async (row) => {
    let temp = arqueos.filter((c) => c.id_con == row.id_con);
    setArqueo(temp[0]);
    setCodigoRutero({ no_rutero: row.no_rutero });
    setCargando(true);
    await valoresPendientes(temp[0].id_rutero);
    await cargarGastos(temp[0].id_con);
    setViewModal(true);
  };

  const accionGuardar = async () => {
    setCargando(false);
    setSaveModal(true);
  };

  const accionEditar = async (row) => {
    let temp = arqueos.filter((c) => c.id_con == row.id_con);
    setArqueo(temp[0]);
    setCodigoRutero({ no_rutero: row.no_rutero });
    setCargando(true);
    await valoresPendientes(temp[0].id_rutero);
    await cargarGastos(temp[0].id_con);
    setEditModal(true);
  };

  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    no_rutero: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    fecha_con: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
                Buscar por código del Rutero o fecha de realización:
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
                label="Generar nueva conciliación"
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

  const actions = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-info-circle"
          label="Más Información"
          className="p-button-primary mx-1 my-1"
          onClick={() => accionVer(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          label="Editar"
          className="p-button-warning mx-1 my-1"
          onClick={() => accionEditar(rowData)}
        />
      </>
    );
  };

  return (
    <>
      <div className="card">
        <DataTable
          value={arqueosP}
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={["no_rutero", "fecha_con"]}
          header={header}
          emptyMessage="No se han encontrado coincidencias."
          size="small"
        >
          <Column
            field="no_rutero"
            header="Rutero"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="fecha_con"
            header="Fecha"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="efectivo_inicial_con"
            header="Efectivo inicial"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="efectivo_final_con"
            header="Efectivo final"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="depositos_con"
            header="Depósitos"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            field="transferencias_con"
            header="Transferencias"
            bodyClassName={"py-1 ps-4"}
            className={"py-2 bg-light fw-bold ps-4"}
          ></Column>
          <Column
            bodyClassName={"py-1 text-center"}
            className={"py-2 bg-light fw-bold"}
            body={actions}
          ></Column>
        </DataTable>
      </div>

      {cargando ? (
        <>
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center">
              <div className="col-auto">
                <ProgressSpinner strokeWidth="5" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <RegistrarArqueo
            idEmpresa={idEmpresa}
            id_Empresa={id_Empresa}
            ruteros={ruteros}
            stateChanger={stateChanger}
            saveModal={saveModal}
            setSaveModal={setSaveModal}
          />

          <Arqueo
            {...arqueo}
            {...pendiente}
            {...gastos}
            {...codigoRutero}
            idEmpresa={idEmpresa}
            id_Empresa={id_Empresa}
            viewModal={viewModal}
            setViewModal={setViewModal}
          />

          <EditarArqueo
            {...arqueo}
            {...pendiente}
            {...gastos}
            {...codigoRutero}
            setEditModal={setEditModal}
            editModal={editModal}
            stateChanger={stateChanger}
          />
        </>
      )}
    </>
  );
};
