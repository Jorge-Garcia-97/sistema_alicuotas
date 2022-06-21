import { get } from "../components/webServices/Get";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const autenticacion = (correo, password) => {
  return async (dispatch) => {
    try{
      let response = "";
      let aux = "";
      let temp = "";
      let isLogin = false;
      let isAdmin = false;
      response = await get(`admin/correo/${correo}`);
      aux = Object.keys(response).length;
      if (aux > 0) {
        temp = response.map(function (item) {
          return item.password_admin;
        });
        if (temp == password) {
          const id = response.map(function (item) {
            return item.id_admin;
          });
          const nombre = response.map(function (item) {
            return item.nombre_admin;
          });
          const apellido = response.map(function (item) {
            return item.apellido_admin;
          });
          isLogin = true;
          isAdmin = true;
          dispatch(loginAdmin(id, nombre, apellido, isAdmin, isLogin));
        } else {
          toast.error("Ups! contraseña incorrecta");
        }
      } else {
        response = await get(`empleado/correo/${correo}`);
        aux = Object.keys(response).length;
        if (aux > 0) {
          temp = response.map(function (item) {
            return item.id_empleado;
          });
          response = await get(`usuario/${temp}`);
          aux = Object.keys(response).length;
          if (aux > 0) {
            temp = response.map(function (item) {
              return item.password_usuario;
            });
            if (temp == password) {
              const id = response.map(function (item) {
                return item.id_empleado;
              });
              const nombre = response.map(function (item) {
                return item.nombre_empleado;
              });
              const apellido = response.map(function (item) {
                return item.apellido_empleado;
              });
              const idEmpresa = response.map(function (item) {
                return item.empresa_id_empresa;
              });
              isLogin = true;
              isAdmin = false;
              console.log(id, nombre, apellido, idEmpresa, isAdmin, isLogin);
              dispatch(login(id, nombre, apellido, idEmpresa, isAdmin, isLogin));
            } else {
              toast.error("Ups! contraseña incorrecta");
            }
          } else {
            toast.warning("No se encontró ningún usuario con esos datos");
          }
        } else {
          toast.warning("No se encontró ningún usuario con esos datos");
        }
      }
    }catch(e){
      console.log(e);
    }
  };
};

export const loginAdmin = (id, nombre, apellido, isAdmin, isLogin) => {
  return {
    type: "[Auth] LogInStateAdmin",
    payload: {
      id,
      nombre,
      apellido,
      isAdmin,
      isLogin
    },
  };
};

export const login = (id, nombre, apellido, id_Empresa, isAdmin, isLogin) => {
  return {
    type: "[Auth] LogInState",
    payload: {
      id,
      nombre,
      apellido,
      id_Empresa,
      isAdmin,
      isLogin
    },
  };
};

export const logout = () => {
  return {
    type: "[Auth] LogOutState",
    payload: {
      isLogin: false,
    },
  };
};