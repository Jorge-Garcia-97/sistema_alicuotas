import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { get } from "../webServices/Get";

export const EmpleadoChart = () => {
  const [state, setstate] = useState({
    administracion: [],
    ventas: [],
    entregas: [],
    bodega: [],
    inactivos: [],
    activos: [],
  });

  useEffect(() => {
    cargarData();
    return () => {
      setstate({});
    };
  }, []);

  const cargarData = async () => {
    try {
      const admins = await get("empleado/rol/ADMINISTRACION/");
      const vendedores = await get("empleado/rol/VENTAS/");
      const despachadores = await get("empleado/rol/ENTREGAS/");
      const bodegueros = await get("empleado/rol/GESTION BODEGA/");
      const activos = await get("empleados/estado/Activo");
      setstate({
        ...state,
        administracion: admins,
        ventas: vendedores,
        entregas: despachadores,
        bodega: bodegueros,
        activos: activos,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="row bg-white">
        <div className="col-lg-5 col-md-12 col-sm-12">
          <div className="py-2 text-center">
            <PieChart
              data={[
                {
                  title: "Administración",
                  value: state.administracion.length,
                  color: "#1C4C96",
                },
                {
                  title: "Ventas",
                  value: state.ventas.length,
                  color: "#256edc",
                },
                {
                  title: "Entregas",
                  value: state.entregas.length,
                  color: "#97bdf5",
                },
                {
                  title: "Bodega",
                  value: state.bodega.length,
                  color: "#5f95e7",
                },
              ]}
              style={{ minWidth: 150, maxWidth: 200 }}
              lineWidth={50}
              animate
            />
          </div>
        </div>
        <div className="col-lg-7 col-md-12 col-sm-12 border-start">
          <div className="px-2 py-2">
            <h3>
              Personal
              <em className="mx-2"> {state.activos.length}</em>
              <i className="fa fa-user" style={{ fontSize: "22px" }}></i>
            </h3>
            <hr></hr>
            <div className="px-3">
              <h5>
                <em className="mx-3" style={{ color: "#1C4C96" }}>
                  ■
                </em>
                Administración
                <strong className="mx-1" style={{ color: "#1C4C96" }}>
                  {state.administracion.length}
                </strong>
              </h5>
              <h5>
                <em className="mx-3" style={{ color: "#256edc" }}>
                  ■
                </em>
                Ventas
                <strong className="mx-1" style={{ color: "#256edc" }}>
                  {state.ventas.length}
                </strong>
              </h5>
              <h5>
                <em className="mx-3" style={{ color: "#97bdf5" }}>
                  ■
                </em>
                Entregas
                <strong className="mx-1" style={{ color: "#97bdf5" }}>
                  {state.entregas.length}
                </strong>
              </h5>
              <h5>
                <em className="mx-3" style={{ color: "#5f95e7" }}>
                  ■
                </em>
                Gestión de Bodega
                <strong className="mx-1" style={{ color: "#5f95e7" }}>
                  {state.bodega.length}
                </strong>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
