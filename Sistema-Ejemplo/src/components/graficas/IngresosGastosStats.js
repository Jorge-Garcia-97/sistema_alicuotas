import React, { useEffect, useState } from "react";
import { get } from "../webServices/Get";
import { Accordion, AccordionTab } from "primereact/accordion";
import { LineChart } from "./LineChart";

export const IngresosGastosStats = (props) => {
  const { idEmpresa, id_Empresa } = props;
  const [chartData, setChartData] = useState({});

  const mesesData = [
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
    async function cargarData(data, id) {
      try {
        var labels = [];
        var dataSheet = [];
        var temp = [];
        data.map(async (item, i) => {
          let aux = null;
          aux = await get(`stats/gastos/${id}/${item.value[0]}/${item.value[1]}/`);
          dataSheet[i] = parseInt(
            aux.map((element) => {
              if (element.total_gastos) {
                return element.total_gastos;
              } else {
                return 0;
              }
            })
          );
          aux = await get(`stats/ventas/${id}/${item.value[0]}/${item.value[1]}/`);
          temp[i] = parseInt(
            aux.map((element) => {
              if (element.ventas) {
                return element.ventas;
              } else {
                return 0;
              }
            })
          );
          labels[i] = item.name;
        });
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Ingresos",
              data: temp,
              fill: false,
              borderColor: "#42A5F5",
              tension: 0.4,
            },
            {
              label: "Gastos",
              data: dataSheet,
              fill: false,
              borderColor: "#ffbb11",
              tension: 0.4,
            },
          ],
        });
      } catch (e) {
        console.log(e);
      }
    }

    if(idEmpresa){
      cargarData(mesesData, idEmpresa);
    }else{
      cargarData(mesesData, id_Empresa);
    }
    return () => {
      setChartData({});
    };
  }, []);

  return (
    <>
      <Accordion activeIndex={1} className="mt-3">
        <AccordionTab
          header={
            <h6 className="mb-0">
              Información estadística sobre Ingresos y Gastos
              <i className="ms-2 fa fa-cash-register" />
            </h6>
          }
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-12 text-center">
                <h6 className="mb-3 border-bottom">
                  <i className="me-2 fa fa-chart-bar" />
                  Ingresos & Gastos realizados por cada mes del año
                </h6>
                <div className="d-flex justify-content-center">
                  <LineChart {...chartData} />
                </div>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </>
  );
};
