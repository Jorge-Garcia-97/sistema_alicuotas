const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar propiedades
router.get("/propiedades/", (req, res) => {
    try {
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query("SELECT * FROM propiedad", function (err, row) {
            if (err) {
              return res.status(404).send("No se ha encontrado ninguna propiedad");
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

  //Consultar propiedad por numero de casa
  router.get("/propiedades/casa/:casa/", (req, res) => {
    try {
      const { casa } = req.params;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("Oh!, something went wrong");
        } else {
          conn.query("SELECT * FROM propiedad WHERE numero_casa = ?", [casa], function (err, row) {
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
      console.log(error);
      res.send("Error. Please try again later.");
    }
  });

  module.exports = router;