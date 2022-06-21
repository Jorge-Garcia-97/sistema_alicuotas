import React, { useEffect, useState } from "react";
import { get } from "../webServices/Get";
import { Accordion, AccordionTab } from "primereact/accordion";
import { LineChart } from "./LineChart";

export const PedidosStats = (props) => {
  const { idEmpresa, id_Empresa } = props;
  const [chartData1, setChartData1] = useState({});

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
        data.map(async (item, i) => {
          let aux = null;
          aux = await get(`stats/pedidos/${id}/${item.value[0]}/${item.value[1]}/`);
          dataSheet[i] = parseInt(
            aux.map((element) => element.pedidos_realizados)
          );
          labels[i] = item.name;
        });
        setChartData1({
          labels: labels,
          datasets: [
            {
              label: "Resumen Mensual",
              data: dataSheet,
              fill: false,
              borderColor: "#42A5F5",
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
      setChartData1({});
    };
  }, []);

  return (
    <>
      <Accordion activeIndex={1} className="mt-3">
        <AccordionTab
          header={
            <h6 className="mb-0">
              Información estadística sobre ventas concretadas
              <i className="ms-2 fa fa-shipping-fast" />
            </h6>
          }
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-12 text-center">
                <h6 className="mb-3 border-bottom">
                  <i className="me-2 fa fa-chart-bar" />
                  Ventas concretadas por cada mes del año
                </h6>
                <div className="d-flex justify-content-center">
                  <LineChart {...chartData1} />
                </div>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </>
  );
};
