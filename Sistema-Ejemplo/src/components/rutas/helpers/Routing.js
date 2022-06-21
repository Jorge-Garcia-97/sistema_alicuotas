import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { suggestPlaces } from "./RoutingHelpers";
import "./Routing.css";

export const Routing = (props) => {
  const { stores } = props;
  const { findRoute } = props;
  const { client } = props;
  const { index } = props;
  const [state, setstate] = useState({
    desde: null,
    hasta: null,
    sugerencias: [],
  });

  const handleText = async () => {
    if (state.desde) {
      const sugerencias = await suggestPlaces(index, client, state.desde);
      setstate({ ...state, sugerencias: sugerencias });
    } else {
      toast.warning("Debes ingresar una ubicación");
    }
  };

  const handleSuggest = (suggest) => {
    setstate({ ...state, sugerencias: [], desde: suggest });
  };

  const onSubmit = () => {
    if (state.desde && state.hasta) {
      findRoute(state.desde, state.hasta, "busqueda");
    } else {
      toast.warning("Debe ingresar datos para trazar una ruta");
    }
  };

  return (
    <>
      <div className="mt-2 position-relative">
        <h5>Buscar ruta</h5>
        <div className="border px-2">
          <div className="mt-2">
            <label htmlFor="desde">Desde: </label>
            <div className="input-group">
              <InputText
                id="desde"
                type="text"
                autoComplete="off"
                value={state.desde}
                onChange={(e) => setstate({ ...state, desde: e.target.value })}
                onBlur={() => {
                  setTimeout(() => {
                    setstate({ ...state, sugerencias: [] });
                  }, 100);
                }}
                placeholder="Santa Rosa & Guatemala, Santo Domingo de los Colorados, Santo Domingo, ECU"
                className="form-control"
              />
              <Button
                className="p-button-outlined"
                icon="pi pi-search"
                onClick={handleText}
              />
            </div>
            <div
              id="result"
              className="card shadow rounded border py-1"
              style={{ position: "absolute", zIndex: 1 }}
            >
              <ul>
                {state.sugerencias &&
                  state.sugerencias.map((sugg, i) => (
                    <li
                      className="mx-2 mt-1"
                      onMouseDown={() => handleSuggest(sugg.Text)}
                      key={i}
                    >
                      {sugg.Text}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="store">Hasta:</label>
            <Dropdown
              id="store"
              value={state.hasta}
              options={stores}
              optionLabel="codigo_estab"
              optionValue="codigo_estab"
              placeholder="Seleccione un establecimiento"
              onChange={(e) => {
                setstate({ ...state, hasta: e.target.value });
              }}
              className="w-100"
            />
          </div>
          <div className="text-center mt-3 mb-2">
            <Button
              className="p-button-outlined"
              label="Trazar ruta"
              icon="pi pi-flag"
              onClick={onSubmit}
            />
          </div>
        </div>
        <h5 className="mt-2">Inidicaciones</h5>
        <div className="border mt-2 py-2 px-2">
          <p className="my-0">
            <i className="fa fa-circle me-2" style={{ color: "#F30808" }} />
            Ubicación de la búsqueda realizada
          </p>
          <p className="my-0">
            <i className="fa fa-circle me-2" style={{ color: "#27A21A" }} />
            Establecimientos registrados
          </p>
          <p className="my-0">
            <i className="fa fa-minus me-2" style={{ color: "#144BBB" }} />
            Mejor ruta encontrada
          </p>
        </div>
      </div>
    </>
  );
};
