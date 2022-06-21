import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import moment from "moment";
import {
  editDetalleFactura,
  editFactura,
  editProductoStock,
  saveDetalleFactura,
} from "../../webServices/Post";

export const EditarPedido = (props) => {
  const {
    ruc_cliente,
    nombre_cliente,
    telefono_cliente,
    estado_pedido,
    codigo_estab,
    codigo_pedido,
    fecha_pedido,
    codigo_factura,
    factura,
    detalles,
    editModal,
    setEditModal,
    stateChanger,
    productos,
  } = props;
  const [inputDetalles, setInputDetalles] = useState([]);
  const [inputFactura, setInputFactura] = useState([]);
  const [suggProductos, setSuggProductos] = useState([0]);
  const [searchProductos, setSearchProductos] = useState([]);
  const [indice, setIndice] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    setInputDetalles(detalles);
    setInputFactura(factura);
    const search = [...searchProductos];
    const stockAux = [...stock];
    detalles.map((detalle, i) => {
      search[i] = detalle.nombre_prod;
      stockAux[i] = detalle.cantidad_detalle;
    });
    setSearchProductos(search);
    setStock(stockAux);
    return () => {
      setInputDetalles([]);
      setInputFactura([]);
      setSearchProductos([]);
      setSuggProductos([]);
    };
  }, [editModal]);

  const guardarPedido = async (event) => {
    event.preventDefault();
    let cantidadFinal = 0;
    const detalleInicial = [...stock];
    const detalleFinal = [...inputDetalles];
    const bool = detalleFinal.map(async (detalle, i) => {
      if (detalle.cantidad_stock_prod > detalle.cantidad_detalle) {
        if (detalle.id_detalle) {
          await editDetalleFactura(detalle.id_detalle, detalle);
          if (detalleInicial[i]) {
            if (detalleInicial[i] < detalle.cantidad_detalle) {
              cantidadFinal = detalle.cantidad_detalle - detalleInicial[i];
              cantidadFinal = detalle.cantidad_stock_prod - cantidadFinal;
              await editProductoStock(detalle.id_prod, cantidadFinal);
            } else {
              cantidadFinal = detalleInicial[i] - detalle.cantidad_detalle;
              cantidadFinal = detalle.cantidad_stock_prod + cantidadFinal;
              await editProductoStock(detalle.id_prod, cantidadFinal);
            }
          }
        } else {
          detalleFinal[i].cantidad_stock_prod =
            detalleFinal[i].cantidad_stock_prod -
            detalleFinal[i].cantidad_detalle;
          detalleFinal[i].factura_detalle = inputFactura[0].id_factura;
          setInputDetalles(detalleFinal);
          await editProductoStock(detalle.id_prod, detalle.cantidad_stock_prod);
          await saveDetalleFactura(detalleFinal[i]);
        }
        return true;
      } else {
        toast.error("Producto en stock insuficiente para realizar el pedido");
        return false;
      }
    });
    const aux = bool.find((bandera) => bandera !== false);
    aux.then(async (bandera) => {
      if (bandera) {
        const responseFactura = await editFactura(
          inputFactura[0].id_factura,
          inputFactura[0]
        );
        if (responseFactura) {
          stateChanger(true);
          hideDialog();
          toast.success("Actualización exitosa");
        } else {
          toast.error("Ups! Algo ha salido mal. Comuníquese con el proveedor");
        }
      }
    });
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputDetalles];
    list[index][name] = value;
    setInputDetalles(list);
    if (list[index]["cantidad_detalle"] > 0) {
      calcularValores(index);
    }
  };

  const handleAddClick = () => {
    setInputDetalles([
      ...inputDetalles,
      {
        cantidad_detalle: 0,
        ret_iva_detalle: 0,
        descuento_detalle: 0,
        subtotal_detalle: 0,
        nombre_prod: "",
        producto_detalle: "",
        preciounitario_prod: 0,
        preciomayoreo_prod: 0,
        iva_prod: 0,
        id_prod: 0,
        cantidad_stock_prod: 0,
      },
    ]);
  };

  const filterProductos = (event, i) => {
    let text = event.target.value;
    const data = productos;
    const newData = data.filter(function (item) {
      const itemData = item.nombre_prod;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setSuggProductos(newData);
    const search = [...searchProductos];
    search[i] = text;
    setSearchProductos(search);
    setIndice(i);
  };

  const handleSuggestProd = (suggest) => {
    const listSugg = [...inputDetalles];
    const search = [...searchProductos];
    listSugg[indice]["nombre_prod"] = suggest.nombre_prod;
    listSugg[indice]["producto_detalle"] = suggest.id_prod;
    listSugg[indice]["preciounitario_prod"] = suggest.preciounitario_prod;
    listSugg[indice]["preciomayoreo_prod"] = suggest.preciomayoreo_prod;
    listSugg[indice]["iva_prod"] = suggest.iva_prod;
    listSugg[indice]["id_prod"] = suggest.id_prod;
    listSugg[indice]["cantidad_stock_prod"] = suggest.cantidad_stock_prod;
    search[indice] = suggest.nombre_prod;
    setInputDetalles(listSugg);
    setSuggProductos([0]);
    setSearchProductos(search);
  };

  const calcularValores = (index) => {
    const list = [...inputDetalles];
    let descuento = 0,
      subtotal = 0,
      iva = 0;

    if (list[index]["cantidad_detalle"] < 12) {
      subtotal =
        list[index]["preciounitario_prod"] * list[index]["cantidad_detalle"];
      if (list[index]["descuento_detalle"] > 0.01) {
        descuento = (subtotal * list[index]["descuento_detalle"]) / 100;
        subtotal = subtotal - descuento;
      }
      if (list[index]["iva_prod"] > 0.01) {
        iva = subtotal * list[index]["iva_prod"];
        list[index]["ret_iva_detalle"] = iva;
        subtotal = subtotal + iva;
      }
      list[index]["subtotal_detalle"] = subtotal;
    } else {
      subtotal =
        list[index]["preciomayoreo_prod"] * list[index]["cantidad_detalle"];
      if (list[index]["descuento_detalle"] > 0.01) {
        descuento = (subtotal * list[index]["descuento_detalle"]) / 100;
        subtotal = subtotal - descuento;
      }
      if (list[index]["iva_prod"] > 0.01) {
        iva = subtotal * list[index]["iva_prod"];
        list[index]["ret_iva_detalle"] = iva;
        subtotal = subtotal + iva;
      }
      list[index]["subtotal_detalle"] = subtotal;
    }
    setInputDetalles(list);
    calcularTotales();
  };

  const calcularTotales = () => {
    let subtotal = 0,
      descuento = 0,
      iva = 0,
      total = 0;

    inputDetalles.map((prod, i) => {
      if (prod.cantidad_detalle < 12) {
        subtotal = subtotal + prod.cantidad_detalle * prod.preciounitario_prod;
      } else {
        subtotal = subtotal + prod.cantidad_detalle * prod.preciomayoreo_prod;
      }

      if (prod.descuento_detalle > 0.01) {
        let auxsub = 0;
        if (prod.cantidad_detalle < 12) {
          auxsub = prod.cantidad_detalle * prod.preciounitario_prod;
        } else {
          auxsub = prod.cantidad_detalle * prod.preciomayoreo_prod;
        }
        descuento = descuento + (auxsub * prod.descuento_detalle) / 100;
      }

      iva = iva + prod.ret_iva_detalle;
      total = total + prod.subtotal_detalle;
    });

    inputFactura.map((factura) => {
      factura.iva_factura = iva;
      factura.descuento_factura = descuento;
      factura.subtotal_factura = subtotal;
      factura.total_factura = total;
    });
  };

  const hideDialog = () => {
    setEditModal(false);
    setInputDetalles([]);
    setInputFactura([]);
    setSearchProductos([]);
    setSuggProductos([]);
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
        style={{ width: "85vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Registrar información"
        modal
        footer={editDialogFooter}
        onHide={hideDialog}
      >
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
                    <p>{moment(fecha_pedido).format("YYYY-MM-DD")}</p>
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
                    <p>{estado_pedido}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form method="post" onSubmit={guardarPedido}>
          <div className="card mt-2">
            <div className="gradient rounded-top d-flex text-white p-1">
              <h5 className="ms-2 mt-2 flex-grow-1">Detalle del pedido</h5>
              <button
                type="button"
                className="btn btn-outline-light my-1 me-1 py-1 px-2"
                onClick={handleAddClick}
              >
                <i className="fa fa-plus pe-1" />
                Agregar Producto
              </button>
            </div>
            <div className="container">
              <div className="row px-2 py-2">
                <table>
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
                    {inputDetalles &&
                      inputDetalles.map((detalle, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <div className="position-relative">
                                <span
                                  className="p-input-icon-left"
                                  style={{ zIndex: 2 }}
                                >
                                  <i className="fa fa-search" />
                                  <InputText
                                    name="producto"
                                    value={searchProductos[i]}
                                    autoComplete="off"
                                    placeholder="Buscar Producto"
                                    className="form-control"
                                    size={35}
                                    onChange={(e) => filterProductos(e, i)}
                                    onBlur={() => {
                                      setTimeout(() => {
                                        setSuggProductos([]);
                                      }, 100);
                                    }}
                                    required={true}
                                  />
                                </span>
                                <div
                                  id="result"
                                  className="card shadow rounded border w-75"
                                  style={{ position: "absolute", zIndex: 1 }}
                                >
                                  <ul>
                                    {searchProductos[indice] &&
                                      suggProductos
                                        .slice(0, 5)
                                        .map((prod, index) => (
                                          <li
                                            className="mx-2 mt-1"
                                            onMouseDown={() =>
                                              handleSuggestProd(prod)
                                            }
                                            key={index}
                                          >
                                            {prod.nombre_prod}
                                          </li>
                                        ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="p-input-icon-left">
                                <i className="fa fa-hashtag" />
                                <InputText
                                  keyfilter={"num"}
                                  name="cantidad_detalle"
                                  autoComplete="off"
                                  value={detalle.cantidad_detalle}
                                  className="form-control"
                                  onChange={(e) => handleInputChange(e, i)}
                                  size={5}
                                />
                              </span>
                            </td>
                            <td>
                              <InputNumber
                                name="preciounitario_prod"
                                readOnly
                                value={detalle.preciounitario_prod}
                                prefix={"$ "}
                                mode="decimal"
                                minFractionDigits={2}
                                maxFractionDigits={2}
                                size={10}
                              />
                            </td>
                            <td>
                              <InputNumber
                                name="preciomayoreo_prod"
                                readOnly
                                value={detalle.preciomayoreo_prod}
                                prefix={"$ "}
                                mode="decimal"
                                minFractionDigits={2}
                                maxFractionDigits={2}
                                size={10}
                              />
                            </td>
                            <td>
                              <span className="p-input-icon-left">
                                <i className="fa fa-percentage" />
                                <InputText
                                  keyfilter={"num"}
                                  name="descuento_detalle"
                                  autoComplete="off"
                                  onChange={(e) => handleInputChange(e, i)}
                                  value={detalle.descuento_detalle}
                                  className="form-control"
                                  size={5}
                                />
                              </span>
                            </td>
                            <td>
                              <InputNumber
                                name="iva_prod"
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
                                name="subtotal_detalle"
                                prefix={"$ "}
                                readOnly
                                value={detalle.subtotal_detalle}
                                mode="decimal"
                                minFractionDigits={2}
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
          <div className="card mt-2">
            <div className="container py-2">
              {inputFactura &&
                inputFactura.map((factura, j) => {
                  return (
                    <>
                      <div
                        key={j}
                        className="d-flex align-items-end flex-column"
                      >
                        <div>
                          <label
                            htmlFor="subtotal_subtotal"
                            className="fw-bold me-3"
                          >
                            Subtotal:
                          </label>
                          <InputNumber
                            name="subtotal_subtotal"
                            value={factura.subtotal_factura}
                            readOnly
                            prefix={"$ "}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            size={11}
                          />
                        </div>
                        <div className="mt-1">
                          <label htmlFor="fecha" className="fw-bold me-3">
                            Descuento:
                          </label>
                          <InputNumber
                            name="descuento_subtotal"
                            value={factura.descuento_factura}
                            readOnly
                            prefix={"$ "}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            size={11}
                          />
                        </div>
                        <div className="mt-1">
                          <label
                            htmlFor="iva_subtotal"
                            className="fw-bold me-3"
                          >
                            IVA:
                          </label>
                          <InputNumber
                            name="iva_subtotal"
                            value={factura.iva_factura}
                            readOnly
                            prefix={"$ "}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            size={11}
                          />
                        </div>
                        <div className="mt-1">
                          <label htmlFor="fecha" className="fw-bold me-3">
                            Total:
                          </label>
                          <InputNumber
                            name="total"
                            value={factura.total_factura}
                            readOnly
                            prefix={"$ "}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            size={11}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
          <div className="text-center">
            <Button
              className="mt-3 w-25"
              label="Actualizar"
              icon="pi pi-check"
              type="submit"
            />
          </div>
        </form>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
