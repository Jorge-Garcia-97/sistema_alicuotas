const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar solicitudes
router.get("/solicitud/", (req, res) => {
    try {
        getConnection(function (err, conn) {
            if (err) {
                return res.status(500).send("¡Algo ha salido mal!");
            } else {
                conn.query("SELECT * FROM solicitud", function (err, row) {
                    if (err) {
                        return res.status(404).send("No se ha encontrado ninguna solicitud");
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

//Consultar solicitud por ID
router.get("/solicitud/:id", (req, res) => {
  const { id } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM solicitud where id_solicitudes = ?";
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

//Consultar solicitud por fecha
router.get("/solicitud/fecha/:id", (req, res) => {
  const { id } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM solicitud where fecha_solicitud = ?";
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

//Registrar nueva solicitud
router.post("/solicitud/save/", (req, res) => {
    try {
      const data = {
        id_solicitudes: req.body.id_solicitudes,
        detalle_solicitud: req.body.detalle_solicitud,
        fecha_solicitud: req.body.fecha_solicitud,
        propiedad_id_propiedad: req.body.propiedad_id_propiedad,
      };
      const query = `INSERT INTO usuario (id_solicitudes, detalle_solicitud, fecha_solicitud, propiedad_id_propiedad) VALUES ('${data.id_solicitudes}', '${data.detalle_solicitud}', '${data.fecha_solicitud}', '${data.propiedad_id_propiedad}')`;
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

  //Editar solicitud
router.post("/solicitud/edit/:id", (req, res) => {
    try {
      const { id } = req.params;
      const data = {
        detalle_solicitud: req.body.detalle_solicitud,
        fecha_solicitud: req.body.fecha_solicitud,
        propiedad_id_propiedad: req.body.propiedad_id_propiedad
      };    
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("Oh!, something went wrong");
        } else {
          const query = `UPDATE solicitud SET detalle_solicitud = '${data.detalle_solicitud}', fecha_solicitud = '${data.fecha_solicitud}', propiedad_id_propiedad = '${data.propiedad_id_propiedad}' WHERE id_solicitudes = ?`;
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