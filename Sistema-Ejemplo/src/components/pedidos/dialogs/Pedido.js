import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
import { get } from "../../webServices/Get";

export const Pedido = (props) => {
  const {
    ruc_cliente,
    nombre_cliente,
    telefono_cliente,
    correo_cliente,
    estado_pedido,
    codigo_estab,
    codigo_pedido,
    fecha_pedido,
    codigo_factura,
    factura,
    detalles,
    viewModal,
    setViewModal,
  } = props;
  const [empresa, setEmpresa] = useState({
    nombre_empresa: "",
    ruc_empresa: "",
    actividad_empresa: "",
    direccion_empresa: "",
    telefono_empresa: "",
    correo_empresa: "",
  });
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [img, setimg] = useState();

  useEffect(async () => {
    if (idEmpresa) {
      cargarData(idEmpresa);
    } else {
      cargarData(id_Empresa);
    }
    return () => {
      setEmpresa({});
    };
  }, [viewModal]);

  const cargarData = async (id) => {
    try {
      const response = await get(`empresa/${id}/`);
      const img_name = await get(`empresa/imagen/${id}`);
      setEmpresa({
        nombre_empresa: response.map(function (item) {
          return item.nombre_empresa;
        }),
        ruc_empresa: response.map(function (item) {
          return item.ruc_empresa;
        }),
        actividad_empresa: response.map(function (item) {
          return item.actividad_empresa;
        }),
        direccion_empresa: response.map(function (item) {
          return item.ciudad_empresa;
        }),
        telefono_empresa: response.map(function (item) {
          return item.telefono_empresa;
        }),
        correo_empresa: response.map(function (item) {
          return item.correo_empresa;
        }),
      });
      const logo = await getDataUri(`http://3.134.76.83:5001/${img_name.name}`);
      setimg(logo);
    } catch (e) {
      console.log(e);
    }
  };

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
    const header = [
      [
        "Producto",
        "Cantidad",
        "Precio Unidad",
        "Al x mayor",
        "Descuento",
        "IVA",
        "Subtotal",
      ],
    ];
    const data = [];
    detalles.map((detalle, i) => {
      data[i] = [
        detalle.nombre_prod,
        detalle.cantidad_detalle,
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(detalle.preciounitario_prod),
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(detalle.preciomayoreo_prod),
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(detalle.descuento_detalle),
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(detalle.iva_prod),
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(detalle.subtotal_detalle),
      ];
    });
    const empresaDetalle = [
      ["Razón social:", empresa.nombre_empresa],
      ["Actividad comercial:", empresa.actividad_empresa],
      ["Dirección:", empresa.direccion_empresa],
      ["Teléfono:", empresa.telefono_empresa],
      ["Correo:", empresa.correo_empresa],
    ];
    const totalesFact = [
      [
        "Subtotal:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(factura[0].subtotal_factura),
      ],
      [
        "Descuento:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(factura[0].descuento_factura),
      ],
      [
        "IVA:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(factura[0].iva_factura),
      ],
      [
        "Total:",
        Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(factura[0].total_factura),
      ],
    ];
    const headerFact = [
      ["Factura No.:", codigo_factura],
      ["Fecha de Emisión:", fecha_pedido],
      ["Código Estab.:", codigo_estab],
      ["Cliente:", nombre_cliente],
    ];
    const headerFact2 = [
      ["RUC:", ruc_cliente],
      ["Teléfono:", telefono_cliente],
      ["Correo:", correo_cliente],
    ];
    doc.text("Factura", 15, 15);
    doc.text("Datos de la Empresa", 15, 25);
    doc.autoTable({
      margin: { left: 15 },
      columnStyles: { 0: { fontStyle: "bold" } },
      startY: 28,
      body: empresaDetalle,
    });
    doc.text("Datos Generales", 15, 73);
    doc.autoTable({
      margin: { left: 15, right: 110 },
      columnStyles: { 0: { fontStyle: "bold" } },
      startY: 76,
      body: headerFact,
    });
    doc.autoTable({
      margin: { left: 100, right: 15 },
      columnStyles: { 0: { fontStyle: "bold" } },
      startY: 76,
      body: headerFact2,
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: header,
      body: data,
    });
    doc.autoTable({
      margin: { left: 120, right: 15 },
      columnStyles: {
        0: { fontStyle: "bold", halign: "right" },
        1: { halign: "center" },
      },
      body: totalesFact,
    });
    doc.addImage(img, "PNG", 170, 0, 30, 30);

    doc.save(`factura-${codigo_factura}.pdf`);
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
        style={{ width: "80vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header={"Información del Pedido"}
        footer={viewDialogFooter}
        onHide={hideDialog}
        modal
      >
        <div>
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="card">
                <div className="gradient rounded-top text-white p-1">
                  <h5 className="ms-2">Datos Generales</h5>
                </div>
                <div className="container ">
                  <div className="row">
                    <div className="col-6">
                      <div className="row mt-2">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-shopping-bag pe-1" />
                            Pedido no:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{codigo_pedido}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-calendar-alt pe-1" />
                            Fecha:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{fecha_pedido}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-file-invoice-dollar pe-1" />
                            Factura:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{codigo_factura}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-tag pe-1" />
                            Código Estab.:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{codigo_estab}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-info-circle pe-1" />
                            Estado:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{estado_pedido}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row mt-2">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-id-card pe-1" />
                            RUC:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{ruc_cliente}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-user pe-1" />
                            Cliente:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{nombre_cliente}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-phone-alt pe-1" />
                            Teléfono:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{telefono_cliente}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <p className="fw-bold">
                            <i className="fa fa-envelope pe-1" />
                            Correo:
                          </p>
                        </div>
                        <div className="col-7">
                          <p>{correo_cliente}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="card h-100">
                <div className="gradient rounded-top text-white p-1">
                  <h5 className="ms-2">Valores del Pedido</h5>
                </div>
                <div className="container py-2">
                  {factura &&
                    factura.map((factura, position) => {
                      return (
                        <>
                          <div key={position}>
                            <div className="row w-100">
                              <label
                                htmlFor="subtotal_subtotal"
                                className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-form-label fw-bold"
                              >
                                Subtotal:
                              </label>
                              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                                <InputNumber
                                  name="subtotal_subtotal"
                                  value={factura.subtotal_factura}
                                  readOnly
                                  prefix={"$ "}
                                  mode="decimal"
                                  maxFractionDigits={2}
                                  size={17}
                                />
                              </div>
                            </div>
                            <div className="row mt-1 w-100">
                              <label
                                htmlFor="fecha"
                                className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-form-label fw-bold"
                              >
                                Descuento:
                              </label>
                              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                                <InputNumber
                                  name="descuento_subtotal"
                                  value={factura.descuento_factura}
                                  readOnly
                                  prefix={"$ "}
                                  mode="decimal"
                                  maxFractionDigits={2}
                                  size={17}
                                />
                              </div>
                            </div>
                            <div className="row mt-1 w-100">
                              <label
                                htmlFor="iva_subtotal"
                                className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-form-label fw-bold"
                              >
                                IVA:
                              </label>
                              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                                <InputNumber
                                  name="iva_subtotal"
                                  value={factura.iva_factura}
                                  readOnly
                                  prefix={"$ "}
                                  mode="decimal"
                                  maxFractionDigits={2}
                                  size={17}
                                />
                              </div>
                            </div>
                            <div className="row mt-1 w-100">
                              <label
                                htmlFor="fecha"
                                className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-form-label fw-bold"
                              >
                                Total:
                              </label>
                              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                                <InputNumber
                                  name="total"
                                  value={factura.total_factura}
                                  readOnly
                                  prefix={"$ "}
                                  mode="decimal"
                                  maxFractionDigits={2}
                                  size={17}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-2">
            <div className="gradient rounded-top text-white p-1">
              <h5 className="ms-2">Detalle del pedido</h5>
            </div>
            <div className="container">
              <div className="row px-2 py-2">
                <table id="tablaDetalles">
                  <thead>
                    <tr>
                      <th scope="col">Producto</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Precio U.</th>
                      <th scope="col">Al por mayor</th>
                      <th scope="col">Descuento</th>
                      <th scope="col">IVA</th>
                      <th scope="col">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalles &&
                      detalles.map((detalle, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <span className="p-input-icon-left">
                                <i className="fa fa-search" />
                                <InputText
                                  name="producto"
                                  value={detalle.nombre_prod}
                                  className="form-control"
                                  size={35}
                                  readOnly
                                />
                              </span>
                            </td>
                            <td>
                              <span className="p-input-icon-left">
                                <i className="fa fa-hashtag" />
                                <InputText
                                  name="cantidad"
                                  value={detalle.cantidad_detalle}
                                  className="form-control"
                                  readOnly
                                  size={5}
                                />
                              </span>
                            </td>
                            <td>
                              <InputNumber
                                name={"preciounitario"}
                                readOnly
                                value={detalle.preciounitario_prod}
                                prefix={"$ "}
                                mode="decimal"
                                maxFractionDigits={2}
                                size={10}
                              />
                            </td>
                            <td>
                              <InputNumber
                                name="preciomayoreo"
                                readOnly
                                value={detalle.preciomayoreo_prod}
                                prefix={"$ "}
                                mode="decimal"
                                maxFractionDigits={2}
                                size={10}
                              />
                            </td>
                            <td>
                              <span className="p-input-icon-left">
                                <i className="fa fa-percentage" />
                                <InputText
                                  keyfilter={"num"}
                                  name="descuento"
                                  readOnly
                                  value={detalle.descuento_detalle}
                                  className="form-control"
                                  size={5}
                                />
                              </span>
                            </td>
                            <td>
                              <InputNumber
                                name="iva"
                                readOnly
                                value={detalle.iva_prod}
                                prefix={"% "}
                                mode="decimal"
                                maxFractionDigits={2}
                                size={5}
                              />
                            </td>
                            <td>
                              <InputNumber
                                name="subtotal"
                                prefix={"$ "}
                                readOnly
                                value={detalle.subtotal_detalle}
                                mode="decimal"
                                maxFractionDigits={2}
                                size={10}
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
          <div className="d-flex mt-3 justify-content-center">
            <Button
              label="Descargar Factura"
              icon="pi pi-download"
              className="p-button-primary"
              onClick={print}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
