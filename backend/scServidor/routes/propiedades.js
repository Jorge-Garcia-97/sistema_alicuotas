const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar propiedades
router.get("/propiedades/:estado", (req, res) => {
    try {

      const { estado } = req.params;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          const query =
          "SELECT pd.id_propiedad, pd.numero_casa, pd.direccion_propiedad, pr.id_propietario, pr.nombre_propietario, pr.apellido_propietario, pr.celular_propietario FROM propiedad as pd, propietario as pr WHERE pd.propietario_id_propietario = pr.id_propietario AND pd.estado_propiedad = ?";
          conn.query(query, [estado], function (err, row) {
            
            if (err) {
              return res.status(404).send("No se ha encontrado ninguna propiedad");
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

  //Consultar propiedad por numero de casa
  router.get("/propiedades/casa/:casa/", (req, res) => {
    try {
      const { casa } = req.params;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("Oh!, something went wrong");
        } else {
          conn.query("SELECT * FROM propiedad WHERE numero_casa = ?", [casa], function (err, row) {
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

  //Registrar nueva propiedad
router.post("/propiedades/save/", (req, res) => {
  try {
    const data = {
      numero_casa: req.body.numero_casa,
      direccion_propiedad: req.body.direccion_propiedad,
      estado_propiedad: req.body.estado_propiedad,
      propietario_id_propietario: req.body.propietario_id_propietario,
    };
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `INSERT INTO propiedad ( numero_casa, direccion_propiedad, estado_propiedad, propietario_id_propietario) VALUES ( '${data.numero_casa}', '${data.direccion_propiedad}', '${data.estado_propiedad}', '${data.propietario_id_propietario}')`;
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

//Editar propiedad
router.post("/propiedades/edit/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = {      
      numero_casa: req.body.numero_casa,
      direccion_propiedad: req.body.direccion_propiedad,
    };    
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE propiedad SET numero_casa = '${data.numero_casa}', direccion_propiedad = '${data.direccion_propiedad}' WHERE id_propiedad = ?`;
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

router.post("/propiedad/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    getConnection(function (err, conn) {
      if (err) {
        return res.status(500).send("Oh!, something went wrong");
      } else {
        const query = `UPDATE propiedad SET estado_propiedad = 'INACTIVO' WHERE id_propiedad = ?`;
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