import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { editEstadoPedido, editProductoStock } from "../../webServices/Post";
import { get } from "../../webServices/Get";

export const EliminarPedido = (props) => {
  const {deleteModal, setDeleteModal, stateChanger, id_pedido, id_factura} = props;

  const borrarRegistro = async () => {
    try {
      const response = await editEstadoPedido(id_pedido, "INACTIVO");
      if (response) {
        const detalles = await get(`factura/detalles/${id_factura}}/`);
        const list = [...detalles];
        list.map(async(detalle, i) =>{
          const stock = (detalle.cantidad_stock_prod + detalle.cantidad_detalle);
          await editProductoStock(detalle.id_prod, stock);
        });
        hideDialog();
        toast.success("Registro eliminado");
        stateChanger(true);
      } else {
        toast.error("Ups! Algo ha salido mal");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const hideDialog = () => {
    setDeleteModal(false);
  };

  const deleteDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideDialog}
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
        visible={deleteModal}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteDialogFooter}
        onHide={hideDialog}
      >
        <div className="confirmation-content text-center">
          <i
            className="pi pi-exclamation-triangle p-mr-3 text-danger"
            style={{ fontSize: "2rem" }}
          />
          <br />
          <span>
            ¿Estás seguro de querer eliminar el registro de
            este pedido de forma permanente?
          </span>
        </div>
        <ToastContainer autoClose={5000} />
      </Dialog>
    </>
  );
};
