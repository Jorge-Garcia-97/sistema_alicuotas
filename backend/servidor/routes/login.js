const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar el empleado por correo
router.get("/empleado/correo/:correo/", (req, res) => {
  try {
    const { correo } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query =
          "SELECT id_empleado FROM empleado WHERE empleado.correo_empleado = ?";
        conn.query(query, [correo], function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar existencia de un usuario relacionado a un empleado
router.get("/usuario/:id/", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query ="SELECT e.id_empleado, e.nombre_empleado, e.apellido_empleado, e.empresa_id_empresa, u.password_usuario FROM usuario as u, empleado as e WHERE u.empleado_id_empleado = e.id_empleado AND u.empleado_id_empleado = ?";
        conn.query(query, [id], function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar usuario con password = ?
router.get("/usuario/password/:password/", (req, res) => {
  try {
    const { password } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query =
          "SELECT * FROM usuario WHERE usuario.password_usuario = ?";
        conn.query(query, [password], function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar el empleado por correo
router.get("/admin/correo/:correo/", (req, res) => {
  try {
    const { correo } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM admin WHERE correo_admin = ?";
        conn.query(query, [correo], function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar admin con password = ?
router.get("/admin/password/:password/", (req, res) => {
  try {
    const { password } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query =
          "SELECT * FROM admin WHERE password_admin = ?";
        conn.query(query, [password], function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
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
