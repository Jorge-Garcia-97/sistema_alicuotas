const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar facturas
router.get("/facturas/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM factura", function (err, row) {
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

//consultar pedidos por estado
router.get("/factura/:id/", (req, res) => {
  const { id } = req.params;
  try {
    const query =
      "SELECT * FROM factura WHERE id_factura = ?";
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

//Registrar nueva factura
router.post("/factura/save/", (req, res) => {
  try {
    const data = {
      fecha_factura: req.body.fecha_factura,
      subtotal_factura: req.body.subtotal_factura,
      descuento_factura: req.body.descuento_factura,
      total_factura: req.body.total_factura,
    };
    const query = `INSERT INTO factura (fecha_factura, subtotal_factura, descuento_factura, total_factura) VALUES( '${data.fecha_factura}', '${data.subtotal_factura}', '${data.descuento_factura}', '${data.total_factura}')`;
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

//Actulizar información de la factura
router.post("/factura/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      subtotal_factura: req.body.subtotal_factura,
      descuento_factura: req.body.descuento_factura,
      total_factura: req.body.total_factura,
    };
    const query = `UPDATE factura SET subtotal_factura = '${data.subtotal_factura}', descuento_factura = '${data.descuento_factura}', total_factura = '${data.total_factura}' WHERE id_factura = ?`;
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