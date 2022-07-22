const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar comprobante
router.get("/comprobante/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM comprobante", function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ningún comprobante");
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

//Registrar comprobante
router.post("/comprobante/save/", (req, res) => {
  try {
    const data = {
      codigo_comprobante: req.body.codigo_comprobante,
      fecha_comprobante: req.body.fecha_comprobante
    };
    const query = `INSERT INTO comprobante (codigo_comprobante, fecha_comprobante) VALUES ('${data.codigo_comprobante}', '${data.fecha_comprobante}')`;
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
router.post("/comprobante/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      fecha_comprobante: req.body.fecha_comprobante
    };
    const query = `UPDATE comprobante SET fecha_comprobante= '${data.fecha_comprobante}' WHERE id_comprobante = ?`;
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
