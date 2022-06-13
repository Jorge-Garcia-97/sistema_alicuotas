const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar usuarios
router.get("/usuarios/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM usuario", function (err, row) {
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

//consultar usuarios por empresa
router.get("/usuarios/empresa/:id", (req, res) => {
  const {id} = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT e.nombre_empleado, e.correo_empleado, e.telefono_empleado, u.password_usuario FROM usuario as u, empleado as e WHERE u.empleado_id_empleado = e.id_empleado AND e.estado_empleado = 'ACTIVO' AND e.empresa_id_empresa = ?";
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

module.exports = router;