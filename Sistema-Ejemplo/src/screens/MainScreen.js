import React, { useState } from "react";
import { AdminScreen } from "./administrador/AdminScreen";

export const MainScreen = () => {
  const [state, setstate] = useState({ rol: "admin" });
  const { rol } = state;
  return (
    <div className="py-0 my-0">
      {rol === "admin" && <AdminScreen />}
      {rol === "vendedor" && <AdminScreen />}
      {rol === "despachador" && <AdminScreen />}
      {rol === "bodeguero" && <AdminScreen />}
      {rol === "secretaria" && <AdminScreen />}
    </div>
  );
};
