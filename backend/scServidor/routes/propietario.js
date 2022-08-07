const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");
const path = require("path");
const fs = require("fs");

//consultar propietario
router.get("/propietarios/:estado", (req, res) => {
  try {
    const { estado } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Error ¯_(°.°)_/¯");
      } else {
        const query =
          "SELECT * FROM propietario as p, imagen_propietario as i WHERE i.propietario_id_propietario = p.id_propietario AND p.estado_propietario = ? ORDER BY p.apellido_propietario";
        conn.query(query, [estado], function (err, row) {
          if (err) {
            return res.status(404).send("Disculpas, no a funcionado");
          } else {
            let data = [];
            row.map((item) => {
              let tmp = {};
              let name = item.propietario_id_propietario + "-propietario.png";
              fs.writeFileSync(
                path.join(
                  __dirname,
                  "../dbimages/" +
                    item.propietario_id_propietario +
                    "-propietario.png"
                ),
                item.data_imagen
              );
              tmp = {
                id_propietario: item.id_propietario,
                nombre_propietario: item.nombre_propietario,
                apellido_propietario: item.apellido_propietario,
                cedula_propietario: item.cedula_propietario,
                celular_propietario: item.celular_propietario,
                correo_propietario: item.correo_propietario,
                rol_propietario: item.rol_propietario,
                imagen_propietario: name,
              }
              data.push(tmp);
            });
            return res.send({ data });
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Por favor intente más tarde.");
  }
});

//Consultar propietario por ID
router.get("/propietario/:id", (req, res) => {
  const { id } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM propietario where id_propietario = ?";
        conn.query(query, [id], function (err, row) {
          if (err) {
            return res.status(404).send("No se ha encontrado ningún dato");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("¡Error!. Intente más tarde.");
  }
});

router.get("/propietario/by-cedula/:cedula", (req, res) => {
  const { cedula } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM propietario WHERE cedula_propietario = ?";
        conn.query(query, [cedula], function (err, row) {
          if (err) {
            return res.status(404).send("No se ha encontrado ningún dato");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("¡Error!. Intente más tarde.");
  }
});

//Registrar nuevo propietario
router.post("/propietario/save/", (req, res) => {
  try {
    const data = {
      cedula_propietario: req.body.cedula_propietario,
      nombre_propietario: req.body.nombre_propietario,
      apellido_propietario: req.body.apellido_propietario,
      rol_propietario: req.body.rol_propietario,
      celular_propietario: req.body.celular_propietario,
      correo_propietario: req.body.correo_propietario,
      estado_propietario: req.body.estado_propietario,
      usuario_id_usuario: req.body.usuario_id_usuario,
    };
    // console.log(data);
    const query = `INSERT INTO propietario (cedula_propietario, nombre_propietario, apellido_propietario, rol_propietario, celular_propietario, correo_propietario, estado_propietario, usuario_id_usuario) VALUES ('${data.cedula_propietario}', '${data.nombre_propietario}', '${data.apellido_propietario}', '${data.rol_propietario}', '${data.celular_propietario}', '${data.correo_propietario}', '${data.estado_propietario}', '${data.usuario_id_usuario}')`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(query, function (err, row) {
          if (err) {
            console.log(err);
            return res.status(404).send("No se ha podido realizar su petición");
          } else {
            var id = row.insertId;
            return res.send({ id });
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("¡Error!. intente más tarde");
  }
});

//Editar propietario
router.post("/propietario/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      cedula_propietario: req.body.cedula_propietario,
      nombre_propietario: req.body.nombre_propietario,
      apellido_propietario: req.body.apellido_propietario,
      celular_propietario: req.body.celular_propietario,
      correo_propietario: req.body.correo_propietario,
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE propietario SET cedula_propietario = '${data.cedula_propietario}', nombre_propietario = '${data.nombre_propietario}', apellido_propietario = '${data.apellido_propietario}', celular_propietario = '${data.celular_propietario}', correo_propietario = '${data.correo_propietario}' WHERE id_propietario = ?`;
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

router.post("/propietario/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE propietario SET estado_propietario = 'INACTIVO' WHERE id_propietario = ?`;
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
