const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar todos los establecimientos
router.get("/establecimientos/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM establecimiento, cliente WHERE establecimiento.cliente_id_cliente = cliente.id_cliente AND cliente.estado_cliente = 'Activo'",
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

//consultar todos los establecimientos por empresa
router.get("/establecimientos/empresa/:id", (req, res) => {
  const {id} = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM establecimiento as e, cliente as c WHERE e.cliente_id_cliente = c.id_cliente AND c.estado_cliente = 'ACTIVO' AND c.empresa_id_empresa = ?"
        conn.query(query, [id], function (err, row) {
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

//consultar establecimiento por ID
router.get("/establecimiento/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM establecimiento WHERE id_estab = ?",
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

//consultar establecimiento por código
router.get("/establecimiento/codigo/:codigo", (req, res) => {
  try {
    const { codigo } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM establecimiento WHERE codigo_estab = ?",
          [codigo],
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

//Registrar nuevo establecimiento
router.post("/establecimiento/save/", (req, res) => {
  try {
    const data = {
      codigo_estab: req.body.codigo_estab,
      ubicacion_estab: req.body.ubicacion_estab,
      latitud_estab: req.body.latitud_estab,
      longitud_estab: req.body.longitud_estab,
      cliente_estab: req.body.cliente_estab,
      sector_estab: req.body.sector_estab,
    };
    const query = `INSERT INTO establecimiento (codigo_estab, ubicacion_estab, latitud_estab, longitud_estab, cliente_id_cliente, sector_id_sector) VALUES ('${data.codigo_estab}', '${data.ubicacion_estab}', '${data.latitud_estab}', '${data.longitud_estab}', '${data.cliente_estab}', '${data.sector_estab}')`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(query, function (err, row) {
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
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

//Actulizar información de la categoría
router.post("/establecimiento/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      ubicacion_estab: req.body.ubicacion_estab,
      latitud_estab: req.body.latitud_estab,
      longitud_estab: req.body.longitud_estab,
      sector_estab: req.body.sector_estab,
    };
    const query = `UPDATE establecimiento SET ubicacion_estab = '${data.ubicacion_estab}', latitud_estab = '${data.latitud_estab}', longitud_estab = '${data.longitud_estab}', sector_id_sector = '${data.sector_estab}' WHERE id_estab = ?`;
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
