export const datosRequeridos = (idEmpresa) => {
    return (dispatch) => {
        dispatch(dataContext(idEmpresa))
    }
}

export const permisosRequeridos = (gestionEmpleados, gestionProductos, gestionClientes, gestionPedidos, gestionRutas, gestionCaja, informacionGeneral) => {
    return (dispatch) => {
        dispatch(permisosContext(gestionEmpleados, gestionProductos, gestionClientes, gestionPedidos, gestionRutas, gestionCaja, informacionGeneral))
    }
}

export const dataContext = (idEmpresa) =>{
    return{
        type: "[Data] State",
        payload: {idEmpresa}
    }
}

export const permisosContext = (gestionEmpleados, gestionProductos, gestionClientes, gestionPedidos, gestionRutas, gestionCaja, informacionGeneral) =>{
    return{
        type: "[Data] StatePermisos",
        payload: {gestionEmpleados, gestionProductos, gestionClientes, gestionPedidos, gestionRutas, gestionCaja, informacionGeneral}
    }
}

export const limpiarContext = () =>{
    return{
        type: "[Data] LogOutData",
    }
}