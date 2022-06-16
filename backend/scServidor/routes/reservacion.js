const express = require("express");
const router = express.Router();
var getConnection = require("../conexion");

//consultar reservaciones
router.get("/reservacion/", (req, res) => {
    try {
        getConnection(function (err, conn) {
            if (err) {
                return res.status(500).send("¡Algo ha salido mal!");
            } else {
                conn.query("SELECT * FROM reservacion", function (err, row) {
                    if (err) {
                        return res.status(404).send("No se ha encontrado ninguna reservación");
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

//Registrar nueva reservación
router.post("/reservacion/save/", (req, res) => {
    try {
        const data = {
            id_reservacion: req.body.id_reservacion,
            motivo_reseracion: req.body.motivo_reseracion,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            valor_garantia: req.body.valor_garantia,
            valor_alquiler: req.body.valor_alquiler,
            propiedad_id_propiedad: req.body.propiedad_id_propiedad,
            propiedad_pago_alicuota_id_pago_alicuota: req.body.propiedad_pago_alicuota_id_pago_alicuota,
            propiedad_propietario_id_propietario: req.body.propiedad_propietario_id_propietario,
            propiedad_propietario_usuario_id_usuario: req.body.propiedad_propietario_usuario_id_usuario,
            area_comunal_id_area_comunal: req.body.area_comunal_id_area_comunal,
            area_comunal_imagen_area_id_imagen_area: req.body.area_comunal_imagen_area_id_imagen_area,
        };
        const query = `INSERT INTO reservacion (id_reservacion, motivo_reseracion, fecha_inicio, fecha_fin, valor_garantia, valor_alquiler, propiedad_id_propiedad, propiedad_pago_alicuota_id_pago_alicuota, propiedad_propietario_id_propietario, propiedad_propietario_usuario_id_usuario) VALUES ('${data.id_reservacion}', '${data.motivo_reseracion}', '${data.fecha_inicio}','${data.fecha_fin}','${data.valor_garantia}','${data.valor_alquiler}','${data.propiedad_id_propiedad}','${data.propiedad_pago_alicuota_id_pago_alicuota}','${data.propiedad_propietario_id_propietario}','${data.propiedad_propietario_usuario_id_usuario}')`;
        getConnection(function (err, conn) {
            if (err) {
                return res.status(500).send("¡Algo ha salido mal!");
            } else {
                conn.query(query, function (err, row) {
                    if (err) {
                        return res
                            .status(404)
                            .send("No se ha podido realizar su petición");
                    } else {
                        return res.status(200).send("Ok");
                    }
                });
            }
            conn.release();
        });
    } catch (error) {
        res.send("¡Error!. intente más tarde");
    }
});

//Actulizar información de la reservación
router.post("/reservacion/edit/:id/", (req, res) => {
    try {
      const { id } = req.params;
      const data = {
        motivo_reseracion: req.body.motivo_reseracion,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        valor_garantia: req.body.valor_garantia,
        valor_alquiler: req.body.valor_alquiler,
        propiedad_id_propiedad: req.body.propiedad_id_propiedad,
        propiedad_pago_alicuota_id_pago_alicuota: req.body.propiedad_pago_alicuota_id_pago_alicuota,
        propiedad_propietario_id_propietario: req.body.propiedad_propietario_id_propietario,
        propiedad_propietario_usuario_id_usuario: req.body.propiedad_propietario_usuario_id_usuario,
        area_comunal_id_area_comunal: req.body.area_comunal_id_area_comunal,
        area_comunal_imagen_area_id_imagen_area: req.body.area_comunal_imagen_area_id_imagen_area,
      };
      const query = `UPDATE reservacion SET motivo_reservacion = '${data.motivo_reseracion}', fecha_inicio = '${data.fecha_inicio}', fecha_fin = '${data.fecha_fin}', valor_garantia = '${data.valor_garantia}', valor_alquiler = '${data.valor_alquiler}', valor_alquiler = '${data.propiedad_id_propiedad}', valor_alquiler = '${data.propiedad_pago_alicuota_id_pago_alicuota}', valor_alquiler = '${data.propiedad_propietario_id_propietario}', valor_alquiler = '${data.propiedad_propietario_usuario_id_usuario}'' WHERE id_reservacion = ?`;
      getConnection(function (err, conn) {
        if (err) {
          return res.status(500).send("¡Algo ha salido mal!");
        } else {
          conn.query(query, [id], function (err, row) {
            if (err) {
              return res
                .status(404)
                .send("No se ha podido realizar su petición");
            } else {
               return res.status(200).send("Ok");
            }
          });
        }
        conn.release();
      });
    } catch (error) {
      res.send("¡Error!. intente más tarde");
    }
  });

module.exports = router;