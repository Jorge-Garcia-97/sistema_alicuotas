import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { calcularConciliacion } from "./calculo";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { get } from "../../../webServices/Get";

export const Arqueo = (props) => {
  const {
    viewModal,
    setViewModal,
    fecha_con,
    efectivo_inicial_con,
    efectivo_final_con,
    depositos_con,
    transferencias_con,
    gastos,
    valorPendiente,
    no_rutero,
    totalValor,
    id_Empresa,
    idEmpresa
  } = props;
  const [arqueo, setArqueo] = useState({
    caja_previsto: 0,
    total_venta: 0,
    total_caja: 0,
    total_gastos: 0,
    faltante: 0,
    sobrante: 0,
    total_previsto: 0,
  });
  const [img, setimg] = useState();

  useEffect(() => {
    function calcular() {
      let temp_gastos = 0;
      gastos.map((g) => {
        temp_gastos = g.monto_gastos ? (temp_gastos + parseFloat(g.monto_gastos)) : 0;
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
        caja_previsto: resp.temp_caja_previsto,
        total_venta: resp.temp_total_venta,
        total_caja: resp.temp_total_caja,
        total_gastos: resp.gastos,
        faltante: resp.temp_faltante,
        sobrante: resp.temp_sobrante,
        total_previsto: resp.total_previsto,
      });
    }

    const cargarData = async (id) => {
      try {
        const img_name = await get(`empresa/imagen/${id}`);
        const logo = await getDataUri(`http://3.134.76.83:5001/${img_name.name}`);
        setimg(logo);
      } catch (e) {
        console.log(e);
      }
    };

    calcular();
    if(idEmpresa){
      cargarData(idEmpresa)
    }else{
      cargarData(id_Empresa)
    }
    return () => {
      setArqueo({
        total_previsto: 0,
        caja_previsto: 0,
        total_venta: 0,
        total_caja: 0,
        total_gastos: 0,
        faltante: 0,
        sobrante: 0,
      });
    };
  }, []);

  function getDataUri(url) {
    return new Promise((resolve) => {
      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        canvas.getContext("2d").drawImage(this, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      image.src = url;
    });
  }

  const print = () => {
    const doc = new jsPDF();
    const header1 = [["Fecha", "Asociado al rutero"]];
    const header2 = [
      ["Efectivo Inicial", "Transferencias", "Depósitos", "Efectivo Final"],
    ];
    const header3 = [["Descripcion del gasto", "Monto"]];
    const header4 = [["Total valores pendientes"]];

    const data1 = [[moment(fecha_con).format("YYYY-MM-DD"), no_rutero]];

    const data2 = [
      [
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(efectivo_inicial_con),
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(transferencias_con),
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(depositos_con),
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(efectivo_inicial_con),
      ],
    ];

    const data3 = [];
    gastos.map((g, i) => {
      data3[i] = [
        g.descripcion_gastos,
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(g.monto_gastos),
      ];
    });

    const data4 = [
      [
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(valorPendiente),
      ],
    ];

    const totales1 = [
      [
        "Venta prevista:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(arqueo.total_previsto),
      ],
      [
        "Venta total:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(arqueo.total_venta),
      ],
      [
        "Total gastos:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(arqueo.total_gastos),
      ],
    ];

    const totales2 = [
      [
        "Dinero en caja previsto:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(arqueo.caja_previsto),
      ],
      [
        "Total en caja:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(arqueo.total_caja),
      ],
      [
        "Sobrante:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(arqueo.sobrante),
      ],
      [
        "Faltante:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(arqueo.faltante),
      ],
    ];

    doc.text("Conciliación", 15, 15);
    doc.autoTable({
      startY: 20,
      margin: { right: 50 },
      head: header1,
      body: data1,
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: header2,
      body: data2,
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: header3,
      body: data3,
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: header4,
      body: data4,
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      margin: { left: 15, right: 100 },
      columnStyles: {
        0: { fontStyle: "bold", halign: "right" },
        1: { halign: "center" },
      },
      body: totales1,
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY - 23,
      margin: { left: 115, right: 15 },
      columnStyles: {
        0: { fontStyle: "bold", halign: "right" },
        1: { halign: "center" },
      },
      body: totales2,
    });
    doc.addImage(img, "PNG", 170, 0, 30, 30);
    doc.save(`con-${no_rutero}.pdf`);
  };

  const hideDialog = () => {
    setViewModal(false);
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

  return (
    <>
      <Dialog
        visible={viewModal}
        style={{ width: "65vw" }}
        breakpoints={{ "960px": "80vw", "640px": "100vw" }}
        header={"Detalles de la Conciliación"}
        footer={viewDialogFooter}
        onHide={hideDialog}
        modal
      >
        <div className="container">
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
                <span className="p-input-icon-left w-100">
                  <i className="fa fa-calendar" />
                  <InputText
                    name="rutero"
                    value={moment(fecha_con).format("YYYY-MM-DD")}
                    autoComplete="off"
                    className="form-control"
                    readOnly
                  />
                </span>
              </div>
              <div className="flex-fill">
                <label className="fw-bold" htmlFor="efectivo_inicial">
                  Asociado al rutero:
                </label>
                <span className="p-input-icon-left w-100">
                  <i className="fa fa-tag" />
                  <InputText
                    name="rutero"
                    value={no_rutero}
                    autoComplete="off"
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
                    value={efectivo_inicial_con}
                    prefix="$ "
                    minFractionDigits={2}
                    maxFractionDigits={2}
                    placeholder="Valor"
                    readOnly
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
                    value={transferencias_con}
                    prefix="$ "
                    minFractionDigits={2}
                    maxFractionDigits={2}
                    placeholder="Valor"
                    className="w-100"
                    readOnly
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
                    value={depositos_con}
                    prefix="$ "
                    minFractionDigits={2}
                    maxFractionDigits={2}
                    placeholder="Valor"
                    className="w-100"
                    readOnly
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
                    value={efectivo_final_con}
                    prefix="$ "
                    minFractionDigits={2}
                    maxFractionDigits={2}
                    placeholder="Valor"
                    className="w-100"
                    readOnly
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
                                  value={gasto.descripcion_gastos}
                                  className="form-control"
                                  placeholder="Detalle del gasto"
                                  readOnly
                                />
                              </span>
                            </td>
                            <td>
                              <InputNumber
                                name="monto"
                                value={gasto.monto_gastos}
                                readOnly
                                prefix="$ "
                                minFractionDigits={2}
                                maxFractionDigits={2}
                                placeholder="Valor"
                                className="w-100"
                                size={8}
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
                    value={valorPendiente}
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
                  <h6 className="flex-grow-1 text-end me-3 mt-1">Sobrante:</h6>
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
                  <h6 className="flex-grow-1 text-end me-3 mt-1">Faltante:</h6>
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
            <div className="d-flex justify-content-center">
              <Button
                label="Descargar conciliación"
                icon="pi pi-save"
                className="p-button-primary"
                type="button"
                onClick={print}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
