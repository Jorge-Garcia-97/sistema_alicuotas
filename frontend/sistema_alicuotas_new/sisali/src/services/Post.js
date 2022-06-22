export const saveUsuario = async data => {
  try {
    const response = await fetch(`http://localhost:4000/usuario/save/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_usuario: data.id,
        nombre_usuario: data.correo,
        contraseña_usuario: data.password,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const savePropietario = async data => {
  try {
    const response = await fetch(`http://localhost:4000/propietario/save/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_propietario: data.id,
        cedula_propietario: data.cedula,
        nombre_propietario: data.nombre,
        apellido_propietario: data.apellido,
        rol_propietario: data.rol,
        celular_propietario: data.telefono,
        correo_propietario: data.correo,
        usuario_id_usuario: data.usuario,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const saveImagenPropietario = async (data, id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/propietario/imagen/save/${id}/`,
      {
        method: 'POST',
        body: data,
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
