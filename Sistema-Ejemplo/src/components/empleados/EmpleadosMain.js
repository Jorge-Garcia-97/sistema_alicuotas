import React, { useEffect, useState } from "react";
import { get } from "../webServices/Get";
import { EmpleadosInactivos } from "./EmpleadosInactivos";
import { EmpleadosList } from "./EmpleadosList";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Accordion, AccordionTab } from "primereact/accordion";
import { EmpleadosHeader } from "./EmpleadosHeader";
import { RolesList } from "./RolesList";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

export const EmpleadosMain = () => {
  const { estado } = useParams();
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [state, setstate] = useState({
    roles: [],
    activos: [],
    inactivos: [],
    idEmpresa: undefined,
  });
  const [refresh, setrefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  let dataFiltrada = [];

  useEffect(() => {
    setCargando(true);
    async function cargarData(id){
      try {
        const roles = await get(`roles/empresa/${id}`);
        const activos = await get(`empleados/empresa/${id}/ACTIVO`);
        const inactivos = await get(`empleados/empresa/${id}/INACTIVO`);
        setstate({
          roles: roles,
          activos: activos,
          inactivos: inactivos,
          idEmpresa: id,
        });
        // dataFiltrada.map((element) => {
        //   console.log(element.title)
        //   element.data.map((item) =>{
        //     console.log(item);
        //   })
        // });
        setrefresh(false);
        setCargando(false);
      } catch (error) {
        toast.error(error);
      }
    }
    if(idEmpresa){
      cargarData(idEmpresa);
    }else{
      cargarData(id_Empresa);
    }
  }, [refresh]);

  state.roles.map((rol) => {
    dataFiltrada.push({
      title: rol.nombre_rol,
      data: state.activos.filter((emp) => emp.nombre_rol == rol.nombre_rol),
    });
  });

  function RenderList(props) {
    const { data } = props;
    const listItems = data.map((element, index) => (
      <>
        <div key={index} className="shadow-sm">
          <Accordion activeIndex={0} className="mt-3">
            <AccordionTab header={element.title}>
              <EmpleadosList
                {...state}
                data={element.data}
                stateChanger={setrefresh}
              />
            </AccordionTab>
          </Accordion>
        </div>
      </>
    ));
    return <>{listItems}</>;
  }

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
            <EmpleadosHeader {...state} />
            <div className="mt-2">
              {estado === "roles" && (
                <div className="mb-2 shadow-sm bg-body rounded">
                  <div className="pt-2 px-3 gradient rounded-top">
                    <div className="d-flex align-items-center justify-content-start text-white">
                      <h5>
                        Roles
                        <i className="fa fa-user-tie ms-2"></i>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 py-3">
                    <RolesList {...state} stateChanger={setrefresh} />
                  </div>
                </div>
              )}
              {estado === "activos" && (
                <div className="mb-2 shadow-sm bg-body rounded">
                  <div className="pt-2 px-3 gradient rounded-top">
                    <div className="d-flex align-items-center justify-content-start text-white">
                      <h5>
                        Personal Activo
                        <i className="fa fa-user-tie ms-2"></i>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 pb-3">
                    {Object.keys(state.roles).length > 0 ? (
                      <RenderList data={dataFiltrada} />
                    ) : (
                      <>
                        <div className="contianer text-center py-3">
                          <h6>
                            Para proceder a gestionar los miembros del personal,
                            primeramente, se tiene que registrar los roles de la
                            organización
                          </h6>
                          <Link to="/personal/roles">
                            <Button
                              label="Gestionar Roles"
                              icon="pi pi-angle-right"
                              className="mt-2"
                            />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              {estado === "inactivos" && (
                <div className="mb-2 shadow-sm bg-body rounded">
                  <div className="pt-2 px-3 gradient rounded-top">
                    <div className="d-flex align-items-center justify-content-start text-white">
                      <h5>
                        Personal Inactivo
                        <i className="fa fa-user-tie ms-2"></i>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 py-3">
                    {Object.keys(state.roles).length > 0 ? (
                      <EmpleadosInactivos
                        {...state}
                        stateChanger={setrefresh}
                      />
                    ) : (
                      <>
                        <div className="contianer text-center py-3">
                          <h6>
                            Para proceder a gestionar los miembros del personal,
                            primeramente, se tiene que registrar los roles de la
                            organización
                          </h6>
                          <Link to="/personal/roles">
                            <Button
                              label="Gestionar Roles"
                              icon="pi pi-angle-right"
                              className="mt-2"
                            />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              <ToastContainer autoClose={5000} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
