const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar todos los proveedores
router.get("/proveedores/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM proveedor", function (err, row) {
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

//consultar el proveedor por ID de la empresa
router.get("/proveedores/empresa/:id/:estado", (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM proveedor as pr WHERE pr.estado_proveedor = ? AND pr.empresa_id_empresa = ?";
        conn.query(query, [estado, id], function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
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

//consultar el proveedor por ID
router.get("/proveedor/:id/", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM proveedor WHERE id_proveedor = ?",
          [id],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
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

//consultar el proveedor por ruc
router.get("/proveedor/ruc/:ruc/:idEmpresa", (req, res) => {
  try {
    const { ruc } = req.params;
    const { idEmpresa } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM proveedor WHERE empresa_id_empresa = ? AND ruc_proveedor = ?";
        conn.query(query, [ruc, idEmpresa],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//consultar todos los proveedores según su estado
router.get("/proveedor/estado/:estado", (req, res) => {
  try {
    const { estado } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM proveedor WHERE estado_proveedor = ?",
          [estado],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              return res.send(row);
            }
          }
        );
      }
      conn.release();
    });
  } catch (error) {
    res.send("Error. Please try again later.");
  }
});

//Registrar nuevo proveedor
router.post("/proveedor/save/", (req, res) => {
  try {
    const data = {
      ruc_proveedor: req.body.ruc_proveedor,
      nombre_proveedor: req.body.nombre_proveedor,
      direccion_proveedor: req.body.direccion_proveedor,
      telefono_proveedor: req.body.telefono_proveedor,
      correo_proveedor: req.body.correo_proveedor,
      estado_proveedor: req.body.estado_proveedor,
      empresa_proveedor: req.body.empresa_proveedor
    };
    const query = `INSERT INTO proveedor (ruc_proveedor, nombre_proveedor, direccion_proveedor, telefono_proveedor, correo_proveedor, estado_proveedor, empresa_id_empresa) VALUES ('${data.ruc_proveedor}', '${data.nombre_proveedor}','${data.direccion_proveedor}','${data.telefono_proveedor}','${data.correo_proveedor}','${data.estado_proveedor}','${data.empresa_proveedor}')`;
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
    res.send("Error. Please try again later.");
  }
});

//Actulizar información del proveedor
router.post("/proveedor/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_proveedor: req.body.nombre_proveedor,
      direccion_proveedor: req.body.direccion_proveedor,
      telefono_proveedor: req.body.telefono_proveedor,
      correo_proveedor: req.body.correo_proveedor,
    };
    const query = `UPDATE proveedor SET nombre_proveedor = '${data.nombre_proveedor}', direccion_proveedor = '${data.direccion_proveedor}', telefono_proveedor = '${data.telefono_proveedor}', correo_proveedor= '${data.correo_proveedor}' WHERE id_proveedor = ?`;
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

//Actulizar estado del proveedor o de dar de baja
router.post("/proveedor/edit/estado/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      estado_proveedor: req.body.estado_proveedor,
    };
    const query = `UPDATE proveedor SET estado_proveedor= '${data.estado_proveedor}' WHERE id_proveedor = ?`;
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
