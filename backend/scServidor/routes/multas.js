const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar multas
router.get("/multas/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM multas", function (err, row) {
          if (err) {
            return res.status(404).send("No se ha encontrado ninguna multa");
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

//consultar multas
router.get("/multa/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM multas WHERE id_multas = ?", [id], function (err, row) {
          if (err) {
            return res.status(404).send("No se ha encontrado ninguna multa");
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
router.post("/multa/save/", (req, res) => {
  try {
    const data = {
      fecha_multa: req.body.fecha_multa,
      motivo_multa: req.body.motivo_multa,
      valor_multa: req.body.valor_multa,
      estado_multa: req.body.estado_multa,
    };
    const query = `INSERT INTO multas (fecha_multa, motivo_multa, valor_multa, estado_multa) VALUES ('${data.fecha_multa}', '${data.motivo_multa}', '${data.valor_multa}', '${data.estado_multa}')`;
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

//Editar multa
router.post("/multa/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      fecha_multa: req.body.fecha_multa,
      motivo_multa: req.body.motivo_multa,
      valor_multa: req.body.valor_multa,
    };
    const query = `UPDATE multas SET fecha_multa= '${data.fecha_multa}', motivo_multa= '${data.motivo_multa}', valor_multa= '${data.valor_multa}' WHERE id_multas = ?`;
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
router.post("/multa/edit/estado/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      estado_multa: req.body.estado_multa,
    };
    const query = `UPDATE multas SET estado_multa= '${data.estado_multa}' WHERE id_multas = ?`;
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
