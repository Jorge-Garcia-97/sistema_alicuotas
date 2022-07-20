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
          const query = "SELECT pg.id_pago_alicuota, pg.mes_alicuota, pg.fecha_maxima_alicuota, pg.valor_alicuota, pg.valor_pendiente_alicuota, pg.estado_alicuota, pd.id_propiedad, pd.numero_casa, p.id_propietario, p.nombre_propietario, p.apellido_propietario, p.celular_propietario FROM pago_alicuota as pg, propiedad as pd, propietario as p where pg.propiedad_id_propiedad = pd.id_propiedad and pd.propietario_id_propietario = p.id_propietario";
          conn.query(query, function (err, row) {
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
          mes_alicuota: req.body.mes_alicuota,
          valor_alicuota: req.body.valor_alicuota,
          valor_pendiente_alicuota: req.body.valor_pendiente_alicuota,
          fecha__maxima_alicuota: req.body.fecha_maxima_alicuota,
          estado_alicuota: req.body.estado_alicuota,  
          propiedad_id_propiedad: req.body.propiedad_id_propiedad
      };
      const query = `INSERT INTO pago_alicuota (mes_alicuota, fecha_maxima_alicuota, valor_alicuota, valor_pendiente_alicuota, estado_alicuota, propiedad_id_propiedad) VALUES ( '${data.mes_alicuota}', '${data.fecha__maxima_alicuota}','${data.valor_alicuota}','${data.valor_pendiente_alicuota}','${data.estado_alicuota}','${data.propiedad_id_propiedad}')`;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query(query, function (err, row) {
            if (err) {
              console.log(err)
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