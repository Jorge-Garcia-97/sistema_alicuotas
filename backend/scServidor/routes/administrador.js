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
            return res
              .status(404)
              .send("No se ha encontrado ningún administrador");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/administrador/:id", (req, res) => {
  const { id } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM administrador where id_administrador = ?";
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

router.get("/administradores/estado/:estado", (req, res) => {
  const { estado } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM administrador where estado_administrador = ?";
        conn.query(query, [estado], function (err, row) {
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

router.get("/administrador/by-cedula/:cedula", (req, res) => {
  const { cedula } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM administrador WHERE cedula_administrador = ?";
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

//Registrar nuevo administrador
router.post("/administrador/save/", (req, res) => {
  try {
    const data = {
      nombre_administrador: req.body.nombre_administrador,
      celular_administrador: req.body.celular_administrador,
      correo_administrador: req.body.correo_administrador,
      cedula_administrador: req.body.cedula_administrador,
      estado_administrador: req.body.estado_administrador,
      usuario_id_usuario: req.body.usuario_id_usuario,
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO administrador ( nombre_administrador, celular_administrador, correo_administrador, cedula_administrador, estado_administrador, usuario_id_usuario) VALUES ( '${data.nombre_administrador}', '${data.celular_administrador}', '${data.correo_administrador}', '${data.cedula_administrador}', '${data.estado_administrador}', '${data.usuario_id_usuario}')`;
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

//Editar administrador
router.post("/administrador/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_administrador: req.body.nombre_administrador,
      celular_administrador: req.body.celular_administrador,
      correo_administrador: req.body.correo_administrador,
    };    
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE administrador SET nombre_administrador = '${data.nombre_administrador}', celular_administrador = '${data.celular_administrador}', correo_administrador = '${data.correo_administrador}' WHERE id_administrador = ?`;
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
