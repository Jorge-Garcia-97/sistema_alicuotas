const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar usuarios
router.get("/usuario/", (req, res) => {
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
    console.log(error);
    res.send("¡Error!. intente más tarde");
  }
});

//Registrar nuevo usuario
router.post("/usuario/save/", (req, res) => {
  try {
    const data = {
      nombre_usuario: req.body.nombre_usuario,
      contraseña_usuario: req.body.contraseña_usuario,
    };
    const query = `INSERT INTO usuario (nombre_usuario, contraseña_usuario) VALUES ('${data.nombre_usuario}', '${data.contraseña_usuario}')`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(query, function (err, row) {
          if (err) {
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

module.exports = router;

//consultar por id
router.get("/usuario/:id", (req, res) => {
  const { id } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM usuario where id_usuario = ?";
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

//Consulta por nombre
router.get("/usuario/inicio/:nombre/:password", (req, res) => {
  const { nombre, password } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM usuario as u, propietario as p WHERE u.nombre_usuario = ? AND u.contraseña_usuario = ? AND u.id_usuario = p.usuario_id_usuario";
        conn.query(query, [nombre, password], function (err, row) {
          if (err) {
            console.log(err);
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

router.get("/usuario/admin/inicio/:nombre/:password", (req, res) => {
  const { nombre, password } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM usuario as u, administrador as a WHERE u.nombre_usuario = ? AND u.contraseña_usuario = ? AND u.id_usuario = a.usuario_id_usuario";
        conn.query(query, [nombre, password], function (err, row) {
          if (err) {
            console.log(err);
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

//Agregar usuario
router.post("/usuario/save/", (req, res) => {
  try {
    const data = {
      nombre_usuario: req.body.nombre_usuario,
      contraseña_usuario: req.body.contraseña_usuario,
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO usuario ( nombre_usuario, contraseña_usuario) VALUES ('${data.nombre_usuario}', '${data.contraseña_usuario}')`;
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

//editar usuario
router.post("/usuario/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_usuario: req.body.nombre_usuario,
      contraseña_usuario: req.body.contraseña_usuario,
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE usuario SET nombre_usuario = '${data.nombre_usuario}', contraseña_usuario = '${data.contraseña_usuario}' WHERE id_usuario = ?`;
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
