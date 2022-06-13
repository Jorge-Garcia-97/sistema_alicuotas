const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar todos los roles
router.get("/roles/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM rol", function (err, row) {
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
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

//consultar todos los roles de una empresa
router.get("/roles/empresa/:id", (req, res) => {
  const {id} = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM rol WHERE empresa_id_empresa = ?"; 
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
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

//Registrar nuevo Rol
router.post("/rol/save/", (req, res) => {
  try {
    const data = {
      nombre_rol: req.body.nombre_rol,
      descripcion_rol: req.body.descripcion_rol,
      permiso_productos_rol: req.body.permiso_productos_rol,
      permiso_pedidos_rol: req.body.permiso_pedidos_rol,
      permiso_caja_rol: req.body.permiso_caja_rol,
      empresa_rol : req.body.empresa_rol
    };
    const query = `INSERT INTO rol (nombre_rol, descripcion_rol, permiso_productos_rol, permiso_pedidos_rol, permiso_caja_rol, empresa_id_empresa) VALUES ('${data.nombre_rol}', '${data.descripcion_rol}', '${data.permiso_productos_rol}', '${data.permiso_pedidos_rol}', '${data.permiso_caja_rol}', '${data.empresa_rol}')`;   
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
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
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

//Actulizar información del Rol
router.post("/rol/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_rol: req.body.nombre_rol,
      descripcion_rol: req.body.descripcion_rol,
    };
    const query = `UPDATE rol SET nombre_rol = '${data.nombre_rol}', descripcion_rol = '${data.descripcion_rol}' WHERE id_rol = ?`;
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