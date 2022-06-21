import React, { useEffect, useState } from "react";
import { get } from "../webServices/Get";
import { BarChart } from "./BarChart";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dropdown } from "primereact/dropdown";

export const ProductosStats = (props) => {
  const { idEmpresa, id_Empresa } = props;
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [fechas1, setFechas1] = useState("Resumen completo");
  const [fechas2, setFechas2] = useState("Resumen completo");
  const meses = [
    { name: "Resumen completo" },
    { name: "Enero" },
    { name: "Febrero" },
    { name: "Marzo" },
    { name: "Abril" },
    { name: "Mayo" },
    { name: "Junio" },
    { name: "Julio" },
    { name: "Agosto" },
    { name: "Septiembre" },
    { name: "Octubre" },
    { name: "Noviembre" },
    { name: "Diciembre" },
  ];
  const mesesData = [
    { name: "Resumen completo", value: ["COMPLETO"] },
    { name: "Enero", value: ["2022-01-01", "2022-02-01"] },
    { name: "Febrero", value: ["2022-02-01", "2022-03-01"] },
    { name: "Marzo", value: ["2022-03-01", "2022-04-01"] },
    { name: "Abril", value: ["2022-04-01", "2022-05-01"] },
    { name: "Mayo", value: ["2022-05-01", "2022-06-01"] },
    { name: "Junio", value: ["2022-06-01", "2022-07-01"] },
    { name: "Julio", value: ["2022-07-01", "2022-08-01"] },
    { name: "Agosto", value: ["2022-08-01", "2022-09-01"] },
    { name: "Septiembre", value: ["2022-09-01", "2022-10-01"] },
    { name: "Octubre", value: ["2022-10-01", "2022-11-01"] },
    { name: "Noviembre", value: ["2022-11-01", "2022-12-01"] },
    { name: "Diciembre", value: ["2022-12-01", "2023-01-01"] },
  ];

  useEffect(() => {
    async function cargarData(id) {
      try {
        const res1 = await get(`stats/productos/solicitados/${id}/`);
        const res2 = await get(`stats/productos/vendidos/${id}/`);
        let labels = res1.map((item) => item.nombre_prod);
        let data = res1.map((item) => item.ventas);
        setChartData1({
          labels: labels,
          datasets: [
            {
              label: "Más solicitados",
              data: data,
              backgroundColor: [
                "#ffbb11",
                "#1E8449",
                "#50AF95",
                "#2E86C1",
                "#85C1E9",
              ],
            },
          ],
        });
        labels = res2.map((item) => item.nombre_prod);
        data = res2.map((item) => item.cantidad_vendida);
        setChartData2({
          labels: labels,
          datasets: [
            {
              label: "Más vendidos",
              data: data,
              backgroundColor: [
                "#ffbb11",
                "#1E8449",
                "#50AF95",
                "#2E86C1",
                "#85C1E9",
              ],
            },
          ],
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (idEmpresa) {
      cargarData(idEmpresa);
    } else {
      cargarData(id_Empresa);
    }
    return () => {
        setChartData1({});
        setChartData2({});
    }
  }, []);

  async function cargarDataFecha1(id) {
    try {
      const res1 = await get(`stats/productos/solicitados/${id}/`);
      const labels = res1.map((item) => item.nombre_prod);
      const data = res1.map((item) => item.ventas);
      setChartData1({
        labels: labels,
        datasets: [
          {
            label: "Más solicitados",
            data: data,
            backgroundColor: [
              "#ffbb11",
              "#1E8449",
              "#50AF95",
              "#2E86C1",
              "#85C1E9",
            ],
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function cargarDataFecha1Param(id, inicio, fin) {
    try {
      const res1 = await get(`stats/productos/solicitados/${id}/${inicio}/${fin}/`);
      const labels = res1.map((item) => item.nombre_prod);
      const data = res1.map((item) => item.ventas);
      setChartData1({
        labels: labels,
        datasets: [
          {
            label: "Más solicitados",
            data: data,
            backgroundColor: [
              "#ffbb11",
              "#1E8449",
              "#50AF95",
              "#2E86C1",
              "#85C1E9",
            ],
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function cargarDataFecha2(id) {
    try {
      const res2 = await get(`stats/productos/vendidos/${id}/`);
      const labels = res2.map((item) => item.nombre_prod);
      const data = res2.map((item) => item.cantidad_vendida);
      setChartData2({
        labels: labels,
        datasets: [
          {
            label: "Cantidad vendida",
            data: data,
            backgroundColor: [
              "#ffbb11",
              "#1E8449",
              "#50AF95",
              "#2E86C1",
              "#85C1E9",
            ],
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function cargarDataFecha2Param(id, inicio, fin) {
    try {
      const res2 = await get(`stats/productos/vendidos/${id}/${inicio}/${fin}/`);
      const labels = res2.map((item) => item.nombre_prod);
      const data = res2.map((item) => item.cantidad_vendida);
      setChartData2({
        labels: labels,
        datasets: [
          {
            label: "Cantidad vendida",
            data: data,
            backgroundColor: [
              "#ffbb11",
              "#1E8449",
              "#50AF95",
              "#2E86C1",
              "#85C1E9",
            ],
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleDate1 = (value) => {
    let temp = [];
    if (value === "Resumen completo") {
      temp = mesesData.filter((mes) => mes.name == value);
      setFechas1(temp[0].name);
      if (idEmpresa) {
        cargarDataFecha1(idEmpresa);
      } else {
        cargarDataFecha1(id_Empresa);
      }
    } else {
      temp = mesesData.filter((mes) => mes.name == value);
      setFechas1(temp[0].name);
      if (idEmpresa) {
        cargarDataFecha1Param(idEmpresa, temp[0].value[0], temp[0].value[1]);
      } else {
        cargarDataFecha1Param(id_Empresa, temp[0].value[0], temp[0].value[1]); 
      }
    }
  };

  const handleDate2 = (value) => {
    let temp = [];
    if (value === "Resumen completo") {
      temp = mesesData.filter((mes) => mes.name == value);
      setFechas2(temp[0].name);
      if (idEmpresa) {
        cargarDataFecha2(idEmpresa);
      } else {
        cargarDataFecha2(id_Empresa);
      }
    } else {
      temp = mesesData.filter((mes) => mes.name == value);
      setFechas2(temp[0].name);
      if (idEmpresa) {
        cargarDataFecha2Param(idEmpresa, temp[0].value[0], temp[0].value[1]);
      } else {
        cargarDataFecha2Param(id_Empresa, temp[0].value[0], temp[0].value[1]); 
      }
    }
  };

  return (
    <>
      <Accordion activeIndex={0} className="mt-3">
        <AccordionTab
          header={
            <h6 className="mb-0">
              Información estadística sobre Productos
              <i className="ms-2 fa fa-box" />
            </h6>
          }
        >
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <h6 className="mb-3 border-bottom">
                <i className="me-2 fa fa-chart-bar" />
                Productos que más intervienen en la generación de pedidos
              </h6>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <label className="text-primary me-3">Filtar por mes</label>
                <Dropdown
                  name={"meses1"}
                  value={fechas1}
                  options={meses}
                  optionLabel="name"
                  optionValue="name"
                  onChange={(e) => handleDate1(e.value)}
                  placeholder="Seleccione un mes"
                  style={{ minWidth: "150px" }}
                />
              </div>
              <BarChart chartData={chartData1} />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <h6 className="mb-3 border-bottom">
                <i className="me-2 fa fa-chart-bar" />
                Productos más vendidos por cantidad
              </h6>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <label className="me-3 text-primary">Filtar por mes</label>
                <Dropdown
                  name={"meses2"}
                  value={fechas2}
                  options={meses}
                  optionLabel="name"
                  optionValue="name"
                  onChange={(e) => handleDate2(e.value)}
                  placeholder="Seleccione un mes"
                  style={{ minWidth: "150px" }}
                />
              </div>
              <BarChart chartData={chartData2} />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </>
  );
};
