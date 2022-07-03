var getConnection = require("../conexion");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.get("/firma_copropietario/imagen/:id/", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query(
          "SELECT * FROM imagen_firma_copropietario WHERE detalle_comprobante_id_detalle_comprobante = ?",
          [id],
          function (err, row) {
            if (err) {
              return res.status(404).send("Sorry for that. No data found.");
            } else {
              var name = null;
              row.map((img) => {
                name = img.empresa_id_empresa + "-firma_copropietario.png";
                fs.writeFileSync(
                  path.join(
                    __dirname,
                    "../dbimages/" + img.empresa_id_empresa + "-firma_copropietario.png"
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
    cb(null, Date.now() + "-firma_copropietario-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
}).single("image");

//Registrar imagen de empresa
router.post("/firma_copropietario/imagen/save/:id/", fileUpload, (req, res) => {
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
          "INSERT INTO imagen_firma_copropietario set id_imagen_firma_copropietario = ?, tipo_imagen = ?, nombre_imagen = ?, data_imagen = ?, detalle_comprobante_id_detalle_comprobante = ?",
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
router.post("/firma_copropietario/imagen/edit/:id/", fileUpload, (req, res) => {
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
          "UPDATE imagen_firma_copropietario set data_imagen = ? WHERE  detalle_comprobante_id_detalle_comprobante = ?",
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