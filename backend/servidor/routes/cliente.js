const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar todos los clientes según el estado y la empresa
router.get("/clientes/empresa/:id/:estado/", (req, res) => {
  const { estado } = req.params;
  const { id } = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM cliente as c WHERE c.estado_cliente = ? AND c.empresa_id_empresa = ?";
        conn.query(query,[estado, id], function (err, row) {
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

//consultar todos los clientes
router.get("/clientes/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM cliente", function (err, row) {
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
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

//consultar clientes por ID
router.get("/cliente/:id", (req, res) => {
    try {
      const { id } = req.params;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("Oh!, something went wrong");
        } else {
          conn.query("SELECT * FROM cliente WHERE id_cliente = ?", [id], function (err, row) {
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
      console.log(error);
      res.send("Error. Please try again later.");
    }
  });

//consultar clientes por RUC
router.get("/cliente/ruc/:ruc/:idEmpresa", (req, res) => {
    try {
      const { ruc } = req.params;
      const { idEmpresa } = req.params;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("Oh!, something went wrong");
        } else {
          const query = "SELECT * FROM cliente WHERE empresa_id_empresa = ? AND ruc_cliente = ?";
          conn.query(query, [ruc, idEmpresa], function (err, row) {
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
      console.log(error);
      res.send("Error. Please try again later.");
    }
  });

//Registrar nuevo cliente
router.post("/cliente/save/", (req, res) => {
  try {
    const data = {
      nombre_cliente: req.body.nombre_cliente,
      apellido_cliente: req.body.apellido_cliente,
      telefono_cliente: req.body.telefono_cliente,
      ruc_cliente: req.body.ruc_cliente,
      correo_cliente: req.body.correo_cliente,
      estado_cliente: req.body.estado_cliente,
      empresa_cliente: req.body.empresa_cliente
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO cliente (nombre_cliente, apellido_cliente, telefono_cliente, ruc_cliente, correo_cliente, estado_cliente, empresa_id_empresa) VALUES ('${data.nombre_cliente}', '${data.apellido_cliente}', '${data.telefono_cliente}', '${data.ruc_cliente}', '${data.correo_cliente}', '${data.estado_cliente}', '${data.empresa_cliente}')`;
        conn.query(query,
          function (err, row) {
            if (err) {
              return res
                .status(404)
                .send("Sorry for that. The request could not be made.");
            } else {
              return res.status(200).send("Ok");
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

//Actulizar información de la categoría
router.post("/cliente/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
        nombre_cliente: req.body.nombre_cliente,
        apellido_cliente: req.body.apellido_cliente,
        telefono_cliente: req.body.telefono_cliente,
        correo_cliente: req.body.correo_cliente,
    };
    const query = `UPDATE cliente SET nombre_cliente = '${data.nombre_cliente}', apellido_cliente = '${data.apellido_cliente}', telefono_cliente = '${data.telefono_cliente}', correo_cliente = '${data.correo_cliente}' WHERE id_cliente = ?`;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
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
    res.send("Error. Please try again later.");
  }
});

//Actulizar estado del empleado o de dar de baja
router.post("/cliente/edit/estado/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      estado_cliente: req.body.estado_cliente,
    };
    const query = `UPDATE cliente SET estado_cliente= '${data.estado_cliente}' WHERE id_cliente = ?`;

    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
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
    res.send("Error. Please try again later.");
  }
});

module.exports = router;