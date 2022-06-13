const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar detalle_comprobante
router.get("/detalle_comprobante/", (req, res) => {
    try {
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query("SELECT * FROM detalle_comprobante", function (err, row) {
            if (err) {
              return res.status(404).send("No se ha encontrado ningún detalle de comprobante");
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
