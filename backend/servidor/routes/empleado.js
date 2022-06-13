const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar todos los empleados según el estado
router.get("/empleados/estado/:estado", (req, res) => {
  const { estado } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM empleado as e, rol as r WHERE e.rol_id_rol = r.id_rol AND estado_empleado = ?",
          [estado],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar todos los empleados según el estado
router.get("/empleados/empresa/:id/:estado", (req, res) => {
  const { id } = req.params;
  const { estado } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM empleado as e, rol as r WHERE e.rol_id_rol = r.id_rol AND estado_empleado = ? AND e.empresa_id_empresa = ?";
        conn.query( query, [estado, id],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});
 
//consultar todos los empleados según su rol
router.get("/empleado/rol/:id/:idEmpresa", (req, res) => {
  try {
    const { id } = req.params;
    const { idEmpresa } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM empleado as e, rol as r WHERE e.rol_id_rol = r.id_rol AND r.id_rol = ? AND e.empresa_id_empresa = ?";
        conn.query(query, [id, idEmpresa],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar el empleado por ID
router.get("/empleado/:id/", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM empleado WHERE id_empleado = ?",
          [id],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

//consultar el empleado por cedula
router.get("/empleado/cedula/:cedula/:idEmpresa", (req, res) => {
  try {
    const { cedula } = req.params;
    const { idEmpresa } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM empleado WHERE empresa_id_empresa = ? AND cedula_empleado = ?";
        conn.query(query, [cedula, idEmpresa],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//Registrar nuevo empleado
router.post("/empleado/save/", (req, res) => {
  try {
    const data = {
      nombre_empleado: req.body.nombre_empleado,
      apellido_empleado: req.body.apellido_empleado,
      cedula_empleado: req.body.cedula_empleado,
      codigo_empleado: req.body.codigo_empleado,
      direccion_empleado: req.body.direccion_empleado,
      telefono_empleado: req.body.telefono_empleado,
      correo_empleado: req.body.correo_empleado,
      genero_empleado: req.body.genero_empleado,
      fecha_nacimiento_empleado: req.body.fecha_nacimiento_empleado,
      estado_empleado: req.body.estado_empleado,
      empresa_id_empresa: req.body.empresa_id_empresa,
      rol_id_rol: req.body.rol_id_rol
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO empleado (nombre_empleado, apellido_empleado, cedula_empleado, codigo_empleado, direccion_empleado, telefono_empleado, correo_empleado, genero_empleado, fecha_nacimiento_empleado, estado_empleado, empresa_id_empresa, rol_id_rol) VALUES ('${data.nombre_empleado}','${data.apellido_empleado}','${data.cedula_empleado}','${data.codigo_empleado}','${data.direccion_empleado}','${data.telefono_empleado}','${data.correo_empleado}','${data.genero_empleado}','${data.fecha_nacimiento_empleado}','${data.estado_empleado}','${data.empresa_id_empresa}','${data.rol_id_rol}')`;
        conn.query(query,
          function (err, row) {
            if (err) {
              return res
                .status(404)
                .send("Sorry for that. The request could not be made.");
            } else {
              return res.status(200).send("Ok");
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//Actulizar información del empleado
router.post("/empleado/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_empleado: req.body.nombre_empleado,
      apellido_empleado: req.body.apellido_empleado,
      direccion_empleado: req.body.direccion_empleado,
      telefono_empleado: req.body.telefono_empleado,
      correo_empleado: req.body.correo_empleado,
      genero_empleado: req.body.genero_empleado,
      fecha_nacimiento_empleado: req.body.fecha_nacimiento_empleado,
      rol_id_rol: req.body.rol_id_rol
    };
    const query = `UPDATE empleado SET nombre_empleado = '${data.nombre_empleado}', apellido_empleado = '${data.apellido_empleado}', direccion_empleado = '${data.direccion_empleado}', telefono_empleado= '${data.telefono_empleado}', correo_empleado = '${data.correo_empleado}', genero_empleado= '${data.genero_empleado}', fecha_nacimiento_empleado= '${data.fecha_nacimiento_empleado}', rol_id_rol= '${data.rol_id_rol}' WHERE id_empleado = ?`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(query, [id], function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("Sorry for that. The request could not be made.");
          } else {
            return res.status(200).send("Ok");
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//Actulizar estado del empleado o de dar de baja
router.post("/empleado/edit/estado/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      estado_empleado: req.body.estado_empleado,
    };
    const query = `UPDATE empleado SET estado_empleado= '${data.estado_empleado}' WHERE id_empleado = ?`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(query, [id], function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("Sorry for that. The request could not be made.");
          } else {
            return res.status(200).send("Ok");
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

module.exports = router;