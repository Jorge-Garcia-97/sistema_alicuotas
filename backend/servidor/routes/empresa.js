const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar empresa por ID
router.get("/empresa/:id/", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM empresa WHERE id_empresa = ?",
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

//consultar empresa por ID de admin
router.get("/empresa/admin/:id/", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM empresa WHERE admin_id_admin = ?",
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

//Registrar nueva empresa
router.post("/empresa/save/", (req, res) => {
  try {
    const data = {
      ruc_empresa: req.body.ruc_empresa,
      nombre_empresa: req.body.nombre_empresa,
      actividad_empresa: req.body.actividad_empresa,
      ciudad_empresa: req.body.ciudad_empresa,
      telefono_empresa: req.body.telefono_empresa,
      correo_empresa: req.body.correo_empresa,
      admin_id_admin: req.body.id_admin,
    };
    const query = `INSERT INTO empresa (ruc_empresa, nombre_empresa, actividad_empresa, ciudad_empresa, telefono_empresa, correo_empresa, admin_id_admin) VALUES ('${data.ruc_empresa}', '${data.nombre_empresa}', '${data.actividad_empresa}', '${data.ciudad_empresa}', '${data.telefono_empresa}', '${data.correo_empresa}', '${data.admin_id_admin}')`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(query, function (err, row, fields) {
          if (err) {
            console.log(err);
            return res
              .status(404)
              .send("Sorry for that. The request could not be made.");
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

//Editar una empresa
router.post("/empresa/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_empresa: req.body.nombre_empresa,
      actividad_empresa: req.body.actividad_empresa,
      ciudad_empresa: req.body.ciudad_empresa,
      telefono_empresa: req.body.telefono_empresa,
      correo_empresa: req.body.correo_empresa,
    };

    const query = `UPDATE empresa SET nombre_empresa = '${data.nombre_empresa}', actividad_empresa = '${data.actividad_empresa}', ciudad_empresa = '${data.ciudad_empresa}', telefono_empresa = '${data.telefono_empresa}', correo_empresa = '${data.correo_empresa}'  WHERE id_empresa = ?`;

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
