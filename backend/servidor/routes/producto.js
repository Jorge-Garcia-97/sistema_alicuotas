const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar todos los productos
router.get("/productos/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM producto as p, categoria as c, proveedor as r WHERE p.categoria_id_cat = c.id_cat AND p.proveedor_id_proveedor = r.id_proveedor", function (err, row) {
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

//consultar los productos por código
router.get("/producto/codigo/:codigo/", (req, res) => {
    try {
      const { codigo } = req.params;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("Oh!, something went wrong");
        } else {
          conn.query("SELECT * FROM producto WHERE codigo_prod = ?", [codigo], function (err, row) {
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

//consultar los productos por proveedor
router.get("/producto/proveedor/:id_proveedor/", (req, res) => {
  try {
    const { id_proveedor } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM producto WHERE proveedor_idproveedor = ?", [id_proveedor], function (err, row) {
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

//consultar los productos por proveedor
router.get("/productos/empresa/:id/", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM producto as pd, proveedor as pr, categoria as c WHERE pd.proveedor_id_proveedor = pr.id_proveedor AND pd.categoria_id_cat = c.id_cat AND pr.estado_proveedor = 'ACTIVO' AND pr.empresa_id_empresa = ?";
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
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

//consultar todos los productos por categoría
router.get("/producto/categoria/:id_categoria/", (req, res) => {
    try {
      const { id_categoria } = req.params;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("Oh!, something went wrong");
        } else {
          conn.query("SELECT * FROM producto WHERE categoria_idcat = ?", [id_categoria], function (err, row) {
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

//Registrar nuevo producto
router.post("/producto/save/", (req, res) => {
  try {
    const data = {
      codigo_prod: req.body.codigo_prod,
      nombre_prod: req.body.nombre_prod,
      descripcion_prod: req.body.descripcion_prod,
      marca_prod: req.body.marca_prod,
      preciounitario_prod: req.body.preciounitario_prod,
      preciomayoreo_prod: req.body.preciomayoreo_prod,
      iva_prod: req.body.iva_prod,
      cantidad_prod: req.body.cantidad_prod,
      fecha_ingreso_prod: req.body.fecha_ingreso_prod,
      categoria_prod: req.body.categoria_prod,
      proveedor_prod: req.body.proveedor_prod
    };

    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO producto (codigo_prod, nombre_prod, descripcion_prod, marca_prod, preciounitario_prod, preciomayoreo_prod, iva_prod, cantidad_stock_prod, fecha_ingreso_prod, categoria_id_cat, proveedor_id_proveedor) VALUES('${data.codigo_prod}', '${data.nombre_prod}', '${data.descripcion_prod}', '${data.marca_prod}', '${data.preciounitario_prod}', '${data.preciomayoreo_prod}', '${data.iva_prod}', '${data.cantidad_prod}', '${data.fecha_ingreso_prod}', '${data.categoria_prod}', '${data.proveedor_prod}')`;
        conn.query(query, function (err, row) {
            if (err) {
                console.log(err);
              return res
                .status(404)
                .send(err);
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

//Actulizar información del producto
router.post("/producto/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
        nombre_prod: req.body.nombre_prod,
        descripcion_prod: req.body.descripcion_prod,
        marca_prod: req.body.marca_prod,
        preciounitario_prod: req.body.preciounitario_prod,
        preciomayoreo_prod: req.body.preciomayoreo_prod,
        iva_prod: req.body.iva_prod,
        cantidad_prod: req.body.cantidad_prod,
        categoria_prod: req.body.categoria_prod,
        proveedor_prod: req.body.proveedor_prod
    };
    const query = `UPDATE producto SET nombre_prod = '${data.nombre_prod}', descripcion_prod = '${data.descripcion_prod}', marca_prod = '${data.marca_prod}', preciounitario_prod = '${data.preciounitario_prod}', preciomayoreo_prod = '${data.preciomayoreo_prod}', iva_prod = '${data.iva_prod}', cantidad_stock_prod = '${data.cantidad_prod}', fecha_ingreso_prod = '${data.fecha_ingreso_prod}', categoria_id_cat = '${data.categoria_prod}', proveedor_id_proveedor = '${data.proveedor_prod}' WHERE id_prod = ?`;
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

//Actulizar información del stock del producto
router.post("/producto/edit/cantidad/:id/", (req, res) => {
    try {
      const { id } = req.params;
      const data = {
          cantidad_prod: req.body.cantidad_prod,
      };
      const query = `UPDATE producto SET cantidad_stock_prod = '${data.cantidad_prod}' WHERE id_prod = ?`;
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