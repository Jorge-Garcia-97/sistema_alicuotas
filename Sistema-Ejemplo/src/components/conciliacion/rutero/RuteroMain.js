import React, { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { get } from "../../webServices/Get";
import { RuteroList } from "./RuteroList";
import moment from "moment";

export const RuteroMain = () => {
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [state, setState] = useState({ ruteros: [] });

  useEffect(() => {
    setCargando(true);

    async function cargarData(id) {
      try {
        let temp = [];
        const ruteros = await get(`ruteros/empresa/${id}/ACTIVO`);
        ruteros.map((rutero, i) => {
          temp[i] = {
           id_rutero: rutero.id_rutero,
           no_rutero: `00-${rutero.id_rutero}`,
           fecha_rutero: moment(rutero.fecha_rutero).add(1,'day').format("YYYY-MM-DD"),
           total_rutero: Intl.NumberFormat("en-IN", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(rutero.total_rutero),
          }
        })
        let hash = {};
        temp = temp.filter( rutero => hash[rutero.id_rutero] ? false : hash[rutero.id_rutero] = true);
        setState({
          ruteros: temp,
        });
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
      setState({});
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
            <div>{/* <HeaderClientes {...state} /> */}</div>
            <div className="mt-2">
              <div className="mb-2 shadow-sm bg-body rounded">
                <div className="pt-2 px-3 gradient rounded-top">
                  <div className="d-flex align-items-center justify-content-start text-white">
                    <h5>
                      Ruteros y planificación de entregas diarias
                      <i className="fa fa-shipping-fast ms-2"></i>
                    </h5>
                  </div>
                </div>
                <div className="px-3 py-3">
                  <RuteroList {...state} idEmpresa={idEmpresa} id_Empresa={id_Empresa} stateChanger={setRefresh} />
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
