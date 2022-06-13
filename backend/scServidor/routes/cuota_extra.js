const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar cuota extraordinaria
router.get("/cuota_extra/", (req, res) => {
    try {
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query("SELECT * FROM cuota_extra", function (err, row) {
            if (err) {
              return res.status(404).send("No se ha encontrado ninguna cuota extraordinaria");
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
