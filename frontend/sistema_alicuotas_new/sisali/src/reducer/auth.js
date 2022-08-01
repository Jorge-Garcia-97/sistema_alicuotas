import Swal from 'sweetalert2';
import { get } from '../services/Get';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  customClass: {
    container: 'container-popup',
    popup: 'popup',
  },
});

export const autenticacion = (usuario, password) => {
  return async dispatch => {
    try {
      let isLogin = false;
      let isAdmin = false;
      const response = await get(`usuario/inicio/${usuario}/${password}`);
      let aux = response ? Object.keys(response).length : 0;
      if (aux > 0) {
        const id = response.map(function (item) {
          return item.id_propietario;
        });
        const nombre = response.map(function (item) {
          return item.nombre_propietario;
        });
        const apellido = response.map(function (item) {
          return item.apellido_propietario;
        });
        const rol = response.map(function (item) {
          return item.rol_propietario;
        });
        isLogin = true;
        dispatch(login(id, nombre, apellido, rol, isLogin, isAdmin));
      } else {
        const response = await get(`usuario/admin/inicio/${usuario}/${password}`);
        let aux = response ? Object.keys(response).length : 0;
        if (aux > 0) {
          const id = response.map(function (item) {
            return item.id_administrador;
          });
          const nombre = response.map(function (item) {
            return item.nombre_administrador;
          });
          const apellido = '';
          const rol = '';
          isLogin = true;
          isAdmin = true;
          dispatch(loginAdmin(id, nombre, isLogin, isAdmin));
        } else {
          Toast.fire({
            icon: 'error',
            title:
              'No se han encontrado un usuario con las credenciales ingresadas. Verifique.',
          });
        }
      }
    } catch (e) {
      Toast.fire({
        icon: 'error',
        title: `${e}`,
      });
    }
  };
};

export const login = (id, nombre, apellido, rol, isLogin, isAdmin) => {
  return {
    type: '[Auth] LogInState',
    payload: {
      id,
      nombre,
      apellido,
      rol,
      isLogin,
      isAdmin
    },
  };
};

export const loginAdmin = (id, nombre, isLogin, isAdmin) => {
  return {
    type: '[Auth] LogInAdminState',
    payload: {
      id,
      nombre,
      isLogin,
      isAdmin
    },
  };
};

export const logout = () => {
  return {
    type: '[Auth] LogOutState',
    payload: {
      isLogin: false,
    },
  };
};

export const logoutAdmin = () => {
  return {
    type: '[Auth] LogOutAdminState',
    payload: {
      isLogin: false,
    },
  };
};
