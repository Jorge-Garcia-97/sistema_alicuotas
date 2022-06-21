import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import {
  editEstadoPedido,
  editProductoStock,
  saveDetalleFactura,
  saveFactura,
  savePedido,
} from "../../webServices/Post";
import "../input.css";

export const RegistrarPedido = (props) => {
  const {
    saveModal,
    setSaveModal,
    productos,
    estabs,
    empleados,
    stateChanger,
    numeroFactura,
  } = props;
  const [searchEmpleados, setSearchEmpleados] = useState("");
  const [searchClientes, setSearchClientes] = useState("");
  const [searchEstabs, setSearchEstabs] = useState("");
  const [searchProductos, setSearchProductos] = useState({ text: [] });
  const [suggEmpleados, setSuggEmpleados] = useState({ empleados: [] });
  const [suggClientes, setSuggClientes] = useState({ clientes: [] });
  const [suggEstabs, setSuggEstabs] = useState({ estabs: [] });
  const [suggProductos, setSuggProductos] = useState({ prods: [] });
  const [indice, setIndice] = useState([]);
  const [state, setState] = useState({
    fecha: "",
    pedido: "",
    establecimiento: [
      {
        id_estab: "",
        nombre_cliente: "",
        apellido_cliente: "",
        codigo_estab: "",
        ruc_cliente: "",
        telefono_cliente: "",
        correo_cliente: "",
      },
    ],
    empleado: [
      {
        id_empleado: "",
        nombre_empleado: "",
        apellido_empleado: "",
      },
    ],
  });
  const [inputProduct, setInputProduct] = useState([
    {
      cantidad: "",
      descuento: 0,
      subtotal: 0,
      subtotalNeto: 0,
      valor_iva: 0,
      valor_descuento: 0,
      producto: [
        {
          id_prod: "",
          preciounitario_prod: 0,
          preciomayoreo_prod: 0,
          iva_prod: 0,
          cantidad_stock_prod: 0,
        },
      ],
    },
  ]);
  const [totales, setTotales] = useState({
    subtotal: 0,
    descuento: 0,
    iva: 0,
    total: 0,
  });
  const detalles = [];
  const stock = [];

  useEffect(() => {
    setState({
      fecha: new Date(),
      pedido: "00-00" + (numeroFactura + 1),
      establecimiento: [
        {
          id_estab: "",
          nombre_cliente: "",
          apellido_cliente: "",
          codigo_estab: "",
          ruc_cliente: "",
          telefono_cliente: "",
          correo_cliente: "",
        },
      ],
      empleado: [
        {
          id_empleado: "",
          nombre_empleado: "",
          apellido_empleado: "",
        },
      ],
    });
  }, [saveModal]);

  useEffect(() => {
    calcularTotales();
    return () => {
      setTotales({});
    };
  }, [inputProduct]);

  const guardarPedido = async (event) => {
    event.preventDefault();
    let paraEnviar = [];
    paraEnviar = [
      {
        codigo_factura: state.pedido,
        fecha_factura: state.fecha,
        subtotal_factura: totales.subtotal,
        descuento_factura: totales.descuento,
        iva_factura: totales.iva,
        total_factura: totales.total,
      },
    ];
    if (totales.total > 0) {
      const factura = await saveFactura(paraEnviar[0]);
      if (factura.id > 0) {
        paraEnviar = [
          {
            codigo_pedido: state.pedido,
            factura_pedido: factura.id,
            establecimiento_pedido: state.establecimiento[0].id_estab,
            estado_pedido: "REALIZADO",
            fecha_pedido: state.fecha,
            empleado_pedido: state.empleado[0].id_empleado,
          },
        ];
        const pedido = await savePedido(paraEnviar[0]);
        if (pedido.id > 0) {
          let listSave = [...inputProduct];
          listSave.map((prod, i) => {
            detalles.push({
              factura_detalle: factura.id,
              cantidad_detalle: prod.cantidad,
              ret_iva_detalle: prod.valor_iva,
              descuento_detalle: prod.valor_descuento,
              subtotal_detalle: prod.subtotal,
              producto_detalle: prod["producto"]["id_prod"],
            });
            stock.push({
              id_prod: prod["producto"]["id_prod"],
              cantidad_stock_prod:
                prod["producto"]["cantidad_stock_prod"] - prod.cantidad,
            });
          });
          detalles.map(async (detalle, i) => {
            const response = await saveDetalleFactura(detalle);
            if (!response) {
              toast.error("Ups! Algo ha salido mal. Intente nuevamente");
              await editEstadoPedido(pedido.id, "INACTIVO");
            }
          });
          const bool = stock.map(async (item, i) => {
            if (item.cantidad_stock_prod <= 0) {
              toast.error(
                "Producto en stock insuficiente para realizar el pedido"
              );
              await editEstadoPedido(pedido.id, "INACTIVO");
              return false;
            } else {
              await editProductoStock(item.id_prod, item.cantidad_stock_prod);
              return true;
            }
          });
          const aux = bool.find((bandera) => bandera !== false);
          aux.then((bandera) => {
            if (bandera) {
              stateChanger(true);
              hideDialog();
              toast.success("Registro exitoso");
            }
          });
        } else {
          toast.error("Ups! Algo ha salido mal. Comuníquese con el proveedor");
        }
      } else {
        toast.error("Ups! Algo ha salido mal. Intente nuevamente");
      }
    } else {
      toast.error("Ups! Algo ha salido mal. Revise los datos ingresados");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const listInput = [...inputProduct];
    listInput[index][name] = value;
    setInputProduct(listInput);
    if (
      listInput[index]["producto"]["id_prod"] > 0 &&
      listInput[index]["cantidad"] > 0
    ) {
      calcularValores(index);
    }
  };

  const handleAddClick = () => {
    setInputProduct([
      ...inputProduct,
      {
        cantidad: "",
        descuento: 0,
        subtotal: 0,
        subtotalNeto: 0,
        valor_iva: 0,
        valor_descuento: 0,
        producto: [
          {
            id_prod: "",
            preciounitario_prod: 0,
            preciomayoreo_prod: 0,
            iva_prod: 0,
            cantidad_stock_prod: 0,
          },
        ],
      },
    ]);
  };

  const handleRemoveClick = (index) => {
    const listRemove = [...inputProduct];
    const search = [...searchProductos.text];
    listRemove.splice(index, 1);
    setInputProduct(listRemove);
    search.splice(index, 1);
    setSearchProductos({ text: search });
  };

  const calcularValores = (index) => {
    const list = [...inputProduct];

    let descuento = 0,
      subtotal = 0,
      subtotalNeto = 0,
      iva = 0;
    if (list[index]["cantidad"] < 12) {
      subtotal =
        list[index]["producto"]["preciounitario_prod"] *
        list[index]["cantidad"];
      subtotalNeto = subtotal;
      if (list[index]["descuento"] > 0.01) {
        descuento = (subtotal * list[index]["descuento"]) / 100;
        list[index]["valor_descuento"] = descuento;
        subtotal = subtotal - descuento;
      } else {
        list[index]["valor_descuento"] = 0;
      }
      if (list[index]["producto"]["iva_prod"] > 0.01) {
        iva = subtotal * list[index]["producto"]["iva_prod"];
        list[index]["valor_iva"] = iva;
        subtotal = subtotal + iva;
      }
      list[index]["subtotalNeto"] = subtotalNeto;
      list[index]["subtotal"] = subtotal;
    } else {
      subtotal =
        list[index]["producto"]["preciomayoreo_prod"] * list[index]["cantidad"];
      subtotalNeto = subtotal;
      if (list[index]["descuento"] > 0.01) {
        descuento = (subtotal * list[index]["descuento"]) / 100;
        list[index]["valor_descuento"] = descuento;
        subtotal = subtotal - descuento;
      } else {
        list[index]["valor_descuento"] = 0;
      }
      if (list[index]["producto"]["iva_prod"] > 0.01) {
        iva = subtotal * list[index]["producto"]["iva_prod"];
        list[index]["valor_iva"] = iva;
        subtotal = subtotal + iva;
      }
      list[index]["subtotalNeto"] = subtotalNeto;
      list[index]["subtotal"] = subtotal;
    }
    calcularTotales();
  };

  const calcularTotales = () => {
    let subtotal = 0,
      descuento = 0,
      iva = 0,
      total = 0;

    inputProduct.map((prod) => {
      subtotal = subtotal + prod.subtotalNeto;
      descuento = descuento + prod.valor_descuento;
      iva = iva + prod.valor_iva;
      total = total + prod.subtotal;
    });

    setTotales({
      subtotal: subtotal,
      descuento: descuento,
      iva: iva,
      total: total,
    });
  };

  const filterEmpleados = (event) => {
    let text = event.target.value;
    const data = empleados;
    const newData = data.filter(function (item) {
      const itemData = item.nombre_empleado;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setSuggEmpleados({ empleados: newData });
    setSearchEmpleados(text);
  };

  const filterClientes = (event) => {
    let text = event.target.value;
    const data = estabs;
    const newData = data.filter(function (item) {
      const itemData = item.nombre_cliente;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setSuggClientes({ cliente: newData });
    setSearchClientes(text);
  };

  const filterEstabs = (event) => {
    let text = event.target.value;
    const data = estabs;
    const newData = data.filter(function (item) {
      const itemData = item.codigo_estab;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setSuggEstabs({ estabs: newData });
    setSearchEstabs(text);
  };

  const filterProductos = (event, i) => {
    let text = event.target.value;
    const data = productos;
    const newData = data.filter(function (item) {
      const itemData = item.nombre_prod;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    setSuggProductos({ prods: newData });
    const search = [...searchProductos.text];
    search[i] = text;
    setSearchProductos({ text: search });
    setIndice(i);
  };

  const handleSuggest = (suggest) => {
    setState({
      ...state,
      establecimiento: [
        {
          id_estab: suggest.id_estab,
          nombre_cliente: suggest.nombre_cliente,
          apellido_cliente: suggest.apellido_cliente,
          codigo_estab: suggest.codigo_estab,
          ruc_cliente: suggest.ruc_cliente,
          telefono_cliente: suggest.telefono_cliente,
          correo_cliente: suggest.correo_cliente,
        },
      ],
    });
    setSearchClientes(suggest.nombre_cliente + " " + suggest.apellido_cliente);
    setSearchEstabs(suggest.codigo_estab);
    setSuggClientes({ clientes: [] });
    setSuggEstabs({ estabs: [] });
  };

  const handleSuggestEmpleado = (suggest) => {
    setState({
      ...state,
      empleado: [
        {
          id_empleado: suggest.id_empleado,
          nombre_empleado: suggest.nombre_empleado,
          apellido_empleado: suggest.apellido_empleado,
        },
      ],
    });
    setSearchEmpleados(
      suggest.nombre_empleado + " " + suggest.apellido_empleado
    );
    setSuggEmpleados({ empleados: [] });
  };

  const handleSuggestProd = (suggest) => {
    const listSugg = [...inputProduct];
    const search = [...searchProductos.text];
    listSugg[indice]["producto"] = suggest;
    search[indice] = suggest.nombre_prod;
    setInputProduct(listSugg);
    setSuggProductos({ prods: [] });
    setSearchProductos({ text: search });
  };

  const hideDialog = () => {
    setSaveModal(false);
    setInputProduct([
      {
        cantidad: 0,
        descuento: 0,
        subtotal: 0,
        subtotalNeto: 0,
        valor_iva: 0,
        valor_descuento: 0,
        producto: [
          {
            id_prod: "",
            preciounitario_prod: 0,
            preciomayoreo_prod: 0,
            iva_prod: 0,
            cantidad_stock_prod: 0,
          },
        ],
      },
    ]);
    setState({
      fecha: new Date(),
      pedido: "00-00" + (numeroFactura + 1),
      establecimiento: [
        {
          id_estab: "",
          nombre_cliente: "",
          apellido_cliente: "",
          codigo_estab: "",
          ruc_cliente: "",
          telefono_cliente: "",
          correo_cliente: "",
        },
      ],
    });
    setTotales({
      subtotal: 0,
      descuento: 0,
      iva: 0,
      total: 0,
    });
    setSearchEmpleados("");
    setSearchClientes("");
    setSearchEstabs("");
    setSearchProductos({ text: [] });
    setSuggEmpleados({ empleados: [] });
    setSuggClientes({ clientes: [] });
    setSuggEstabs({ estas: [] });
    setSuggProductos({ prods: [] });
    setIndice(null);
    detalles.splice(0, detalles.length);
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
      {/* Modal para guardar la información del personal */}
      <Dialog
        visible={saveModal}
        style={{ width: "85vw" }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        header="Registrar información"
        modal
        footer={saveDialogFooter}
        onHide={hideDialog}
      >
        <form method="post" onSubmit={guardarPedido}>
          <div className="">
            <div className="card position-relative">
              <div className="gradient rounded-top text-white p-1">
                <h5 className="ms-2">Datos Generales</h5>
              </div>
              <div className="container ">
                <div className="row px-4 py-2">
                  <div className="col-6">
                    <div className="row">
                      <label
                        htmlFor="fecha"
                        className="col-sm-4 col-form-label fw-bold"
                      >
                        Número Pedido:
                      </label>
                      <div className="col-sm-8">
                        <span className="p-input-icon-left w-100">
                          <i className="fa fa-tag" />
                          <InputText
                            keyfilter={"num"}
                            name="numero_pedido"
                            value={state.pedido}
                            className="form-control"
                            readOnly
                          />
                        </span>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <label
                        htmlFor="fecha"
                        className="col-sm-4 col-form-label fw-bold"
                      >
                        Fecha de registro:
                      </label>
                      <div className="col-sm-8">
                        <Calendar
                          name="fecha"
                          value={state.fecha}
                          showIcon
                          onChange={(e) =>
                            setState({
                              ...state,
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
                    </div>
                    <div className="row mt-2">
                      <label
                        htmlFor="cliente"
                        className="col-sm-4 col-form-label fw-bold"
                      >
                        Empleado:
                      </label>
                      <div className="col-sm-8">
                        <span className="p-input-icon-left w-100">
                          <i className="fa fa-search" />
                          <InputText
                            name="empleado"
                            value={searchEmpleados}
                            autoComplete="off"
                            className="form-control"
                            onChange={(e) => filterEmpleados(e)}
                            onBlur={() => {
                              setTimeout(() => {
                                setSuggEmpleados({ empleados: [] });
                              }, 100);
                            }}
                            required={true}
                          />
                        </span>
                        <div
                          id="result"
                          className="card shadow rounded border w-25"
                          style={{ position: "absolute", zIndex: 2 }}
                        >
                          <ul>
                            {suggEmpleados.empleados &&
                              suggEmpleados.empleados
                                .slice(0, 5)
                                .map((emp, i) => (
                                  <li
                                    className="mx-2 mt-1"
                                    onMouseDown={() =>
                                      handleSuggestEmpleado(emp)
                                    }
                                    key={i}
                                  >
                                    {emp.nombre_empleado +
                                      " " +
                                      emp.apellido_empleado}
                                  </li>
                                ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <label
                        htmlFor="cliente"
                        className="col-sm-4 col-form-label fw-bold"
                      >
                        Cliente:
                      </label>
                      <div className="col-sm-8">
                        <span className="p-input-icon-left w-100">
                          <i className="fa fa-search" />
                          <InputText
                            name="cliente"
                            value={searchClientes}
                            autoComplete="off"
                            className="form-control"
                            onChange={(e) => filterClientes(e)}
                            onBlur={() => {
                              setTimeout(() => {
                                setSuggClientes({ cliente: [] });
                              }, 100);
                            }}
                            required={true}
                          />
                        </span>
                        <div
                          id="result"
                          className="card shadow rounded border w-25"
                          style={{ position: "absolute", zIndex: 2 }}
                        >
                          <ul>
                            {suggClientes.cliente &&
                              suggClientes.cliente
                                .slice(0, 5)
                                .map((estab, i) => (
                                  <li
                                    className="mx-2 mt-1"
                                    onMouseDown={() => handleSuggest(estab)}
                                    key={i}
                                  >
                                    {estab.nombre_cliente +
                                      " " +
                                      estab.apellido_cliente}
                                  </li>
                                ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <label
                        htmlFor="establecimiento"
                        className="col-sm-4 col-form-label fw-bold"
                      >
                        Establecimiento:
                      </label>
                      <div className="col-sm-8">
                        <span className="p-input-icon-left w-100">
                          <i className="fa fa-search" />
                          <InputText
                            name="establecimiento"
                            value={searchEstabs}
                            autoComplete="off"
                            className="form-control"
                            onChange={(e) => filterEstabs(e)}
                            onBlur={() => {
                              setTimeout(() => {
                                setSuggEstabs({ estabs: [] });
                              }, 100);
                            }}
                            required={true}
                          />
                        </span>
                        <div
                          id="result"
                          className="card shadow rounded border w-25"
                          style={{ position: "absolute", zIndex: 1 }}
                        >
                          <ul>
                            {suggEstabs.estabs &&
                              suggEstabs.estabs.slice(0, 5).map((estab, i) => (
                                <li
                                  className="mx-2 mt-1"
                                  onMouseDown={() => handleSuggest(estab)}
                                  key={i}
                                >
                                  {estab.codigo_estab}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 border">
                    <div className="row mt-2">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <p className="fw-bold">RUC:</p>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6">
                        {state.establecimiento && (
                          <p>{state.establecimiento[0].ruc_cliente}</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <p className="fw-bold">Nombres:</p>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6">
                        {state.establecimiento && (
                          <p>
                            {state.establecimiento[0].nombre_cliente +
                              " " +
                              state.establecimiento[0].apellido_cliente}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <p className="fw-bold">Teléfono:</p>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6">
                        {state.establecimiento && (
                          <p>{state.establecimiento[0].telefono_cliente}</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <p className="fw-bold">Correo:</p>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6">
                        {state.establecimiento && (
                          <p>{state.establecimiento[0].correo_cliente}</p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <p className="fw-bold">Código:</p>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6">
                        {state.establecimiento && (
                          <p>{state.establecimiento[0].codigo_estab}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                        <th scope="col">En Stock</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio U.</th>
                        <th scope="col">Al por mayor</th>
                        <th scope="col">Descuento</th>
                        {/* <th scope="col">Valor Desc.</th> */}
                        <th scope="col">IVA</th>
                        {/* <th scope="col">Valor IVA</th> */}
                        <th scope="col">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputProduct.map((prod, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <InputNumber
                                name={"stock"}
                                readOnly
                                placeholder="0"
                                value={prod.producto.cantidad_stock_prod}
                                prefix={"# "}
                                size={5}
                              />
                            </td>
                            <td>
                              <div className="position-relative">
                                <span
                                  className="p-input-icon-left"
                                  style={{ zIndex: 2 }}
                                >
                                  <i className="fa fa-search" />
                                  <InputText
                                    name="producto"
                                    value={searchProductos.text[i]}
                                    autoComplete="off"
                                    placeholder="Buscar Producto"
                                    className="form-control"
                                    size={35}
                                    onChange={(e) => filterProductos(e, i)}
                                    onBlur={() => {
                                      setTimeout(() => {
                                        setSuggProductos({ prods: [] });
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
                                    {searchProductos.text[indice] &&
                                      suggProductos.prods
                                        .slice(0, 5)
                                        .map((prod, i) => (
                                          <li
                                            className="mx-2 mt-1"
                                            onMouseDown={() =>
                                              handleSuggestProd(prod)
                                            }
                                            key={i}
                                          >
                                            {prod.nombre_prod}
                                          </li>
                                          // <div>{JSON.stringify(prod.id_prod)}</div>
                                        ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="p-input-icon-left">
                                <i className="fa fa-hashtag" />
                                <InputText
                                  name="cantidad"
                                  autoComplete="off"
                                  value={prod.cantidad}
                                  className="form-control"
                                  placeholder="0"
                                  onChange={(e) => handleInputChange(e, i)}
                                  size={5}
                                  required={true}
                                />
                              </span>
                            </td>
                            <td>
                              <InputNumber
                                name={"preciounitario"}
                                readOnly
                                placeholder="0"
                                value={prod.producto.preciounitario_prod}
                                prefix={"$ "}
                                mode="decimal"
                                minFractionDigits={2}
                                maxFractionDigits={2}
                                size={10}
                              />
                            </td>
                            <td>
                              <InputNumber
                                name="preciomayoreo"
                                readOnly
                                placeholder="0"
                                value={prod.producto.preciomayoreo_prod}
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
                                  name="descuento"
                                  autoComplete="off"
                                  value={prod.descuento}
                                  onChange={(e) => handleInputChange(e, i)}
                                  className="form-control"
                                  size={5}
                                />
                              </span>
                            </td>
                            {/* <td>
                              <span className="p-input-icon-left w-100">
                                <i className="fa fa-dollar-sign" />
                                <InputText
                                  keyfilter={"num"}
                                  name="valor_descuento"
                                  value={prod.valor_descuento}
                                  className="form-control"
                                />
                              </span>
                            </td> */}
                            <td>
                              <InputNumber
                                name="iva"
                                placeholder="0"
                                readOnly
                                value={prod.producto.iva_prod}
                                prefix={"% "}
                                mode="decimal"
                                maxFractionDigits={2}
                                size={5}
                                style={{textAlign: 'right'}}
                              />
                            </td>
                            {/* <td>
                              <span className="p-input-icon-left w-100">
                                <i className="fa fa-dollar-sign" />
                                <InputText
                                  keyfilter={"num"}
                                  name="valor_iva"
                                  value={prod.valor_iva}
                                  className="form-control"
                                />
                              </span>
                            </td> */}
                            <td>
                              <InputNumber
                                name="subtotal"
                                prefix={"$ "}
                                readOnly
                                value={prod.subtotal}
                                mode="decimal"
                                minFractionDigits={2}
                                maxFractionDigits={2}
                                size={10}
                              />
                            </td>
                            <td>
                              <Button
                                icon="pi pi-times"
                                className="p-button-danger"
                                type="button"
                                onClick={handleRemoveClick}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {/* <div>{JSON.stringify(inputProduct)}</div> */}
                </div>
              </div>
            </div>
            <div className="card mt-2">
              <div className="container py-2">
                <div className="d-flex align-items-end flex-column">
                  <div>
                    <label htmlFor="subtotal_subtotal" className="fw-bold me-3">
                      Subtotal:
                    </label>
                    <InputNumber
                      name="subtotal"
                      value={totales.subtotal}
                      readOnly
                      prefix={"$ "}
                      mode="decimal"
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={15}
                    />
                  </div>
                  <div className="mt-1">
                    <label htmlFor="fecha" className="fw-bold me-3">
                      Descuento:
                    </label>
                    <InputNumber
                      name="descuento_subtotal"
                      value={totales.descuento}
                      readOnly
                      prefix={"$ "}
                      mode="decimal"
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={15}
                    />
                  </div>
                  <div className="mt-1">
                    <label htmlFor="fecha" className="fw-bold me-3">
                      IVA:
                    </label>
                    <InputNumber
                      name="iva_subtotal"
                      value={totales.iva}
                      readOnly
                      prefix={"$ "}
                      mode="decimal"
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={15}
                    />
                  </div>
                  <div className="mt-1">
                    <label htmlFor="fecha" className="fw-bold me-3">
                      Total:
                    </label>
                    <InputNumber
                      name="total"
                      value={totales.total}
                      readOnly
                      prefix={"$ "}
                      mode="decimal"
                      minFractionDigits={2}
                      maxFractionDigits={2}
                      size={15}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                className="mt-3 w-25"
                label="Guardar"
                icon="pi pi-check"
                type="submit"
              />
            </div>
          </div>
        </form>
        <ToastContainer autoClose={5000} />
      </Dialog>
      <ToastContainer autoClose={5000} />
    </>
  );
};
