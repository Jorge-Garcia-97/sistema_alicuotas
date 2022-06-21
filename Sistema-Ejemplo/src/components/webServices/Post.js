import moment from "moment";

export const saveEmpleado = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/empleado/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_empleado: data.nombre,
        apellido_empleado: data.apellido,
        cedula_empleado: data.cedula,
        codigo_empleado: data.codigo,
        direccion_empleado: data.direccion,
        telefono_empleado: data.telefono,
        correo_empleado: data.correo,
        genero_empleado: data.genero,
        fecha_nacimiento_empleado: data.date,
        estado_empleado: "ACTIVO",
        empresa_id_empresa: data.id_empresa,
        rol_id_rol: data.rol,
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

export const editEmpleado = async (id, data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/empleado/edit/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_empleado: data.nombre_empleado,
          apellido_empleado: data.apellido_empleado,
          direccion_empleado: data.direccion_empleado,
          telefono_empleado: data.telefono_empleado,
          correo_empleado: data.correo_empleado,
          genero_empleado: data.genero_empleado,
          fecha_nacimiento_empleado: data.fecha_nacimiento_empleado,
          rol_id_rol: data.rol_id_rol,
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

export const editEstadoEmpleado = async (id, estado) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/empleado/edit/estado/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado_empleado: estado,
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

export const saveProducto = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/producto/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo_prod: data.codigo,
        nombre_prod: data.nombre,
        descripcion_prod: data.descripcion,
        marca_prod: data.marca,
        preciounitario_prod: data.preciounitario,
        preciomayoreo_prod: data.preciomayoreo,
        iva_prod: data.iva,
        cantidad_prod: data.cantidad,
        fecha_ingreso_prod: moment(new Date()).format("YYYY-MM-DD"),
        categoria_prod: data.categoria,
        proveedor_prod: data.proveedor,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editProducto = async (id, data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/producto/edit/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_prod: data.nombre_prod,
          descripcion_prod: data.descripcion_prod,
          marca_prod: data.marca_prod,
          preciounitario_prod: data.preciounitario_prod,
          preciomayoreo_prod: data.preciomayoreo_prod,
          iva_prod: data.iva_prod,
          cantidad_prod: data.cantidad_stock_prod,
          categoria_prod: data.categoria_id_cat,
          proveedor_prod: data.proveedor_id_proveedor,
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

export const editProductoStock = async (id, cantidad) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/producto/edit/cantidad/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad_prod: cantidad,
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

export const saveProveedor = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/proveedor/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ruc_proveedor: data.ruc,
        nombre_proveedor: data.nombre,
        direccion_proveedor: data.direccion,
        telefono_proveedor: data.telefono,
        correo_proveedor: data.correo,
        estado_proveedor: "ACTIVO",
        empresa_proveedor: data.id_empresa,
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

export const editProveedor = async (id, data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/proveedor/edit/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_proveedor: data.nombre_proveedor,
          direccion_proveedor: data.direccion_proveedor,
          telefono_proveedor: data.telefono_proveedor,
          correo_proveedor: data.correo_proveedor,
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

export const editEstadoProveedor = async (id, estado) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/proveedor/edit/estado/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado_proveedor: estado,
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

// CATEGORÍA
export const saveCategoria = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/categoria/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_cat: data.nombre,
        descripcion_cat: data.descripcion,
        empresa_cat: data.id_empresa,
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

export const editCategoria = async (id, data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/categoria/edit/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_cat: data.nombre_cat,
          descripcion_cat: data.descripcion_cat,
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

//Rol
export const saveRol = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/rol/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_rol: data.nombre,
        descripcion_rol: data.descripcion,
        gestion_empleados_rol: data.gestion_empleados,
        gestion_productos_rol: data.gestion_productos,
        gestion_clientes_rol: data.gestion_clientes,
        gestion_pedidos_rol: data.gestion_pedidos,
        gestion_rutas_rol: data.gestion_rutas,
        gestion_caja_rol: data.gestion_caja,
        informacion_general_rol: data.informacion_general,
        estado_rol: data.estado,
        empresa_rol: data.id_empresa,
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

export const editERol = async (id, data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/rol/edit/${id}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_rol: data.nombre_rol,
        descripcion_rol: data.descripcion_rol,
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

export const editEstadoRol = async (id, estado) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/rol/edit/estado/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado_rol: estado,
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

//Establecimiento
export const saveEstablecimiento = async (data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/establecimiento/save/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo_estab: data.codigo,
          ubicacion_estab: data.ubicacion,
          latitud_estab: data.latitud,
          longitud_estab: data.longitud,
          cliente_estab: data.id_cliente,
        }),
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editEstablecimiento = async (id, data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/establecimiento/edit/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ubicacion_estab: data.ubicacion_estab,
          latitud_estab: data.latitud_estab,
          longitud_estab: data.longitud_estab,
        }),
      }
    );
    console.log(response.status);
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

//CLIENTE
export const saveCliente = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/cliente/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_cliente: data.nombre,
        apellido_cliente: data.apellido,
        telefono_cliente: data.telefono,
        ruc_cliente: data.ruc,
        correo_cliente: data.correo,
        estado_cliente: "ACTIVO",
        empresa_cliente: data.id_empresa,
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

export const editCliente = async (id, data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/cliente/edit/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_cliente: data.nombre_cliente,
          apellido_cliente: data.apellido_cliente,
          telefono_cliente: data.telefono_cliente,
          correo_cliente: data.correo_cliente,
        }),
      }
    );
    console.log(response.status);
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

export const editEstadoCliente = async (id, estado) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/cliente/edit/estado/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado_cliente: estado,
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

//Empresa
export const saveEmpresa = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/empresa/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ruc_empresa: data.ruc,
        nombre_empresa: data.nombre,
        actividad_empresa: data.actividad,
        ciudad_empresa: data.ciudad,
        telefono_empresa: data.telefono,
        correo_empresa: data.correo,
        id_admin: data.id_admin,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//Imagen empresa
export const saveImagenEmpresa = async (data, id) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/empresa/imagen/save/${id}/`,
      {
        method: "POST",
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

export const editImagenEmpresa = async (data, id) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/empresa/imagen/edit/${id}/`,
      {
        method: "POST",
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

//Imagen establecimiento
export const saveImagenEstab = async (data, id) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/establecimiento/imagen/save/${id}/`,
      {
        method: "POST",
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

export const editImagenEstab = async (data, id) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/establecimiento/imagen/edit/${id}/`,
      {
        method: "POST",
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

//Imagen producto
export const saveImagenProducto = async (data, id) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/producto/imagen/save/${id}/`,
      {
        method: "POST",
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

export const editImagenProducto = async (data, id) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/producto/imagen/edit/${id}/`,
      {
        method: "POST",
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

export const saveFactura = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/factura/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo_factura: data.codigo_factura,
        fecha_factura: data.fecha_factura,
        subtotal_factura: data.subtotal_factura,
        descuento_factura: data.descuento_factura,
        iva_factura: data.iva_factura,
        total_factura: data.total_factura,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editFactura = async (id, data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/factura/edit/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subtotal_factura: data.subtotal_factura,
        descuento_factura: data.descuento_factura,
        iva_factura: data.iva_factura,
        total_factura: data.total_factura,
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

export const savePedido = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/pedido/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo_pedido: data.codigo_pedido,
        factura_pedido: data.factura_pedido,
        establecimiento_pedido: data.establecimiento_pedido,
        estado_pedido: data.estado_pedido,
        fecha_pedido: data.fecha_pedido,
        empleado_pedido: data.empleado_pedido,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editEstadoPedido = async (id, estado) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/pedido/edit/estado/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado_pedido: estado,
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

export const saveDetalleFactura = async (data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/factura/detalle/save/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          factura_id_detalle: data.factura_detalle,
          cantidad_detalle: data.cantidad_detalle,
          ret_iva_detalle: data.ret_iva_detalle,
          descuento_detalle: data.descuento_detalle,
          subtotal_detalle: data.subtotal_detalle,
          producto_id_detalle: data.producto_detalle,
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

export const editDetalleFactura = async (id, data) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/factura/detalle/edit/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidad_detalle: data.cantidad_detalle,
          ret_iva_detalle: data.ret_iva_detalle,
          descuento_detalle: data.descuento_detalle,
          subtotal_detalle: data.subtotal_detalle,
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

export const saveUsuario = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/usuario/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_empleado: data.usuario_id,
        password_usuario: data.usuario_password,
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

export const editUsuario = async (id, password) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/usuario/edit/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password_usuario: password,
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

export const deleteUsuario = async (id) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/usuario/delete/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export const saveRutero = async (fecha, total, estado) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/rutero/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha_rutero: fecha,
        total_rutero: total,
        estado_rutero: estado,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editEstadoRutero = async (id, estado) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/rutero/edit/estado/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado_rutero: estado,
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

export const saveRuteroHasPedido = async (id_rutero, id_pedido) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/rutero/has/pedido/save/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_rutero: id_rutero,
          id_pedido: id_pedido,
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

export const saveValorPendiente = async (
  total,
  descripcion,
  id_rutero,
  id_pedido
) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/valor/pendiente/save/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total_valor: total,
          descripcion_valor: descripcion,
          id_rutero: id_rutero,
          id_pedido: id_pedido,
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

export const editValorPendiente = async (id, total, descripcion) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/valor/pendiente/edit/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total_valor: total,
          descripcion_valor: descripcion,
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

export const deleteValorPendiente = async (id) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/valor/pendiente/delete/${id}/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export const saveArqueo = async (data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/conciliacion/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha_con: data.fecha,
        efectivo_inicial: data.efectivo_inicial,
        efectivo_final: data.efectivo_final,
        depositos: data.depositos,
        transferencias: data.transferencias,
        id_rutero: data.rutero_id,
        id_empresa: data.empresa_id,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editArqueo = async (id, data) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/conciliacion/edit/${id}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        efectivo_inicial: data.efectivo_inicial,
        efectivo_final: data.efectivo_final,
        depositos: data.depositos,
        transferencias: data.transferencias,
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

export const saveGasto = async (data, id) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/gasto/save/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monto_gasto: data.monto,
        descripcion_gasto: data.descripcion,
        id_conciliacion: id,
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

export const editGasto = async (data, id) => {
  try {
    const response = await fetch(`http://3.134.76.83:5001/gasto/edit/${id}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monto_gasto: data.monto,
        descripcion_gasto: data.descripcion,
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


export const editPasswordAdmin = async (id, password) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/admin/edit/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password_admin: password,
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

export const editPasswordUsuario = async (id, password) => {
  try {
    const response = await fetch(
      `http://3.134.76.83:5001/usuario/edit/empleado/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password_usuario: password,
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
