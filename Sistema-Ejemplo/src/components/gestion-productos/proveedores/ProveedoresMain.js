import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get } from "../../webServices/Get";
import { Header } from "../Header";
import { ProveedoresInactivos } from "./ProveedoresInactivos";
import { ProveedoresList } from "./ProveedoresList";
import { ProgressSpinner } from "primereact/progressspinner";

export const ProveedoresMain = () => {
  const { estado } = useParams();
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [state, setstate] = useState({
    productos: [],
    categorias: [],
    proveedores: [],
    prInactivos: [],
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
      const productos = await get(`productos/empresa/${id}`);
      const categorias = await get(`categorias/empresa/${id}`);
      const prActivos = await get(`proveedores/empresa/${id}/ACTIVO`);
      const prInactivos = await get(`proveedores/empresa/${id}/INACTIVO`);
      setstate({
        productos: productos,
        categorias: categorias,
        proveedores: prActivos,
        prInactivos: prInactivos,
        idEmpresa: id,
      });
      setrefresh(false);
      setCargando(false);
    } catch (error) {
      console.error(error);
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
              <Header {...state} />
            </div>
            {estado === "activos" ? (
              <div className="mt-2">
                <div className="mb-2 shadow-sm bg-body rounded">
                  <div className="pt-2 px-3 gradient rounded-top">
                    <div className="d-flex align-items-center justify-content-start text-white">
                      <h5>
                        Proveedores Activos
                        <i className="fa fa-user-tie ms-2"></i>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <ProveedoresList {...state} stateChanger={setrefresh} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <div className="mb-2 shadow-sm bg-body rounded">
                  <div className="pt-2 px-3 gradient rounded-top">
                    <div className="d-flex align-items-center justify-content-start text-white">
                      <h5>
                        Proveedores dados de baja
                        <i className="fa fa-user-slash ms-2"></i>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <ProveedoresInactivos
                      {...state}
                      stateChanger={setrefresh}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
