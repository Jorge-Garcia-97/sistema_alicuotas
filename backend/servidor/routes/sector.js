const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar sectores
router.get("/sectores/", (req, res) => {
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM sector", function (err, row) {
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

//consultar sectores por empresa
router.get("/sectores/empresa/:id", (req, res) => {
  const {id} = req.params;
  try {
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        conn.query("SELECT * FROM sector WHERE empresa_id_empresa = ?", [id], function (err, row) {
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

//Registrar nuevo sector
router.post("/sector/save/", (req, res) => {
  try {
    const data = {
      nombre_sector: req.body.nombre_sector,
      empresa_sector: req.body.empresa_sector
    };
    const query = `INSERT INTO sector (nombre_sector, empresa_id_empresa) VALUES( '${data.nombre_sector}', '${data.empresa_sector}')`;
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
