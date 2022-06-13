const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar pedidos
router.get("/pedidos/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM pedido", function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar pedidos por ID del establecimiento
router.get("/pedido/establecimiento/:id/", (req, res) => {
  const { id } = req.params;
  try {
    const query =
      "SELECT * FROM pedido as p, establecimiento as e WHERE p.establecimiento_id_estab = e.id_estab AND e.id_estab = ?";
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(query, [id], function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar pedidos por código del establecimiento
router.get("/pedido/establecimiento/cod/:cod/", (req, res) => {
  const { cod } = req.params;
  try {
    const query =
      "SELECT * FROM pedido as p, establecimiento as e WHERE p.establecimiento_id_estab = e.id_estab AND e.codigo_estab = ?";
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(query, [cod], function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar pedidos por estado
router.get("/pedido/estado/:estado/", (req, res) => {
  const { estado } = req.params;
  try {
    const query =
      "SELECT * FROM pedido as p, establecimiento as e WHERE p.establecimiento_id_estab = e.id_estab AND p.estado_pedido = ?";
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(query, [estado], function (err, row) {
          if (err) {
            return res.status(404).send("Sorry for that. No data found.");
          } else {
            return res.send(row);
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//Registrar nuevo pedido
router.post("/pedido/save/", (req, res) => {
  try {
    const data = {
      factura_pedido: req.body.factura_pedido,
      establecimiento_pedido: req.body.establecimiento_pedido,
      estado_pedido: req.body.estado_pedido
    };
    const query = `INSERT INTO pedido (factura_id_factura, establecimiento_id_estab, estado_pedido) VALUES( '${data.factura_pedido}', '${data.establecimiento_pedido}', '${data.estado_pedido}')`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
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

module.exports = router;