const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar administrador
router.get("/administrador/", (req, res) => {
    try {
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query("SELECT * FROM administrador", function (err, row) {
            if (err) {
              return res.status(404).send("No se ha encontrado ningún administrador");
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

  module.exports = router;