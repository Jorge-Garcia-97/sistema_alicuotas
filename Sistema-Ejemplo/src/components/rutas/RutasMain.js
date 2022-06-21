import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { get } from "../webServices/Get";
import { MapaStores } from "./MapaStores";
import { ProgressSpinner } from "primereact/progressspinner";

export const RutasMain = () => {
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [state, setstate] = useState({
    establecimientos: [],
    idEmpresa: undefined,
  });
  const [refresh, setrefresh] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    if(idEmpresa){
      cargarData(idEmpresa);
    }else{
      cargarData(id_Empresa);
    }
  }, [refresh]);

  const cargarData = async (id) => {
    try {
      const establecimientos = await get(`establecimientos/empresa/${id}`);
      setstate({
        establecimientos: establecimientos,
        idEmpresa: id,
      });
      setrefresh(false);
      setCargando(false);
    } catch (error) {
      toast.error(error);
    }
  };

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
          <div className="mt-2 ms-2 h-100">
            <div className="mt-2 h-100">
              <div className="mb-2 shadow-sm bg-body h-100">
                <div className="pt-2 px-3">
                  <div className="d-flex align-items-center justify-content-start py-1 border-bottom">
                    <h5>
                      Ubicación de clientes
                      <i className="fa fa-store ms-2"></i>
                    </h5>
                  </div>
                </div>
                <div className="px-3 py-2 h-100">
                  <MapaStores {...state} />
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
