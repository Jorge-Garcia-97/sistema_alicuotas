import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { get } from "../../../webServices/Get";
import { ValoresPendiente } from "./ValoresPendiente";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const RuteroView = (props) => {
  const {
    pedidos,
    id_rutero,
    no_rutero,
    fecha_rutero,
    totalRecaudo,
    viewModal,
    setViewModal,
    id_Empresa,
    idEmpresa
  } = props;
  const [pendientes, setPendientes] = useState({ pendientes: [] });
  const [visible, setVisible] = useState(false);
  const [pedido, setPedido] = useState(null);
  const [img, setimg] = useState();

  useEffect(() => {
    const cargarData = async (id) => {
      try {
        const img_name = await get(`empresa/imagen/${id}`);
        const logo = await getDataUri(`http://3.134.76.83:5001/${img_name.name}`);
        setimg(logo);
      } catch (e) {
        console.log(e);
      }
    };

    if(idEmpresa){
      cargarData(idEmpresa)
    }else{
      cargarData(id_Empresa)
    }
    return () => {
      setimg({});
    }
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

  async function cargarValoresPendientes(idRutero, idPedido) {
    try {
      let temp = [];
      const response = await get(`valor/pendiente/${idRutero}/${idPedido}`);
      response.map((p) => {
        temp.push({
          rutero_id_rutero: p.rutero_id_rutero,
          pedido_id_pedido: p.pedido_id_pedido,
          id_valor: p.id_valor,
          descripcion_valor: p.descripcion_valor,
          total_valor: Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(p.total_valor),
        });
      });
      setPendientes({ pendientes: temp });
    } catch (e) {
      console.log(e);
    }
  }

  const hideDialog = () => {
    setViewModal(false);
  };

  const actions = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-wallet"
          label="Ver"
          className="p-button-warning mx-1 my-1"
          onClick={() => accionVerValores(rowData)}
        />
      </>
    );
  };

  const accionVerValores = async (rowData) => {
    setPedido({ ...rowData });
    await cargarValoresPendientes(id_rutero, rowData.pedido_id_pedido);
    setVisible(true);
  };

  const print = () => {
    const doc = new jsPDF();
    const header = [
      [
        "Código Pedido",
        "Realizado el",
        "Establecimiento",
        "Cliente",
        "Referencia",
        "Teléfono",
        "Valor",
      ],
    ];
    const data = [];
    pedidos.map((p, i) => {
      data[i] = [
        p.codigo_pedido,
        p.fecha_pedido,
        p.codigo_estab,
        p.nombre_cliente,
        p.ubicacion_estab,
        p.telefono_cliente,
        p.total_factura,
      ];
    });
    const total = [
      ["Total a recaudar:", totalRecaudo],
    ];
    doc.text("Rutero", 15, 25);
    doc.text(`Fecha de creación: ${fecha_rutero}`, 15, 32);
    doc.autoTable({
      startY: 37,
      head: header,
      body: data,
    });
    doc.autoTable({
      margin: { left: 100, right: 15 },
      columnStyles: {
        0: { fontStyle: "bold", halign: "right" },
        1: { halign: "center" },
      },
      body: total
    });
    doc.addImage(img, "PNG", 170, 0, 30, 30);
    doc.save(`r-${no_rutero}.pdf`);
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
        breakpoints={{ "960px": "80vw", "640px": "100vw" }}
        header={"Información Detalla del Rutero"}
        footer={viewDialogFooter}
        onHide={hideDialog}
        modal
      >
        <div className="card">
          <DataTable
            value={pedidos}
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
              field="ubicacion_estab"
              header="Referencia"
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
            <Column
              header="Valores Pendientes"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
              body={actions}
            ></Column>
          </DataTable>
        </div>
        <div className="container card bg-light">
          <div className="d-flex px-2 pt-2 pb-1 text-end">
            <h5 className="flex-grow-1 pe-3">Total a recaudar:</h5>
            <h5>{totalRecaudo}</h5>
          </div>
        </div>
        <div className="d-flex mt-3 justify-content-center">
          <Button
            label="Descargar Rutero"
            icon="pi pi-download"
            className="p-button-primary"
            onClick={print}
          />
        </div>
      </Dialog>

      <ValoresPendiente
        {...pedido}
        {...pendientes}
        id_rutero={id_rutero}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};
