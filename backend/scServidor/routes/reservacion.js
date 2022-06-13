const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar reservaciones
router.get("/reservacion/", (req, res) => {
    try {
        getConnection(function (err, conn) {
            if (err) {
                return res.status(500).send("¡Algo ha salido mal!");
            } else {
                conn.query("SELECT * FROM reservacion", function (err, row) {
                    if (err) {
                        return res.status(404).send("No se ha encontrado ninguna reservación");
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

//Registrar nueva reservación
router.post("/reservacion/nueva/", (req, res) => {
    try {
        const data = {
            idreservacion: req.body.idreservacion,
            motivo_reseracion: req.body.motivo_reseracion,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            valor_garantia: req.body.valor_garantia,
            valor_alquiler: req.body.valor_alquiler
        };
        const query = `INSERT INTO reservacion (idreservacion, motivo_reseracion, fecha_inicio, fecha_fin, valor_garantia, valor_alquiler) VALUES ('${data.idreservacion}', '${data.motivo_reseracion}', '${data.fecha_inicio}','${data.fecha_fin}','${data.valor_garantia}','${data.valor_alquiler}')`;
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

//Actulizar información de la reservación
router.post("/reservacion/actualizar/:id/", (req, res) => {
    try {
      const { id } = req.params;
      const data = {
        idreservacion: req.body.idreservacion,
        motivo_reseracion: req.body.motivo_reseracion,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        valor_garantia: req.body.valor_garantia,
        valor_alquiler: req.body.valor_alquiler
      };
      const query = `UPDATE reservacion SET idreservacion = '${data.idreservacion}', motivo_reservacion = '${data.motivo_reseracion}', fecha_inicio = '${data.fecha_inicio}', fecha_fin = '${data.fecha_fin}', valor_garantia = '${data.valor_garantia}', valor_alquiler = '${data.valor_alquiler}'' WHERE idreservacion = ?`;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query(query, [id], function (err, row) {
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

module.exports = router;