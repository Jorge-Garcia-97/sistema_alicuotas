const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar solicitudes
router.get("/solicitudes/estado/:estado", (req, res) => {
  try {
    const { estado } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(
          "SELECT * FROM solicitudes as s, propiedad as p, propietario as pr WHERE s.propiedad_id_propiedad = p.id_propiedad AND p.propietario_id_propietario = pr.id_propietario AND s.estado_solicitud = ? ORDER BY s.fecha_solicitud DESC",
          [estado],
          function (err, row) {
            if (err) {
              return res
                .status(404)
                .send("No se ha encontrado ninguna solicitud");
            } else {
              return res.send(row);
            }
          }
        );
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
        query = "SELECT * FROM solicitudes where id_solicitudes = ?";
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
        query = "SELECT * FROM solicitudes where fecha_solicitud = ?";
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

//Consultar solicitud por propiedad
router.get("/solicitud/propiedad/:id", (req, res) => {
  const { id } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM solicitudes where propiedad_id_propiedad = ?";
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
      tipo_solicitud: req.body.tipo_solicitud,      
      detalle_solicitud: req.body.detalle_solicitud,
      fecha_solicitud: req.body.fecha_solicitud,      
      estado_solicitud: req.body.estado_solicitud,
      propiedad_id_propiedad: req.body.propiedad_id_propiedad,
    };
    console.log(data);
    const query = `INSERT INTO solicitudes (tipo_solicitud, detalle_solicitud, fecha_solicitud, estado_solicitud, propiedad_id_propiedad) VALUES ('${data.tipo_solicitud}', '${data.detalle_solicitud}', '${data.fecha_solicitud}', '${data.estado_solicitud}', '${data.propiedad_id_propiedad}')`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(query, function (err, row) {
          if (err) {
            console.log(err);
            return res.status(404).send("No se ha podido realizar su petición");
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
router.post("/solicitud/edit/estado/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      estado_solicitud: req.body.estado_solicitud,
    };
    console.log(data);
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE solicitudes SET estado_solicitud = '${data.estado_solicitud}' WHERE id_solicitudes = ?`;
        conn.query(query, [id], function (err, row) {
          if (err) {
            console.log(err);
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
