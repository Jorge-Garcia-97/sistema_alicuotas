const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar usuarios
router.get("/usuarios/", (req, res) => {
    try {
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query("SELECT * FROM usuario", function (err, row) {
            if (err) {
              return res.status(404).send("No se ha encontrado ningún usuario");
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

  //Registrar nuevo usuario
router.post("/usuarios/nueva/", (req, res) => {
  try {
      const data = {
        id_usuario: req.body.id_usuario,
        nombre_usuario: req.body.nombre_usuario,
        contraseña_usuario: req.body.contraseña_usuario
      };
      const query = `INSERT INTO usuario (id_usuario, nombre_usuario, contraseña_usuario) VALUES ('${data.id_usuario}', '${data.nombre_usuario}', '${data.contraseña_usuario}')`;
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

  module.exports = router;