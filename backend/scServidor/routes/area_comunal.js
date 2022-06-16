var getConnection = require("../conexion");
const express = require("express");
const router = express.Router();

//consultar areas comunales
router.get("/area-comunal/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        conn.query("SELECT * FROM area_comunal", function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ningún area comunal");
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

//Nueva area comunal
router.post("/area-comunal/save/", (req, res) => {
  try {
    const data = {
      id_area: req.body.id_area,
      nombre_area: req.body.nombre_area,
      valor_garantia_area: req.body.valor_garantia_area,
      valor_alquiler_area: req.body.valor_alquiler_area,
      descripcion_area: req.body.descripcion_area,
      imagen_area: req.body.imagen_area,
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO area_comunal (id_area, nombre_area, valor_garantia, valor_alquiler, descripcion_area, imagen_area_id_imagen_area) VALUES ('${data.id_area}', '${data.nombre_area}', '${data.valor_garantia_area}', '${data.valor_alquiler_area}', '${data.descripcion_area}', '${data.imagen_area}')`;
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

//Editar area comunal
router.post("/area-comunal/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      nombre_area: req.body.nombre_area,
      valor_garantia_area: req.body.valor_garantia_area,
      valor_alquiler_area: req.body.valor_alquiler_area,
      descripcion_area: req.body.descripcion_area,
    };    
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE area_comunal SET nombre_area = '${data.nombre_area}', valor_garantia_area = '${data.valor_garantia_area}', valor_alquiler_area = '${data.valor_alquiler_area}', descripcion_area = '${data.descripcion_area}' WHERE id_area = ?`;
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
    console.log(error);
    res.send("Error. Please try again later.");
  }
});

module.exports = router;
