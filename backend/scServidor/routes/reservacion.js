const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar reservaciones
router.get("/reservacion/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM reservacion", function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ninguna reservación");
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

//consultar reservaciones
router.get("/reservacion/estado/:estado", (req, res) => {
  try {
    const { estado } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM reservacion as r, propiedad as pd, propietario as pr, area_comunal as a WHERE r.area_comunal_id_area_comunal = a.id_area_comunal and r.propiedad_id_propiedad = pd.id_propiedad and pd.propietario_id_propietario = pr.id_propietario and estado_reservacion = ?", [estado], function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ninguna reservación");
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

//consultar reservaciones por ID
router.get("/reservacion/:id", (req, res) => {
  const { id } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        query = "SELECT * FROM reservacion where id_reservacion = ?";
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

//consultar reservaciones por ID
router.get(
  "/reservacion/realizada/:idPropiedad/:idArea/:fechaInicio/:fechaFin",
  (req, res) => {
    const { idPropiedad, idArea, fechaInicio, fechaFin } = req.params;
    try {
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          var query =
            "SELECT * FROM reservacion where propiedad_id_propiedad = ? and area_comunal_id_area_comunal = ? and fecha_inicio = ? and fecha_fin = ?";
          conn.query(
            query,
            [idPropiedad, idArea, fechaInicio, fechaFin],
            function (err, row) {
              if (err) {
                return res.status(404).send("No se ha encontrado ningún dato");
              } else {
                return res.send(row);
              }
            }
          );
        }
        conn.release();
      });
    } catch (error) {
      res.send("¡Error!. Intente más tarde.");
    }
  }
);

router.get(
  "/reservacion/realizada-2/:idPropiedad/:idArea/:fechaInicio/:fechaFin",
  (req, res) => {
    const { idPropiedad, idArea, fechaInicio, fechaFin } = req.params;
    try {
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          var query =
            "SELECT * FROM reservacion where propiedad_id_propiedad = ? and area_comunal_id_area_comunal = ? and fecha_inicio <= ? and fecha_fin >= ?";
          conn.query(
            query,
            [idPropiedad, idArea, fechaInicio, fechaFin],
            function (err, row) {
              if (err) {
                return res.status(404).send("No se ha encontrado ningún dato");
              } else {
                return res.send(row);
              }
            }
          );
        }
        conn.release();
      });
    } catch (error) {
      res.send("¡Error!. Intente más tarde.");
    }
  }
);

//Registrar nueva reservación
router.post("/reservacion/save/", (req, res) => {
  try {
    const data = {
      motivo_reservacion: req.body.motivo_reservacion,
      fecha_inicio: req.body.fecha_inicio,
      fecha_fin: req.body.fecha_fin,
      valor_garantia: req.body.valor_garantia,
      valor_alquiler: req.body.valor_alquiler,
      estado_reservacion: req.body.estado_reservacion,
      propiedad_id_propiedad: req.body.propiedad_id_propiedad,
      area_comunal_id_area_comunal: req.body.area_comunal_id_area_comunal,
    };
    const query = `INSERT INTO reservacion (motivo_reservacion, fecha_inicio, fecha_fin, valor_garantia, valor_alquiler, estado_reservacion, propiedad_id_propiedad, area_comunal_id_area_comunal) VALUES ('${data.motivo_reservacion}', '${data.fecha_inicio}','${data.fecha_fin}','${data.valor_garantia}','${data.valor_alquiler}','${data.estado_reservacion}','${data.propiedad_id_propiedad}','${data.area_comunal_id_area_comunal}')`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(query, function (err, row) {
          if (err) {
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

//Actulizar información de la reservación
router.post("/reservacion/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      motivo_reservacion: req.body.motivo_reseracion,
      fecha_inicio: req.body.fecha_inicio,
      fecha_fin: req.body.fecha_fin,
      valor_garantia: req.body.valor_garantia,
      valor_alquiler: req.body.valor_alquiler,
      propiedad_id_propiedad: req.body.propiedad_id_propiedad,
      area_comunal_id_area_comunal: req.body.area_comunal_id_area_comunal,
    };
    const query = `UPDATE reservacion SET motivo_reservacion = '${data.motivo_reseracion}', fecha_inicio = '${data.fecha_inicio}', fecha_fin = '${data.fecha_fin}', valor_garantia = '${data.valor_garantia}', valor_alquiler = '${data.valor_alquiler}', propiedad_id_propiedad = '${data.propiedad_id_propiedad}', area_comunal_id_area_comunal = '${data.area_comunal_id_area_comunal}'' WHERE id_reservacion = ?`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(query, [id], function (err, row) {
          if (err) {
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

module.exports = router;
