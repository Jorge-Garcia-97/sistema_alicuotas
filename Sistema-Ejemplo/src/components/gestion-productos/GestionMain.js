import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "../webServices/Get";
import { CategoriaList } from "./categoria/CategoriaList";
import { Header } from "./Header";
import { ProductosList } from "./productos/ProductosList";
import { toast, ToastContainer } from "react-toastify";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

export const GestionMain = () => {
  const { tipo } = useParams();
  const { idEmpresa } = useSelector((state) => state.data);
  const { id_Empresa } = useSelector((state) => state.auth);
  const [state, setstate] = useState({
    productos: [],
    categorias: [],
    proveedores: [],
    idEmpresa: undefined,
  });
  const [refresh, setrefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  let dataFiltrada = [];

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
      const productos = await get(`productos/empresa/${id}/`);
      const categorias = await get(`categorias/empresa/${id}/`);
      const prActivos = await get(`proveedores/empresa/${id}/ACTIVO`);
      setstate({
        productos: productos,
        categorias: categorias,
        proveedores: prActivos,
        idEmpresa: id,
      });
      setrefresh(false);
      setCargando(false);
    } catch (error) {
      toast.error(error);
    }
  };

  state.categorias.map((item) => {
    dataFiltrada.push({
      title: item.nombre_cat,
      data: state.productos.filter(
        (prod) => prod.nombre_cat == item.nombre_cat
      ),
    });
  });

  function RenderList(props) {
    const { data } = props;
    const listItems = data.map((element, index) => (
      <>
        <div key={index} className="shadow-sm">
          <Accordion activeIndex={0} className="mt-3">
            <AccordionTab header={element.title}>
              <ProductosList
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
            <div>
              <Header {...state} />
            </div>
            <div className="mt-2">
              {tipo === "productos" && (
                <>
                  <div className="mb-2 shadow-sm bg-body rounded">
                    <div className="pt-2 px-3 gradient rounded-top">
                      <div className="d-flex align-items-center justify-content-start text-white">
                        <h5>
                          Productos
                          <i className="fa fa-box ms-2"></i>
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 pb-3">
                      {Object.keys(state.categorias).length > 0 ? (
                        <RenderList data={dataFiltrada} />
                      ) : (
                        <>
                          <div className="contianer text-center py-3">
                            <h6>
                              Para proceder a gestionar los productos de su
                              organización, primeramente, se tiene que registrar
                              categorías
                            </h6>
                            <Link to="/productos/categorias">
                              <Button
                                label="Agregar categorías"
                                icon="pi pi-angle-right"
                                className="mt-2"
                              />
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
              {tipo === "categorias" && (
                <>
                  <div className="mb-2 shadow-sm bg-body rounded">
                    <div className="pt-2 px-3 gradient rounded-top">
                      <div className="d-flex align-items-center justify-content-start text-white">
                        <h5>
                          Categorías
                          <i className="fa fa-th-large ms-2"></i>
                        </h5>
                      </div>
                    </div>
                    <div className="px-3 py-3">
                      <CategoriaList {...state} stateChanger={setrefresh} />
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
