const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar cuota extraordinaria
router.get("/cuota_extra/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM cuota_extra", function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ninguna cuota extraordinaria");
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

//consultar cuota extraordinaria
router.get("/cuota_extra/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM cuota_extraordinaria WHERE id_cuota_extraordinaria = ?", [id], function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ninguna cuota extraordinaria");
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

//consultar cuota extraordinaria
router.get("/cuota_extra/detalle/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM cuota_extraordinaria WHERE detalle_comprobante_id_detalle_comprobante = ?", [id], function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ninguna cuota extraordinaria");
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

//Registrar multa
router.post("/cuota_extra/save/", (req, res) => {
  try {
    const data = {
      detalle_cuota: req.body.detalle_cuota,
      valor_cuota: req.body.valor_cuota,
      id_detalle_comprobante: req.body.detalle_comprobante_id_detalle_comprobante,
    };
    const query = `INSERT INTO cuota_extraordinaria (detalle_cuota, valor_cuota, detalle_comprobante_id_detalle_comprobante) VALUES ('${data.detalle_cuota}', '${data.valor_cuota}', '${data.id_detalle_comprobante}')`;
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

//Editar multa
router.post("/cuota_extra/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      detalle_cuota: req.body.detalle_cuota,
      valor_cuota: req.body.valor_cuota,      
    };
    const query = `UPDATE cuota_extraordinaria SET detalle_cuota = '${data.detalle_cuota}', valor_cuota = '${data.valor_cuota}' WHERE id_cuota_extraordinaria = ?`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(query, [id], function (err, row) {
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

//Editar estado de la multa
// router.post("/cuota_extra/edit/estado/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = {
//       estado_cuota: req.body.estado_cuota,
//     };
//     const query = `UPDATE cuota_extraordinaria SET estado_cuota = '${data.estado_cuota}' WHERE id_cuota_extraordinaria = ?`;
//     getConnection(function (err, conn) {
//       if (err) {
//         return res.status(500).send("¡Algo ha salido mal!");
//       } else {
//         conn.query(query, [id], function (err, row) {
//           if (err) {
//             console.log(err);
//             return res.status(404).send("No se ha podido realizar su petición");
//           } else {
//             return res.status(200).send("Ok");
//           }
//         });
//       }
//       conn.release();
//     });
//   } catch (error) {
//     res.send("¡Error!. intente más tarde");
//   }
// });

module.exports = router;
