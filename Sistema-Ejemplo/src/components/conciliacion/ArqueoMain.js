import React from "react";
import { useParams } from "react-router-dom";
import { ConciliacionMain } from "./conciliacion/ConciliacionMain";
import { RuteroMain } from "./rutero/RuteroMain";

export const ArqueoMain = () => {
  const { tipo } = useParams();
  return (
    <div>
      {tipo === "rutero" && <RuteroMain />}
      {tipo === "conciliacion" && <ConciliacionMain />}
    </div>
  );
};
