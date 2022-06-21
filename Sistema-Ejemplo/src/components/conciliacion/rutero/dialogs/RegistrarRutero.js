import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { saveRutero, saveRuteroHasPedido } from "../../../webServices/Post";

export const RegistrarRutero = (props) => {
  const { pedidos, saveModal, setSaveModal, stateChanger } = props;
  const [fecha, setFecha] = useState(new Date());
  const [inputPedidos, setInputPedidos] = useState([]);
  const [recaudo, setRecaudo] = useState(null);
  const [pedidosTemp, setPedidosTemp] = useState([]);
  const [selectedPedidos, setSelectedPedidos] = useState(null);

  const guardarRutero = async () => {
    try {
      if (fecha && recaudo) {
        let date = new Date();
        // const formatter = new Intl.DateTimeFormat('en-US', { timeZone: "America/Guayaquil" });
        // date = formatter.format(date);
        const resp = await saveRutero(date, recaudo, "ACTIVO");
        if (resp.id > 0) {
          inputPedidos.map(async (p) => {
            await saveRuteroHasPedido(resp.id, p.id_pedido);
          });
          stateChanger(true);
          hideDialog();
          toast.success("Registro exitoso");
        } else {
          toast.error("Ups! Algo ha salido mal. Comuníquese con el proveedor");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const agregarAlRutero = () => {
    let aRecaudar = 0;
    let temp = [...selectedPedidos];
    let input = [...inputPedidos];
    let hash = {};
    temp.map((item, i) => {
      input.push(item);
    });
    input = input.filter((rutero) =>
      hash[rutero.id_pedido] ? false : (hash[rutero.id_pedido] = true)
    );
    input.map((p) => {
      aRecaudar = aRecaudar + p.total_factura;
    });
    setInputPedidos(input);
    setRecaudo(aRecaudar);
    setPedidosTemp([]);
    setSelectedPedidos(null);
  };

  const onDateChange = (e) => {
    if (e.target.value !== "") {
      const val = e.target && e.target.value;
      setFecha(val);
      filtrarPedidos(pedidos, val);
    }
  };

  const filtrarPedidos = (data, fecha) => {
    let response = [];
    const fecha_temp = moment(fecha).format("YYYY-MM-DD");
    response = data.filter((pedido) => pedido.fecha_pedido == fecha_temp);
    setPedidosTemp(response);
  };

  const onSelect = (event) => {
    const { value } = event;
    setSelectedPedidos(value);
  };

  const hideDialog = () => {
    setSaveModal(false);
    setInputPedidos([]);
    setFecha(new Date());
    setPedidosTemp([]);
    setSelectedPedidos(null);
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
        style={{ width: "80vw" }}
        breakpoints={{ "960px": "80vw", "640px": "100vw" }}
        header={"Registrar Nuevo Rutero"}
        footer={saveDialogFooter}
        onHide={hideDialog}
        modal
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <label
              htmlFor="date"
              style={{ fontWeight: "bold" }}
              className="align-middle me-2"
            >
              Seleccione una fecha para buscar pedidos realizados:
            </label>
            <Calendar
              id="date"
              value={fecha}
              placeholder={"Seleccione una fecha"}
              showIcon
              hourFormat="24"
              onChange={(e) => onDateChange(e)}
              dateFormat="yy-mm-dd"
              monthNavigator
              yearNavigator
              yearRange="2020:2022"
              monthNavigatorTemplate={monthNavigatorTemplate}
              yearNavigatorTemplate={yearNavigatorTemplate}
            />
          </div>
        </div>
        <div className="mt-2 d-flex align-items-center gradient rounded-top text-white">
          <i className="fa fa-search ms-2"></i>
          <h6 className="ms-2 mt-2">Búsquedas de Pedidos</h6>
        </div>
        <div className="card">
          <DataTable
            value={pedidosTemp}
            selection={selectedPedidos}
            onSelectionChange={(e) => onSelect(e)}
            dataKey="id_pedido"
            scrollable
            scrollHeight="flex"
            size="small"
            emptyMessage="No se han encontrado coincidencias."
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3em" }}
            ></Column>
            <Column
              field="codigo_pedido"
              header="Código Pedido"
              bodyClassName={"py-1 ps-4"}
              className={"py-2 bg-light fw-bold ps-4"}
            ></Column>
            <Column
              field={"fecha_pedido"}
              header="Realizado el"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
            ></Column>
            <Column
              field="codigo_estab"
              header="Establecimiento"
              bodyClassName={"py-1 ps-4"}
              className={"py-2 bg-light fw-bold ps-4"}
            ></Column>
            <Column
              field="nombre_cliente"
              header="Cliente"
              bodyClassName={"py-1 ps-4"}
              className={"py-2 bg-light fw-bold ps-4"}
            ></Column>
            <Column
              field={"telefono_cliente"}
              header="Teléfono"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
            ></Column>
            <Column
              field={"total_factura"}
              header="Valor"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
            ></Column>
          </DataTable>
        </div>
        <div className="d-flex justify-content-end mt-1">
          <Button
            icon="pi pi-check"
            className="p-button-primary mx-1 my-1"
            label="Agregar al Rutero"
            onClick={agregarAlRutero}
          />
        </div>
        <div className="mt-2 d-flex align-items-center gradient rounded-top text-white">
          <i className="fa fa-th-list ms-2"></i>
          <h6 className="ms-2 mt-2">Pedidos registrados en el rutero</h6>
        </div>
        <div className="card">
          <DataTable
            value={inputPedidos}
            scrollable
            scrollHeight="flex"
            size="small"
            emptyMessage="No se han encontrado coincidencias."
          >
            <Column
              field="codigo_pedido"
              header="Código Pedido"
              bodyClassName={"py-1 ps-4"}
              className={"py-2 bg-light fw-bold ps-4"}
            ></Column>
            <Column
              field={"fecha_pedido"}
              header="Realizado el"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
            ></Column>
            <Column
              field="codigo_estab"
              header="Establecimiento"
              bodyClassName={"py-1 ps-4"}
              className={"py-2 bg-light fw-bold ps-4"}
            ></Column>
            <Column
              field="nombre_cliente"
              header="Cliente"
              bodyClassName={"py-1 ps-4"}
              className={"py-2 bg-light fw-bold ps-4"}
            ></Column>
            <Column
              field={"telefono_cliente"}
              header="Teléfono"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
            ></Column>
            <Column
              field={"total_factura"}
              header="Valor"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
            ></Column>
          </DataTable>
        </div>
        <div className="container card bg-light">
          <div className="d-flex px-2 pt-2 pb-1 text-end">
            <h5 className="flex-grow-1 pe-3">Total a recaudar:</h5>
            {recaudo ? (
              <h5>
                {Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                }).format(recaudo)}
              </h5>
            ) : (
              <h5>0</h5>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-end mt-1">
          <Button
            icon="pi pi-save"
            className="p-button-primary mx-1 my-1"
            label="Guardar Rutero"
            onClick={guardarRutero}
          />
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
