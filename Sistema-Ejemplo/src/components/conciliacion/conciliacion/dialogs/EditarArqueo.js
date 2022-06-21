import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { calcularConciliacion } from "./calculo";
import moment from "moment";
import { editArqueo, editGasto, saveGasto } from "../../../webServices/Post";
import { toast, ToastContainer } from "react-toastify";

export const EditarArqueo = (props) => {
  const {
    editModal,
    setEditModal,
    id_con,
    fecha_con,
    efectivo_inicial_con,
    efectivo_final_con,
    depositos_con,
    transferencias_con,
    gastos,
    valorPendiente,
    no_rutero,
    totalValor,
    stateChanger,
  } = props;
  const [arqueo, setArqueo] = useState({
    id_con: "",
    fecha: "",
    efectivo_inicial: 0,
    efectivo_final: 0,
    depositos: 0,
    transferencias: 0,
    total_previsto: 0,
    caja_previsto: 0,
    total_venta: 0,
    total_caja: 0,
    total_gastos: 0,
    faltante: 0,
    sobrante: 0,
    pendientes: 0,
    no_rutero: 0,
  });
  const [gastosList, setGastosList] = useState([
    {
      id: "",
      monto: "",
      descripcion: "",
    },
  ]);

  useEffect(() => {
    function calculoInicial() {
      let temp_gastos = 0;
      let list = [...gastosList];
      gastos.map((g, i) => {
        temp_gastos = g.monto_gastos ? (temp_gastos + parseFloat(g.monto_gastos)) : 0;
        list[i] = {
          id: g.id_gastos,
          monto: parseFloat(g.monto_gastos),
          descripcion: g.descripcion_gastos,
        };
        setGastosList(list);
      });
      const resp = calcularConciliacion(
        parseFloat(valorPendiente),
        parseFloat(temp_gastos),
        parseFloat(efectivo_final_con),
        parseFloat(efectivo_inicial_con),
        parseFloat(depositos_con),
        parseFloat(transferencias_con),
        parseFloat(totalValor)
      );
      setArqueo({
        id_con: id_con,
        fecha: fecha_con,
        efectivo_inicial: efectivo_inicial_con,
        efectivo_final: efectivo_final_con,
        depositos: depositos_con,
        transferencias: transferencias_con,
        caja_previsto: resp.temp_caja_previsto,
        total_venta: resp.temp_total_venta,
        total_caja: resp.temp_total_caja,
        total_gastos: resp.gastos,
        faltante: resp.temp_faltante,
        sobrante: resp.temp_sobrante,
        total_previsto: resp.total_previsto,
        no_rutero: no_rutero,
        pendientes: valorPendiente,
      });
    }
    calculoInicial();
    return () => {
      setArqueo({});
      setGastosList({});
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await editArqueo(arqueo.id_con, arqueo);
      if (response) {
        gastosList.map(async (g) => {
          if (g.id !== "") {
            await editGasto(g, g.id);
          } else {
            if (g.descripcion !== "" && g.monto !== "") {
              await saveGasto(g, arqueo.id_con);
            }
          }
        });
        toast.success("Registro exitoso");
        stateChanger(true);
        hideDialog();
      } else {
        toast.error("Ups! Algo ha salido. Comuníquese con el proveedor");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const calcularValores = () => {
    let temp_gastos = 0;
    gastosList.map((g) => {
      temp_gastos = g.monto ? (temp_gastos + parseFloat(g.monto)) : 0;
    });
    calcular(
      parseFloat(arqueo.pendientes),
      parseFloat(temp_gastos),
      parseFloat(arqueo.efectivo_inicial),
      parseFloat(arqueo.efectivo_final),
      parseFloat(arqueo.depositos),
      parseFloat(arqueo.transferencias),
      parseFloat(arqueo.total_previsto)
    );
  };

  const calcular = (
    pendientes,
    gastos,
    efectivo_inicial,
    efectivo_final,
    depositos,
    transferencias,
    previsto
  ) => {
    const resp = calcularConciliacion(
      pendientes,
      gastos,
      efectivo_final,
      efectivo_inicial,
      depositos,
      transferencias,
      previsto
    );
    setArqueo({
      ...arqueo,
      caja_previsto: resp.temp_caja_previsto,
      total_venta: resp.temp_total_venta,
      total_caja: resp.temp_total_caja,
      total_gastos: resp.gastos ? resp.gastos : 0,
      faltante: resp.temp_faltante,
      sobrante: resp.temp_sobrante,
      total_previsto: resp.total_previsto,
    });
  };

  const onInputChange = (value, name) => {
    let _arqueo = { ...arqueo };
    const val = value;
    _arqueo[`${name}`] = val;
    setArqueo(_arqueo);
  };

  const handleInputChange = (value, name, index) => {
    const listInput = [...gastosList];
    listInput[index][name] = value;
    setGastosList(listInput);
  };

  const handleAddClick = () => {
    setGastosList([
      ...gastosList,
      {
        id: "",
        monto: "",
        descripcion: "",
      },
    ]);
  };

  //   const handleRemoveClick = (index) => {
  //     const listRemove = [...gastosList];
  //     listRemove.splice(index, 1);
  //     setGastosList(listRemove);
  //   };

  const hideDialog = () => {
    setEditModal(false);
    setGastosList([
      {
        id: "",
        monto: "",
        descripcion: "",
      },
    ]);
    setArqueo({
      id_con: "",
      fecha: "",
      efectivo_inicial: 0,
      efectivo_final: 0,
      depositos: 0,
      transferencias: 0,
      total_previsto: 0,
      caja_previsto: 0,
      total_venta: 0,
      total_caja: 0,
      total_gastos: 0,
      faltante: 0,
      sobrante: 0,
      pendientes: 0,
      no_rutero: 0,
    });
  };

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

  return (
    <>
      <Dialog
        visible={editModal}
        style={{ width: "65vw" }}
        breakpoints={{ "960px": "80vw", "640px": "100vw" }}
        header={"Actualizar información"}
        footer={editDialogFooter}
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
                  <InputText
                    name="rutero"
                    value={moment(arqueo.fecha).format("YYYY-MM-DD")}
                    className="form-control"
                    readOnly
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
                      value={arqueo.no_rutero}
                      className="form-control"
                      readOnly
                    />
                  </span>
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
                        {gastosList.map((gasto, i) => {
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
                                        "descripcion",
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
                              {/* <td>
                                <Button
                                  icon="pi pi-times"
                                  className="p-button-danger px-2 w-100"
                                  type="button"
                                  onClick={handleRemoveClick}
                                />
                              </td> */}
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
                      value={arqueo.total_previsto}
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
                  onClick={calcularValores}
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
