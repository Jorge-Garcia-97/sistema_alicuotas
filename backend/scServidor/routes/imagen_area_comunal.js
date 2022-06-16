var getConnection = require("../conexion");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.get("/area-comunal/imagen/:id/", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM imagen_area WHERE area_comunal_id_area_comunal = ?",
          [id],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              var name = null;
              row.map((img) => {
                name = img.empresa_id_empresa + "-area.png";
                fs.writeFileSync(
                  path.join(
                    __dirname,
                    "../dbimages/" + img.empresa_id_empresa + "-area.png"
                  ),
                  img.data_imagen
                );
              });
              return res.send({ name });
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

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-empresa-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
}).single("image");

//Registrar imagen de empresa
router.post("/area/comunal/imagen/save/:id/", fileUpload, (req, res) => {
  try {
    const { id } = req.params;
    const type = req.file.mimetype;
    const name = req.file.originalname;
    const data = fs.readFileSync(
      path.join(__dirname, "../images/" + req.file.filename)
    );
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "INSERT INTO imagen_area set id_imagen_area = ?, tipo_imagen = ?, nombre_imagen = ?, data_imagen = ?, area_comunal_id_area_comunal = ?",
          [type, name, data, id],
          function (err, row) {
            if (err) {
              console.log(err.stack);
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
    res.send("Error. Please try again later.");
  }
});

//Actualizar imagen de empresa
router.post("/area-comunal/imagen/edit/:id/", fileUpload, (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(
      path.join(__dirname, "../images/" + req.file.filename)
    );
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "UPDATE imagen_area set data_imagen = ? WHERE  area_comunal_id_area_comunal = ?",
          [data, id],
          function (err, row) {
            if (err) {
              console.log(err.stack);
              return res
                .status(404)
                .send("Sorry for that. The request could not be made.");
            } else {
              console.log("Exito al guardar");
              return res.status(200).send("Ok");
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

module.exports = router;
