const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar pagos de alicuotas
router.get("/pagoalicuota/", (req, res) => {
    try {
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query("SELECT * FROM pago_alicuota", function (err, row) {
            if (err) {
              return res.status(404).send("No se ha encontrado ningún pago de alícuota");
            } else {
              return res.send(row);
            }
          });
        }
        conn.release();
      });
    } catch (error) {
      res.send("¡Error!. intente más tarde");
    }
  });

//Registrar nuevo pago de alícuota
router.post("/pagoalicuota/save/", (req, res) => {
    try {
      const data = {
          valor_alicuota: req.body.valor_alicuota,
          fecha_alicuota: req.body.fecha_alicuota,
          estado_alicuota: req.body.estado_alicuota,
          atraso_alicuota: req.body.atraso_alicuota
      };
      const query = `INSERT INTO pago_alicuota (valor_alicuota, fecha_alicuota, estado_alicuota, atraso_alicuota) VALUES ( '${data.valor_alicuota}', '${data.fecha_alicuota}','${data.estado_alicuota}','${data.atraso_alicuota}')`;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query(query, function (err, row) {
            if (err) {
              return res
                .status(404)
                .send("No se ha podido realizar su petición");
            } else {
              return res.status(200).send("Ok");
            }
          });
        }
        conn.release();
      });
    } catch (error) {
      res.send("¡Error!. intente más tarde");
    }
  });

  //Actulizar estado de la alícuota o de dar de baja
router.post("/pagoalicuota/edit/estado/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      estado_alicuota: req.body.estado_alicuota,
    };
    const query = `UPDATE pago_alicuota SET estado_alicuota= '${data.estado_alicuota}' WHERE id_pago_alicuota = ?`;
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