const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar propietario
router.get("/propietario/", (req, res) => {
    try {
      const { password } = req.params;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("Error ¯\_(°.°)_/¯");
        } else {
          const query =
            "SELECT * FROM propietario";
          conn.query(query, [password], function (err, row) {
            if (err) {
              return res.status(404).send("Disculpas, no a funcionado");
            } else {
              return res.send(row);
            }
          });
        }
        conn.release();
      });
    } catch (error) {
      res.send("Error. Por favor intente más tarde.");
    }
  });

  module.exports = router;