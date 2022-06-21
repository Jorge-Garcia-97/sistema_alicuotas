import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { get } from "../../webServices/Get";
import { HeaderClientes } from "../HeaderClientes";
import { ClientesInactivos } from "./ClientesInactivos";
import { ClientesList } from "./ClientesList";
import { useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";

export const ClientesMain = () => {
  const { estado } = useParams();
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [state, setstate] = useState({
    establecimientos: [],
    clientesactivos: [],
    clientesinactivos: [],
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
      const clientesactivos = await get(`clientes/empresa/${id}/ACTIVO`);
      const clientesinactivos = await get(`clientes/empresa/${id}/INACTIVO`);
      const establecimientos = await get(`establecimientos/empresa/${id}`);
      setstate({
        clientesactivos: clientesactivos,
        clientesinactivos: clientesinactivos,
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
          <div className="mt-2 ms-2">
            <div>
              <HeaderClientes {...state} />
            </div>
            <div className="mt-2">
              {estado === "activos" && (
                <>
                  <div className="mb-2 shadow-sm bg-body rounded">
                    <div className="pt-2 px-3 gradient rounded-top">
                      <div className="d-flex align-items-center justify-content-start text-white">
                        <h5>
                          Clientes Activos
                          <i className="fa fa-users ms-2"></i>
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 py-2">
                      <ClientesList {...state} stateChanger={setrefresh} />
                    </div>
                  </div>
                </>
              )}
              {estado === "inactivos" && (
                <>
                  <div className="mb-2 shadow-sm bg-body rounded">
                    <div className="pt-2 px-3 gradient rounded-top">
                      <div className="d-flex align-items-center justify-content-start text-white">
                        <h5>
                          Clientes Inactivos
                          <i className="fa fa-users-slash ms-2"></i>
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 py-2">
                      <ClientesInactivos {...state} stateChanger={setrefresh} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <ToastContainer autoClose={5000} />
    </>
  );
};
