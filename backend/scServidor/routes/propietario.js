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

  //Registrar nuevo propietario
router.post("/propietario/save/", (req, res) => {
  try {
      const data = {
        id_propietario: req.body.id_propietario,
        nombre_propietario: req.body.nombre_propietario,
        apellido_propietario: req.body.apellido_propietario,
        rol_propietario: req.body.rol_propietario,
        celular_propietario: req.body.celular_propietario,
        correo_propietario: req.body.correo_propietario,
        usuario_id_usuario: req.body.usuario_id_usuario,
      };
      const query = `INSERT INTO usuario (id_propietario, nombre_propietario, apellido_propietario, rol_propietario, celular_propietario, correo_propietario, usuario_id_usuario) VALUES ('${data.id_propietario}', '${data.nombre_propietario}', '${data.apellido_propietario}', '${data.rol_propietario}', '${data.celular_propietario}', '${data.correo_propietario}', '${data.usuario_id_usuario}')`;
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

  //Editar administrador
router.post("/propietario/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_propietario: req.body.nombre_propietario,
      apellido_propietario: req.body.apellido_propietario,
      rol_propietario: req.body.rol_propietario,
      celular_propietario: req.body.celular_propietario,
      correo_propietario: req.body.correo_propietario,
    };    
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE propietario SET nombre_propietario = '${data.nombre_propietario}', apellido_propietario = '${data.apellido_propietario}', rol_propietario = '${data.rol_propietario}', celular_propietario = '${data.celular_propietario}', correo_propietario = '${data.correo_propietario}' WHERE id_propietario = ?`;
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
    console.log(error);
    res.send("Error. Please try again later.");
  }
});


  module.exports = router;