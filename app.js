import express from "express";

import { configDotenv } from "dotenv";
//import 'dotenv/config';//esto importa y ejecuta en una sola linea
configDotenv();

const app = express();
const port = process.env.PORT || 3030;

//configuracion de envio de datos json o form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.post("/form", (req, res) => {
  const user = req.body.user || "nn";
  const pass = req.body.pass || "utilizar";
  res.json({
    datos: { user, pass },
  });
});

app.post("/datos", (req, res) => {
  const datos = req.body;
  res.json({ mensaje: "Datos recibidos", datos: datos });
});

app.listen(port, () => {
  console.log(`SERVIDOR EN: http://localhost:${port}/`);
});
