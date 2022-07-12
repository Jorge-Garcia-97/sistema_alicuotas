export const saveUsuario = async data => {
  try {
    const response = await fetch(`http://localhost:4000/usuario/save/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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

export const savePropietario = async (data, usuario_id) => {
  try {
    console.log(data);
    const response = await fetch(`http://localhost:4000/propietario/save/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cedula_propietario: data.cedula,
        nombre_propietario: data.nombre,
        apellido_propietario: data.apellido,
        rol_propietario: data.rol,
        celular_propietario: data.telefono,
        correo_propietario: data.correo,
        estado_propietario: 'ACTIVO',
        usuario_id_usuario: usuario_id,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editPropietario = async (data, id) => {
  try {
    console.log(data);
    const response = await fetch(
      `http://localhost:4000/propietario/edit/${id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cedula_propietario: data.cedula_propietario,
          nombre_propietario: data.nombre_propietario,
          apellido_propietario: data.apellido_propietario,
          celular_propietario: data.celular_propietario,
          correo_propietario: data.correo_propietario,
        }),
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

export const deletePropietario = async id => {
  try {
    const response = await fetch(
      `http://localhost:4000/propietario/delete/${id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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

export const editImagenPropietario = async (data, id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/propietario/imagen/edit/${id}/`,
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

export const savePropiedad = async data => {
  try {
    console.log(data);
    const response = await fetch(`http://localhost:4000/propiedades/save/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numero_casa: data.numero_casa,
        direccion_propiedad: data.direccion_propiedad,
        estado_propiedad: 'ACTIVO',
        propietario_id_propietario: data.propietario_id_propietario,
      }),
    });

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

export const editPropiedad = async (data, id) => {
  try {
    console.log(data);
    const response = await fetch(
      `http://localhost:4000/propiedades/edit/${id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numero_casa: data.numero_casa,
          direccion_propiedad: data.direccion_propiedad,
          propietario_id_propietario: data.propietario_id_propietario,
        }),
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

export const deletePropiedad = async id => {
  try {
    const response = await fetch(
      `http://localhost:4000/propiedad/delete/${id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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

export const saveArea = async data => {
  try {
    console.log(data);
    const response = await fetch(`http://localhost:4000/areacomunal/save/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre_area: data.nombre_area,
        descripcion_area: data.descripcion_area,
        estado_area: 'ACTIVO',
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editArea = async (data, id) => {
  try {
    console.log(data, id);
    const response = await fetch(
      `http://localhost:4000/areacomunal/edit/${id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion_area: data.descripcion_area,
        }),
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

export const saveImagenArea = async (data, id) => {
  try {
    console.log(data);
    const response = await fetch(
      `http://localhost:4000/areacomunal/imagen/save/${id}/`,
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

export const editImagenArea = async (data, id) => {
  try {
    console.log(data);
    const response = await fetch(
      `http://localhost:4000/areacomunal/imagen/edit/${id}/`,
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

export const deleteAreaComunal = async id => {
  try {
    const response = await fetch(
      `http://localhost:4000/areacomunal/delete/${id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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

export const savePagos = async data => {
  try {
    const response = await fetch(`http://localhost:4000/pagoalicuota/save/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mes_alicuota: data.mes_alicuota,
        valor_alicuota: data.valor_alicuota,
        valor_pendiente_alicuota: data.valor_pendiente_alicuota,
        fecha_maxima_alicuota: data.dateMax,
        estado_alicuota: data.estado_alicuota,
        propiedad_id_propiedad: data.id_propiedad,
      }),
    });
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
