const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar detalles de fatura por ID
router.get("/factura/detalle/:id/", (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM detalle_factura WHERE factura_id_factura = ?";
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
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

//Registrar un nuevo detalle de factura
router.post("/factura/detalle/save/", (req, res) => {
  try {
    const data = {
      factura_id_detalle: req.body.factura_id_detalle,
      cantidad_detalle: req.body.cantidad_detalle,
      ret_iva_detalle: req.body.ret_iva_detalle,
      descuento_detalle: req.body.descuento_detalle,
      subtotal_detalle: req.body.subtotal_detalle,
      producto_id_detalle: req.body.producto_id_detalle,
    };
    const query = `INSERT INTO detalle_factura (factura_id_factura, cantidad_detalle, ret_iva_detalle, descuento_detalle, subtotal_detalle, producto_id_prod) VALUES( '${data.factura_id_detalle}', '${data.cantidad_detalle}', '${data.ret_iva_detalle}', '${data.descuento_detalle}', '${data.subtotal_detalle}', '${data.producto_id_detalle}')`;
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

module.exports = router;
