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
        dispatch(login(id, nombre, apellido, rol, isLogin));
      } else {
        Toast.fire({
          icon: 'error',
          title:
            'No se han encontrado un usuario con las credenciales ingresadas. Verifique.',
        });
      }
    } catch (e) {
      Toast.fire({
        icon: 'error',
        title: `${e}`,
      });
    }
  };
};

export const login = (id, nombre, apellido, rol, isLogin) => {
  return {
    type: '[Auth] LogInState',
    payload: {
      id,
      nombre,
      apellido,
      rol,
      isLogin,
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
