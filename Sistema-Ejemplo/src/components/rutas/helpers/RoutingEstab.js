import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import "./Routing.css";

export const RoutingEstab = (props) => {
  const { stores } = props;
  const { findRoute } = props;
  const [from, setFrom] = useState();
  const [to, setTo] = useState([
    {
      estab: "",
    },
  ]);
  const [indice, setIndice] = useState([]);
  const [suggestion, setSuggestion] = useState({
    textFrom: "",
    textTo: [],
    dataFrom: [],
    dataTo: [],
  });

  const filterEstabsFrom = (event) => {
    const { value } = event.target;
    const data = stores;
    const newData = data.filter(function (item) {
      const itemData = item.codigo_estab;
      const textData = value;
      return itemData.indexOf(textData) > -1;
    });
    setSuggestion({
      ...suggestion,
      textFrom: value,
      dataFrom: newData,
    });
  };

  const filterEstabsTo = (event, i) => {
    const { value } = event.target;
    const data = stores;
    const newData = data.filter(function (item) {
      const itemData = item.codigo_estab;
      const textData = value;
      return itemData.indexOf(textData) > -1;
    });
    const list = [...suggestion.textTo];
    list[i] = value;
    setSuggestion({
      ...suggestion,
      textTo: list,
      dataTo: newData,
    });
    setIndice(i);
  };

  const handleSuggestFrom = (suggest) => {
    setFrom(suggest.codigo_estab);
    setSuggestion({
      ...suggestion,
      textFrom: suggest.codigo_estab,
      data: [],
    });
  };

  const handleSuggestTo = (suggest) => {
    const list = [...to];
    const listText = [...suggestion.textTo];
    list[indice]["estab"] = suggest.codigo_estab;
    listText[indice] = suggest.codigo_estab;
    setTo(list);
    setSuggestion({
      ...suggestion,
      textTo: listText,
      data: [],
    });
  };

  const onSubmit = () => {
    if (from && to[0].estab !== "") {
      findRoute(from, to, "estab");
    } else {
      toast.warning("Debe ingresar datos para trazar una ruta");
    }
  };

  const handleAddClick = () => {
    setTo([
      ...to,
      {
        estab: "",
      },
    ]);
  };

  return (
    <>
      <div>
        <h5>Trazar Ruta</h5>
        <div className="border px-2 position-relative">
          <div className="row mt-2">
            <label htmlFor="from" className="col-sm-3 col-form-label">
              Desde:
            </label>
            <div className="col-sm-9">
              <span className="p-input-icon-left w-100">
                <i className="fa fa-search" />
                <InputText
                  name="from"
                  value={suggestion.textFrom}
                  autoComplete="off"
                  className="form-control"
                  onChange={(e) => filterEstabsFrom(e)}
                  onBlur={() => {
                    setTimeout(() => {
                      setSuggestion({ ...suggestion, dataFrom: [] });
                    }, 100);
                  }}
                  required={true}
                  placeholder="Código del Estab."
                />
              </span>
              <div
                id="result"
                className="card shadow rounded border w-50"
                style={{ position: "absolute", zIndex: 3 }}
              >
                <ul>
                  {suggestion.dataFrom &&
                    suggestion.dataFrom.slice(0, 5).map((estab, i) => (
                      <li
                        className="mx-2 mt-1"
                        onMouseDown={() => handleSuggestFrom(estab)}
                        key={i}
                      >
                        {estab.codigo_estab}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <label htmlFor="to" className="col-sm-3 col-form-label mt-2">
              Hasta:
            </label>
            <div className="col-sm-9">
              {to.map((item, i) => {
                return (
                  <>
                    <div key={i} className="mt-2">
                      <span className="p-input-icon-left w-100" style={{ zIndex: 2 }}>
                        <i className="fa fa-search" />
                        <InputText
                          name="to"
                          value={suggestion.textTo[i]}
                          autoComplete="off"
                          className="form-control"
                          onChange={(e) => filterEstabsTo(e, i)}
                          onBlur={() => {
                            setTimeout(() => {
                              setSuggestion({ ...suggestion, dataTo: [] });
                            }, 100);
                          }}
                          required={true}
                          placeholder="Código del Estab."
                        />
                      </span>
                      <div
                        id="result"
                        className="card shadow rounded border w-50"
                        style={{ position: "absolute", zIndex: 1 }}
                      >
                        <ul>
                          {suggestion.dataTo &&
                            suggestion.dataTo.slice(0, 5).map((estab, i) => (
                              <li
                                className="mx-2 mt-1"
                                onMouseDown={() => handleSuggestTo(estab)}
                                key={i}
                              >
                                {estab.codigo_estab}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="mt-3 mb-2 d-flex">
            <div className="flex-grow-1">
              <Button
                className="p-button-outlined"
                label="Trazar ruta"
                icon="pi pi-flag"
                onClick={onSubmit}
              />
            </div>
            <Button
              className="p-button-outlined"
              icon="pi pi-plus"
              onClick={handleAddClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};
