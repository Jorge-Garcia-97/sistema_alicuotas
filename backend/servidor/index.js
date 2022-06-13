const express = require("express");
const app = express();
const port = 4001;

app.get("/", (req, res) => {
  res.end("Hi, from your server");
});

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require("./routes/empresa"));
app.use(require("./routes/empleado"));
app.use(require("./routes/cliente"));
app.use(require("./routes/rol"));
app.use(require("./routes/usuario"));
app.use(require("./routes/establecimiento"));
app.use(require("./routes/sector"));
app.use(require("./routes/proveedor"));
app.use(require("./routes/producto"));
app.use(require("./routes/categoria"));
app.use(require("./routes/pedido"));
app.use(require("./routes/factura"));
app.use(require("./routes/detalle-factura"));
app.use(require("./routes/login"));

app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
