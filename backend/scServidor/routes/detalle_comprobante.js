const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar detalle_comprobante
router.get("/detalle_comprobante/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(
          "SELECT * FROM detalle_comprobante where comprobante_id_comprobante = ?",
          [id],
          function (err, row) {
            if (err) {
              return res
                .status(404)
                .send("No se ha encontrado ningún detalle de comprobante");
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

router.get("/detalle_comprobante/alicuota/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query(
          "SELECT * FROM detalle_comprobante as d, comprobante as c, pago_alicuota as p, propiedad as pd, propietario as pr where c.id_comprobante = d.comprobante_id_comprobante and d.pago_alicuota_id_pago_alicuota = p.id_pago_alicuota and p.propiedad_id_propiedad = pd.id_propiedad and pd.propietario_id_propietario = pr.id_propietario and p.id_pago_alicuota = ?",
          [id],
          function (err, row) {
            if (err) {
              return res
                .status(404)
                .send("No se ha encontrado ningún detalle de comprobante");
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

//Consultar por id
// router.get("/administrador/:id", (req, res) => {
//   const { id } = req.params;
//   try {
//     getConnection(function (err, conn) {
//       if (err) {
//         return res.status(500).send("¡Algo ha salido mal!");
//       } else {
//         query = "SELECT * FROM administrador where id_administrador = ?";
//         conn.query(query, [id], function (err, row) {
//           if (err) {
//             return res.status(404).send("No se ha encontrado ningún dato");
//           } else {
//             return res.send(row);
//           }
//         });
//       }
//       conn.release();
//     });
//   } catch (error) {
//     res.send("¡Error!. Intente más tarde.");
//   }
// });

//Registrar detalle comprobante
router.post("/detalle_comprobante/save/", (req, res) => {
  try {    
    const data = {
      forma_pago: req.body.forma_pago,
      concepto_comprobante: req.body.concepto_comprobante,
      pago_alicuota_id_pago_alicuota: req.body.pago_alicuota_id_pago_alicuota,
      comprobante_id_comprobante: req.body.comprobante_id_comprobante,
    };      
    const query = `INSERT INTO detalle_comprobante (forma_pago, concepto_comprobante, pago_alicuota_id_pago_alicuota, comprobante_id_comprobante) VALUES ('${data.forma_pago}', '${data.concepto_comprobante}', '${data.pago_alicuota_id_pago_alicuota}', '${data.comprobante_id_comprobante}')`;    
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

//Editar comprobante
router.post("/detalle_comprobante/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      forma_pago: req.body.forma_pago,
      concepto_comprobante: req.body.concepto_comprobante,
    };
    const query = `UPDATE detalle_comprobante SET forma_pago = '${data.forma_pago}', concepto_comprobante = '${data.concepto_comprobante}',  WHERE id_detalle_comprobante = ?`;
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

module.exports = router;