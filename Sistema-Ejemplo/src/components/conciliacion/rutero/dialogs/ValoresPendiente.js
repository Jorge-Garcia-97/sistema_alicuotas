import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import {
  deleteValorPendiente,
  saveValorPendiente,
} from "../../../webServices/Post";
import { toast, ToastContainer } from "react-toastify";

export const ValoresPendiente = (props) => {
  const { visible, setVisible, pendientes, id_rutero, pedido_id_pedido } =
    props;
  const [registro, setRegistro] = useState({ monto: "", descripcion: "" });
  const [registroDialog, setRegistroDialog] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [temp, setTemp] = useState(null);

  const registroValor = async () => {
    try {
      const response = await saveValorPendiente(
        registro.monto,
        registro.descripcion,
        id_rutero,
        pedido_id_pedido
      );
      if (response) {
        hideValoresRegistroDialog();
        hideValoresDialog();
      } else {
        toast.error("Ups! Algo ha salido mal. Comuníquese con el proveedor");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const borrarRegistro = async () => {
    try {
      const response = await deleteValorPendiente(temp.id_valor);
      if (response) {
        hideValoresBorrarDialog();
        hideValoresDialog();
      } else {
        toast.error("Ups! Algo ha salido mal. Intente nuevamente");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const hideValoresBorrarDialog = () => {
    setDeleteModal(false);
  };

  const hideValoresDialog = () => {
    setVisible(false);
  };

  const hideValoresRegistroDialog = () => {
    setRegistroDialog(false);
    setRegistro({ descripcion: "", monto: "" });
  };

  const accionBorrar = (rowData) => {
    setTemp({ ...rowData });
    setDeleteModal(true);
  };

  const actions = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-times"
          label="Eliminar"
          className="p-button-danger mx-1 my-1"
          onClick={() => accionBorrar(rowData)}
        />
      </>
    );
  };

  const valoresRegistroDialogFooter = (
    <>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        autoFocus
        className="p-button-outlined p-button-secondary"
        onClick={hideValoresRegistroDialog}
      />
    </>
  );

  const valoresDialogFooter = (
    <>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        autoFocus
        className="p-button-outlined p-button-secondary"
        onClick={hideValoresDialog}
      />
    </>
  );

  const valoresDialogHeader = (
    <>
      <Button
        label="Nuevo Valor"
        icon="pi pi-plus"
        className="p-button-primary"
        onClick={() => setRegistroDialog(true)}
      />
    </>
  );

  const deleteDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideValoresBorrarDialog}
      />
      <Button
        label="Borrar"
        icon="pi pi-trash"
        autoFocus
        className="p-button-outlined p-button-danger"
        onClick={borrarRegistro}
      />
    </>
  );

  return (
    <>
      <Dialog
        visible={visible}
        style={{ width: "40vw" }}
        header={valoresDialogHeader}
        onHide={hideValoresDialog}
        footer={valoresDialogFooter}
        modal
      >
        <div className="card">
          <DataTable
            value={pendientes}
            scrollable
            scrollHeight="flex"
            size="small"
            emptyMessage="No se han encontrado coincidencias."
          >
            <Column
              field="descripcion_valor"
              header="Descripción"
              bodyClassName={"py-1 ps-4"}
              className={"py-2 bg-light fw-bold ps-4"}
            ></Column>
            <Column
              field={"total_valor"}
              header="Monto"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
            ></Column>
            <Column
              header="Acciones"
              bodyClassName={"py-1"}
              className={"py-2 bg-light fw-bold"}
              body={actions}
            ></Column>
          </DataTable>
        </div>
      </Dialog>

      <Dialog
        visible={registroDialog}
        style={{ width: "30vw" }}
        header={"Registrar nuevo Valor Pendiente"}
        onHide={hideValoresRegistroDialog}
        footer={valoresRegistroDialogFooter}
        modal
      >
        <div className="container">
          <div className="d-flex align-items-center">
            <label className="flex-fill">Descripción:</label>
            <span className="p-input-icon-left flex-fill">
              <i className="fa fa-tag" />
              <InputText
                value={registro.descripcion}
                onChange={(e) =>
                  setRegistro({ ...registro, descripcion: e.target.value })
                }
                placeholder="Motivo por el cual se genera el valor"
                required
                className="w-100"
              />
            </span>
          </div>
          <div className="d-flex mt-2 align-items-center">
            <label className="flex-fill">Monto:</label>
            <span className="p-input-icon-left flex-fill">
              <InputNumber
                value={registro.monto}
                onValueChange={(e) =>
                  setRegistro({ ...registro, monto: e.value })
                }
                prefix="$ "
                minFractionDigits={2}
                maxFractionDigits={2}
                placeholder="Valor"
                className="w-100"
                required
              />
            </span>
          </div>
          <div className="text-center mt-3">
            <Button
              label="Guardar"
              icon="pi pi-save"
              className="p-button-primary"
              onClick={registroValor}
            />
          </div>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>

      <Dialog
        visible={deleteModal}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDialogFooter}
        onHide={hideValoresBorrarDialog}
      >
        <div className="confirmation-content text-center">
          <i
            className="pi pi-exclamation-triangle p-mr-3 text-danger"
            style={{ fontSize: "2rem" }}
          />
          <br />
          <span>¿Estás seguro de querer eliminar el registro?</span>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>

      <ToastContainer autoClose={5000} />
    </>
  );
};
