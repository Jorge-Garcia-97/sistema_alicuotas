const INITIAL_STATE = null;

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "[Auth] LogInState":
      return {
        id: action.payload.id,
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
        rol: action.payload.rol,
        isLogin: action.payload.isLogin,
      };

    case "[Auth] LogOutState":
      return {
        id: action.payload.id,
        nombre: INITIAL_STATE,
        apellido: INITIAL_STATE,
        rol: INITIAL_STATE,
        isLogin: INITIAL_STATE,
      };

    default:
      return state;
  }
};