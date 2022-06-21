const INITIAL_STATE = null;

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "[Auth] LogInStateAdmin":
      return {
        id: action.payload.id,
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
        isLogin: action.payload.isLogin,
        isAdmin: action.payload.isAdmin,
      };

    case "[Auth] LogInState":
      return {
        id: action.payload.id,
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
        id_Empresa: action.payload.id_Empresa,
        isLogin: action.payload.isLogin,
        isAdmin: action.payload.isAdmin,
      };

    case "[Auth] LogOutState":
      return {
        id: action.payload.id,
        nombre: INITIAL_STATE,
        apellido: INITIAL_STATE,
        idEmpresa: INITIAL_STATE,
        isLogin: INITIAL_STATE,
        isAdmin: INITIAL_STATE,
      };

    default:
      return state;
  }
};
