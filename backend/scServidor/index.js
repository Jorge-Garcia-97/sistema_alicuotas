const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
    res.end("Hola :)");
  });

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(require("./routes/administrador"));
app.use(require("./routes/area_comunal"));
app.use(require("./routes/comprobante"));
app.use(require("./routes/cuota_extra"));
app.use(require("./routes/detalle_comprobante"));
//app.use(require("./routes/login"));
app.use(require("./routes/multas"));
app.use(require("./routes/pago_alicuota"));
app.use(require("./routes/propiedades"));
app.use(require("./routes/propietario"));
app.use(require("./routes/reservacion"));
app.use(require("./routes/solicitud"));
app.use(require("./routes/usuario"));

app.listen(port, () => {
    console.log(`app listening at ${port}`);
  });


