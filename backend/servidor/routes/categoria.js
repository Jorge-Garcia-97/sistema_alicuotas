const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar todas las categorias
router.get("/categorias/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM categoria", function (err, row) {
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

//consultar todas las categorias
router.get("/categorias/empresa/:id", (req, res) => {
  const {id} = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = "SELECT * FROM categoria as c WHERE c.empresa_id_empresa = ?";
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

//Registrar nuevo categoría
router.post("/categoria/save/", (req, res) => {
  try {
    const data = {
      nombre_cat: req.body.nombre_cat,
      descripcion_cat: req.body.descripcion_cat,
      empresa_cat: req.body.empresa_cat
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO categoria (nombre_cat, descripcion_cat, empresa_id_empresa) VALUES ('${data.nombre_cat}', '${data.descripcion_cat}', '${data.empresa_cat}')`;
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

//Actulizar información de la categoría
router.post("/categoria/edit/:id/", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_cat: req.body.nombre_cat,
      descripcion_cat: req.body.descripcion_cat,
    };
    const query = `UPDATE categoria SET nombre_cat = '${data.nombre_cat}', descripcion_cat = '${data.descripcion_cat}' WHERE id_cat = ?`;
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
