const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

router.get("/valores_pendientes/estado/:estado", (req, res) => {
  try {
    const { estado } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        const query = "SELECT * FROM valor_pendiente as v, detalle_comprobante as d, comprobante as c WHERE v.detalle_comprobante_comprobante_id_comprobante = d.id_detalle_comprobante AND d.comprobante_id_comprobante = c.id_comprobante AND v.estado_valor_pendiente = ?";
        conn.query(query, [estado], function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ningún pago de alícuota");
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

//consultar por id del detalle de comprobante
router.get("/valor_pendiente/comprobante/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        const query =
          "SELECT * FROM valor_pendiente WHERE detalle_comprobante_comprobante_id_comprobante = ?";
        conn.query(query, [id], function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ningún pago de alícuota");
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

//Registrar nuevo valor pendiente
router.post("/valor_pendiente/save/", (req, res) => {
  try {
    const data = {
      detalle_valor: req.body.detalle_valor,
      total_valor: req.body.total_valor,
      estado_valor: req.body.estado_valor,
      id_comprobante: req.body.id_comprobante,
    };
    const query = `INSERT INTO valor_pendiente (total_valor_pendiente, detalle_valor_pendiente, estado_valor_pendiente, detalle_comprobante_comprobante_id_comprobante) VALUES ('${data.total_valor}', '${data.detalle_valor}', '${data.estado_valor}', '${data.id_comprobante}')`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(query, function (err, row) {
          if (err) {
            console.log(err);
            return res.status(404).send("No se ha podido realizar su petición");
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
