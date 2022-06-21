export const datosReducer = (state = {}, action) => {
  switch (action.type) {
    case "[Data] State":
      return {
        idEmpresa: action.payload.idEmpresa,
      };

    case "[Data] StatePermisos":
      return {
        gestionEmpleados: action.payload.gestionEmpleados,
        gestionProductos: action.payload.gestionProductos,
        gestionClientes: action.payload.gestionClientes,
        gestionPedidos: action.payload.gestionPedidos,
        gestionRutas: action.payload.gestionRutas,
        gestionCaja: action.payload.gestionCaja,
        informacionGeneral: action.payload.informacionGeneral,
      };

    case "[Data] LogOutData":
      return {
        idEmpresa: null,
      };

    default:
      return state;
  }
};
