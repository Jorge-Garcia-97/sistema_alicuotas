const INITIAL_STATE = null;

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case '[Auth] LogInState':
      return {
        id: action.payload.id,
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
        rol: action.payload.rol,
        isLogin: action.payload.isLogin,
        isAdmin: action.payload.isAdmin
      };

    case '[Auth] LogInAdminState':
      return {
        id: action.payload.id,
        nombre: action.payload.nombre,
        isLogin: action.payload.isLogin,
        isAdmin: action.payload.isAdmin
      };

    case '[Auth] LogOutState':
      return {
        id: action.payload.id,
        nombre: INITIAL_STATE,
        apellido: INITIAL_STATE,
        rol: INITIAL_STATE,
        isLogin: INITIAL_STATE,
        isAdmin: INITIAL_STATE
      };

      case '[Auth] LogOutAdminState':
        return {
          id: action.payload.id,
          nombre: INITIAL_STATE,
          isLogin: INITIAL_STATE,
          isAdmin: INITIAL_STATE
        };

    default:
      return state;
  }
};
