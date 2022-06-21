import React, { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { get } from "../../webServices/Get";
import { ConciliacionList } from "./ConciliacionList";
import moment from "moment";

export const ConciliacionMain = () => {
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [state, setState] = useState({
    arqueos: [],
    ruteros: [],
    arqueosP: [],
  });

  useEffect(() => {
    setCargando(true);

    async function cargarData(id) {
      try {
        let temp = [];
        let temp_aux = [];
        let aux = [];
        let auxP = [];
        let hash = {};

        const arqueos = await get(`conciliacion/empresa/${id}`);
        const ruteros = await get(`ruteros/empresa/${id}/ACTIVO`);

        aux = arqueos.filter((c) =>
          hash[c.id_con] ? false : (hash[c.id_con] = true)
        );
        temp = ruteros.filter((rutero) =>
          hash[rutero.id_rutero] ? false : (hash[rutero.id_rutero] = true)
        );

        temp.map((rutero, i) => {
          temp_aux[i] = {
            id_rutero: rutero.id_rutero,
            no_rutero: `00-${rutero.id_rutero}`,
            fecha_rutero: moment(rutero.fecha_rutero).add(1, 'day').format("YYYY-MM-DD"),
            total_rutero: rutero.total_rutero,
          };
        });
        aux.map((c, i) => {
          auxP[i] = {
            id_con: c.id_con,
            fecha_con: moment(c.fecha_con).format("YYYY-MM-DD"),
            efectivo_inicial_con: Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(c.efectivo_inicial_con),
            efectivo_final_con: Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(c.efectivo_final_con),
            depositos_con: Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(c.depositos_con),
            transferencias_con: Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            }).format(c.transferencias_con),
            no_rutero: `00-${c.id_rutero}`,
          };
        });
        setState({ arqueos: aux, ruteros: temp_aux, arqueosP: auxP });
        setCargando(false);
        setRefresh(false);
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
      setState({ arqueos: [], ruteros: [], arqueosP: [] });
    };
  }, [refresh]);

  return (
    <>
      {cargando === true ? (
        <>
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center">
              <div className="col-auto">
                <ProgressSpinner strokeWidth="5" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-2 ms-2">
            <div className="mt-2">
              <div className="mb-2 shadow-sm bg-body rounded">
                <div className="pt-2 px-3 gradient rounded-top">
                  <div className="d-flex align-items-center justify-content-start text-white">
                    <h5>
                      Conciliaciones
                      <i className="fa fa-cash-register ms-2"></i>
                    </h5>
                  </div>
                </div>
                <div className="px-3 py-3">
                  <ConciliacionList
                    {...state}
                    idEmpresa={idEmpresa}
                    id_Empresa={id_Empresa}
                    stateChanger={setRefresh}
                  />
                </div>
              </div>
            </div>
            <ToastContainer autoClose={5000} />
          </div>
        </>
      )}
    </>
  );
};
