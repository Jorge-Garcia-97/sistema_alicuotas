const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images/empresa"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-empresa-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
}).single("image");

//Registrar imagen de empresa
router.post("/empresa/imagen/save/:id", fileUpload, (req, res) => {
  try {
    const { id } = req.params;
    const type = req.file.mimetype;
    const name = req.file.originalname;
    const image = fs.readFileSync(
      path.join(__dirname, "../images/empresa/" + req.file.filename)
    );

    const query = `INSERT INTO imagen_empresa (empresa_id_empresa, tipo_imagen, nombre_imagen, data_imagen) VALUES ('${id}', '${type}', '${name}', '${image}')`;

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

module.exports = router;
