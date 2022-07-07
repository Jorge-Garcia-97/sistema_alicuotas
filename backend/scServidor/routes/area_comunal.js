var getConnection = require("../conexion");
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

//consultar areas comunales
router.get("/areacomunal/:estado", (req, res) => {
  try {
    const { estado } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("¡Algo ha salido mal!");
      } else {
        const query = "SELECT * FROM area_comunal as a, imagen_area as i WHERE i.area_comunal_id_area_comunal = a.id_area_comunal AND a.estado_area = ?";
        conn.query(query, [estado], function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("No se ha encontrado ningún area comunal");
          } else {
            let data = [];
            row.map((item) => {
              let tmp = {};
              let name = item.id_area_comunal + "-area.png";
              fs.writeFileSync(
                path.join(
                  __dirname,
                  "../dbimages/" +
                    item.id_area_comunal +
                    "-area.png"
                ),
                item.data_imagen
              );
              tmp = {
                id_area_comunal: item.id_area_comunal,
                nombre_area: item.nombre_area,
                descripcion_area: item.descripcion_area,
                imagen_area: name,
              }
              data.push(tmp);
            });
            return res.send({ data });
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
router.post("/areacomunal/save/", (req, res) => {
  try {
    const data = {
      nombre_area: req.body.nombre_area,
      descripcion_area: req.body.descripcion_area,
      estado_area: req.body.estado_area
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO area_comunal (nombre_area, descripcion_area, estado_area) VALUES ( '${data.nombre_area}', '${data.descripcion_area}', '${data.estado_area}')`;
        conn.query(query, function (err, row) {
          if (err) {
            return res
              .status(404)
              .send("Sorry for that. The request could not be made.");
          } else {
            var id = row.insertId;
            return res.send({ id });
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
router.post("/areacomunal/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      descripcion_area: req.body.descripcion_area,
    };    
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE area_comunal SET descripcion_area = '${data.descripcion_area}' WHERE id_area_comunal = ?`;
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

router.post("/areacomunal/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE area_comunal SET estado_area = 'INACTIVO' WHERE id_area_comunal = ?`;
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
