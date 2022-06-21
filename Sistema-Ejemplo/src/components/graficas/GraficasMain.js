import React from "react";
import { useSelector } from "react-redux";
import { EmpleadosStats } from "./EmpleadosStats";
import { IngresosGastosStats } from "./IngresosGastosStats";
import { PedidosStats } from "./PedidosStats";
import { ProductosStats } from "./ProductosStats";

export const GraficasMain = () => {
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);

  return (
    <>
      <div className="ps-3 pt-2 h-100">
        <div className="card pb-3">
          <div className="pt-2 px-3 gradient rounded-top">
            <div className="d-flex align-items-center justify-content-start text-white">
              <h5>
                Reportes e Información sobre su organización
                <i className="fa fa-pie-chart ms-2"></i>
              </h5>
            </div>
          </div>
          <div className="px-2">
            <ProductosStats idEmpresa={idEmpresa} id_Empresa={id_Empresa} />
            <EmpleadosStats idEmpresa={idEmpresa} id_Empresa={id_Empresa} />
            <PedidosStats idEmpresa={idEmpresa} id_Empresa={id_Empresa} />
            <IngresosGastosStats
              idEmpresa={idEmpresa}
              id_Empresa={id_Empresa}
            />
          </div>
        </div>
      </div>
    </>
  );
};
