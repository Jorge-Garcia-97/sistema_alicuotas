import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { toast, ToastContainer } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { get } from "../../../webServices/Get";
import { saveArqueo, saveGasto } from "../../../webServices/Post";

export const RegistrarArqueo = (props) => {
  const {
    saveModal,
    setSaveModal,
    stateChanger,
    ruteros,
    id_Empresa,
    idEmpresa,
  } = props;
  const [search, setSearch] = useState("");
  const [sugg, setSugg] = useState({ data: [] });
  const [arqueo, setArqueo] = useState({
    fecha: new Date(),
    efectivo_inicial: 0,
    efectivo_final: 0,
    depositos: 0,
    transferencias: 0,
    total_pevisto: 0,
    caja_previsto: 0,
    total_venta: 0,
    total_caja: 0,
    total_gastos: 0,
    rutero_id: "",
    empresa_id:"",
    faltante: 0,
    sobrante: 0,
    pendientes: 0,
  });
  const [gastos, setGastos] = useState([
    {
      monto: "",
      descripcion: "",
    },
  ]);

  async function valoresPendientes(data) {
    try {
      let temp = 0;
      const valores = await get(`valor/pendiente/${data.id_rutero}`);
      valores.map((v) => {
        temp = temp + v.total_valor;
      });
      if(idEmpresa){
        setArqueo({
          ...arqueo,
          rutero_id: data.id_rutero,
          total_pevisto: data.total_rutero,
          pendientes: temp,
          empresa_id: idEmpresa
        });
      }else{
        setArqueo({
          ...arqueo,
          rutero_id: data.id_rutero,
          total_pevisto: data.total_rutero,
          pendientes: temp,
          empresa_id: id_Empresa
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (arqueo.efectivo_final > 0) {
        const response = await saveArqueo(arqueo);
        if (response.id > 0) {
          gastos.map(async (g) => {
            if (g.descripcion !== "" && g.monto !== "") {
              await saveGasto(g, response.id);
            }
          });
          toast.success("Registro exitoso");
          stateChanger(true);
          hideDialog();
        } else {
          toast.error("Ups! Algo ha salido. Comuníquese con el proveedor");
        }
      } else {
        toast.warning("Debe ingresar todos los datos del formulario");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onInputChange = (value, name) => {
    let _arqueo = { ...arqueo };
    const val = value;
    _arqueo[`${name}`] = val;
    setArqueo(_arqueo);
  };

  const handleInputChange = (value, name, index) => {
    const listInput = [...gastos];
    listInput[index][name] = value;
    setGastos(listInput);
  };

  const handleAddClick = () => {
    setGastos([
      ...gastos,
      {
        monto: "",
        descripcion: "",
      },
    ]);
  };

  const handleRemoveClick = (index) => {
    const listRemove = [...gastos];
    listRemove.splice(index, 1);
    setGastos(listRemove);
  };

  const filter = (event) => {
    let text = event.target.value;
    const data = ruteros;
    const newData = data.filter(function (item) {
      const itemData = item.fecha_rutero;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setSugg({ data: newData });
    setSearch(text);
  };

  const handleSuggest = (suggest) => {
    valoresPendientes(suggest);
    setSearch(
      "Fecha: " + suggest.fecha_rutero + " No. rutero: " + suggest.no_rutero
    );
    setSugg({ data: [] });
  };

  const calcular = () => {
    let temp_total = 0;
    let temp_total_venta = 0;
    let temp_total_caja = 0;
    let temp_gastos = 0;
    let temp_faltante = 0;
    let temp_sobrante = 0;
    let temp_caja_previsto = 0;
    gastos.map((g) => {
      temp_gastos = (temp_gastos + parseFloat(g.monto)) ? (temp_gastos + parseFloat(g.monto)) : 0;
    });
    temp_total_caja =
      parseFloat(arqueo.efectivo_inicial) +
      parseFloat(arqueo.efectivo_final) +
      parseFloat(arqueo.depositos) +
      parseFloat(arqueo.transferencias);
    temp_caja_previsto =
      parseFloat(arqueo.efectivo_inicial) + parseFloat(arqueo.total_pevisto);
    temp_total_venta =
      parseFloat(arqueo.efectivo_final) +
      parseFloat(arqueo.depositos) +
      parseFloat(arqueo.transferencias);
    temp_total =
      temp_total_venta +
      parseFloat(arqueo.pendientes) +
      parseFloat(arqueo.efectivo_inicial) +
      parseFloat(temp_gastos);

    if (temp_total > temp_caja_previsto) {
      temp_sobrante = temp_total - temp_caja_previsto;
    } 
    if (temp_total < temp_caja_previsto) {
      temp_faltante = temp_caja_previsto - temp_total;
    } 
    if (temp_total == temp_caja_previsto) {
      temp_sobrante = 0;
      temp_faltante = 0;
    } 

    setArqueo({
      ...arqueo,
      total_caja: temp_total_caja,
      total_venta: temp_total_venta,
      total_gastos: temp_gastos ? temp_gastos : 0,
      faltante: temp_faltante,
      sobrante: temp_sobrante,
      caja_previsto: temp_caja_previsto,
    });
  };

  const hideDialog = () => {
    setSaveModal(false);
    setArqueo({
      fecha: new Date(),
      efectivo_inicial: 0,
      efectivo_final: 0,
      depositos: 0,
      transferencias: 0,
      total_pevisto: 0,
      total_venta: 0,
      caja_previsto: 0,
      total_caja: 0,
      total_gastos: 0,
      rutero_id: "",
      empresa_id: "",
      faltante: 0,
      sobrante: 0,
      pendientes: 0,
    });
    setGastos([
      {
        monto: "",
        descripcion: "",
      },
    ]);
    setSugg({ data: [] });
    setSearch("");
  };

  const saveDialogFooter = (
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

  const monthNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    );
  };

  const yearNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        className="p-ml-2"
        style={{ lineHeight: 1 }}
      />
    );
  };
  return (
    <>
      <Dialog
        visible={saveModal}
        style={{ width: "65vw" }}
        breakpoints={{ "960px": "80vw", "640px": "100vw" }}
        header={"Nueva Conciliación"}
        footer={saveDialogFooter}
        onHide={hideDialog}
        modal
      >
        <div className="container">
          <form method="post" onSubmit={onSubmit}>
            <div className="mt-2 d-flex align-items-center gradient rounded-top text-white">
              <i className="fa fa-info-circle ms-2"></i>
              <h6 className="ms-2 mt-2">Datos de entrada</h6>
            </div>
            <div className="card">
              <div className="d-flex align-items-center px-2 py-2">
                <div className="flex-fill me-1">
                  <label className="fw-bold" htmlFor="efectivo_inicial">
                    Fecha:
                  </label>
                  <Calendar
                    name="fecha"
                    value={arqueo.fecha}
                    showIcon
                    onChange={(e) =>
                      setArqueo({
                        ...arqueo,
                        fecha: e.target.value,
                      })
                    }
                    dateFormat="yy-mm-dd"
                    monthNavigator
                    yearNavigator
                    yearRange="2020:2030"
                    monthNavigatorTemplate={monthNavigatorTemplate}
                    yearNavigatorTemplate={yearNavigatorTemplate}
                    placeholder="Seleccionar una fecha"
                    className="w-100"
                    required={true}
                  />
                </div>
                <div className="flex-fill">
                  <label className="fw-bold" htmlFor="efectivo_inicial">
                    Asociado al rutero:
                  </label>
                  <span className="p-input-icon-left w-100">
                    <i className="fa fa-search" />
                    <InputText
                      name="rutero"
                      value={search}
                      autoComplete="off"
                      className="form-control"
                      onChange={(e) => filter(e)}
                      onBlur={() => {
                        setTimeout(() => {
                          setSugg({ data: [] });
                        }, 100);
                      }}
                      placeholder="Ingrese una fecha para buscar EJ: 2022-01-18"
                      required={true}
                    />
                  </span>
                  <div
                    id="result"
                    className="card shadow rounded border w-50"
                    style={{ position: "absolute", zIndex: 2 }}
                  >
                    <ul>
                      {sugg.data &&
                        sugg.data.slice(0, 5).map((r, i) => (
                          <li
                            className="mx-2 mt-1"
                            onMouseDown={() => handleSuggest(r)}
                            key={i}
                          >
                            <p>
                              <strong>Fecha: </strong>
                              {r.fecha_rutero}
                              <strong> No. Rutero: </strong>
                              {r.no_rutero}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex align-items-center gradient rounded-top text-white">
              <i className="fa fa-dollar-sign ms-2"></i>
              <h6 className="ms-2 mt-2">Valores</h6>
            </div>
            <div className="card">
              <div className="d-flex align-items-center px-2 py-2">
                <div className="flex-fill me-1">
                  <label className="fw-bold" htmlFor="efectivo_inicial">
                    Efectivo inicial:
                  </label>
                  <span className="w-100">
                    <InputNumber
                      name="efectivo_inicial"
                      value={arqueo.efectivo_inicial}
                      onValueChange={(e) =>
                        onInputChange(e.value, "efectivo_inicial")
                      }
                      prefix="$ "
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      placeholder="Valor"
                      required
                      className="w-100"
                      size={12}
                    />
                  </span>
                </div>
                <div className="flex-fill me-1">
                  <label className="fw-bold" htmlFor="transferencias">
                    Transferencias:
                  </label>
                  <span className="w-100">
                    <InputNumber
                      name="transferencias"
                      value={arqueo.transferencias}
                      onValueChange={(e) =>
                        onInputChange(e.value, "transferencias")
                      }
                      prefix="$ "
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      placeholder="Valor"
                      className="w-100"
                      required
                      size={12}
                    />
                  </span>
                </div>
                <div className="flex-fill me-1">
                  <label className="fw-bold" htmlFor="depositos">
                    Depósitos:
                  </label>
                  <span className="w-100">
                    <InputNumber
                      name="depositos"
                      value={arqueo.depositos}
                      onValueChange={(e) => onInputChange(e.value, "depositos")}
                      prefix="$ "
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      placeholder="Valor"
                      className="w-100"
                      required
                      size={12}
                    />
                  </span>
                </div>
                <div className="flex-fill">
                  <label className="fw-bold" htmlFor="efectivo_final">
                    Efectivo final:
                  </label>
                  <span className="w-100">
                    <InputNumber
                      name="efectivo_final"
                      value={arqueo.efectivo_final}
                      onValueChange={(e) =>
                        onInputChange(e.value, "efectivo_final")
                      }
                      prefix="$ "
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      placeholder="Valor"
                      className="w-100"
                      required
                      size={12}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="flex-fill">
                <div className="mt-2 d-flex align-items-center gradient rounded-top text-white">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-dollar-sign ms-2"></i>
                      <h6 className="ms-2 mt-2">Gastos</h6>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-light my-1 me-1 py-1 px-2"
                    onClick={handleAddClick}
                  >
                    <i className="fa fa-plus pe-1" />
                    Agregar Gasto
                  </button>
                </div>
                <div className="card">
                  <div className="row px-4 py-2">
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Descripción</th>
                          <th scope="col">Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gastos.map((gasto, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <span className="p-input-icon-left w-100">
                                  <i className="fa fa-tag" />
                                  <InputText
                                    name="descripcion"
                                    autoComplete="off"
                                    value={gasto.descripcion}
                                    className="form-control"
                                    placeholder="Detalle del gasto"
                                    onChange={(e) =>
                                      handleInputChange(
                                        e.target.value,
                                        e.target.name,
                                        i
                                      )
                                    }
                                  />
                                </span>
                              </td>
                              <td>
                                <InputNumber
                                  name="monto"
                                  value={gasto.monto}
                                  onValueChange={(e) =>
                                    handleInputChange(e.value, "monto", i)
                                  }
                                  prefix="$ "
                                  minFractionDigits={2}
                                  maxFractionDigits={2}
                                  placeholder="Valor"
                                  className="w-100"
                                  size={8}
                                />
                              </td>
                              <td>
                                <Button
                                  icon="pi pi-times"
                                  className="p-button-danger px-2 w-100"
                                  type="button"
                                  onClick={handleRemoveClick}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex-fill ms-2">
                <div className="mt-2 d-flex py-1 align-items-center gradient rounded-top text-white">
                  <i className="fa fa-dollar-sign ms-2"></i>
                  <h6 className="ms-2 mt-2">Valores pendientes</h6>
                </div>
                <div className="card">
                  <div className="py-2 px-2">
                    <label className="fw-bold d-block" htmlFor="pendiente">
                      Total de valores:
                    </label>
                    <InputNumber
                      name="pendiente"
                      value={arqueo.pendientes}
                      prefix="$ "
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      placeholder="Valor"
                      readOnly
                      className="w-100"
                      size={1}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-2">
              <div className="d-flex">
                <div className="flex-fill">
                  <div className="d-flex align-items-center">
                    <h6 className="flex-grow-1 text-end me-3 mt-1">
                      Venta prevista:
                    </h6>
                    <InputNumber
                      name="venta_prevista"
                      value={arqueo.total_pevisto}
                      prefix={"$ "}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={5}
                      readOnly
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="flex-grow-1 text-end me-3 mt-1">
                      Venta total:
                    </h6>
                    <InputNumber
                      name="total_venta"
                      value={arqueo.total_venta}
                      prefix={"$ "}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={5}
                      readOnly
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="flex-grow-1 text-end me-3 mt-1">
                      Total gastos:
                    </h6>
                    <InputNumber
                      name="total_gastos"
                      value={arqueo.total_gastos}
                      prefix={"$ "}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={5}
                      readOnly
                    />
                  </div>
                  {/* <div className="d-flex align-items-center">
                    <h6 className="flex-grow-1 text-end me-3 mt-1">
                      Faltante:
                    </h6>
                    <InputNumber
                      name="faltante"
                      value={arqueo.faltante}
                      prefix={"$ "}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={5}
                      readOnly
                    />
                  </div> */}
                </div>
                <div className="flex-fill">
                  <div className="d-flex align-items-center">
                    <h6 className="flex-grow-1 text-end me-3 mt-1">
                      Dinero en caja previsto:
                    </h6>
                    <InputNumber
                      name="venta_prevista"
                      value={arqueo.caja_previsto}
                      prefix={"$ "}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={5}
                      readOnly
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="flex-grow-1 text-end me-3 mt-1">
                      Total en caja:
                    </h6>
                    <InputNumber
                      name="total_venta"
                      value={arqueo.total_caja}
                      prefix={"$ "}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={5}
                      readOnly
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="flex-grow-1 text-end me-3 mt-1">
                      Sobrante:
                    </h6>
                    <InputNumber
                      name="sobrante"
                      value={arqueo.sobrante}
                      prefix={"$ "}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={5}
                      readOnly
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="flex-grow-1 text-end me-3 mt-1">
                      Faltante:
                    </h6>
                    <InputNumber
                      name="faltante"
                      value={arqueo.faltante}
                      prefix={"$ "}
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={5}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-end">
                <Button
                  label="Calcular"
                  icon="pi pi-plus"
                  className="p-button-success"
                  type="button"
                  onClick={calcular}
                />
              </div>
              <div className="d-flex">
                <Button
                  label="Guardar"
                  icon="pi pi-save"
                  className="p-button-primary mx-auto"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
