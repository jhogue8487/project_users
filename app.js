import express from "express";
import "dotenv/config"; //esto importa y ejecuta en una sola linea
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3030;

//ruta para lectura del archivo
const ruta_archivo = path.join(import.meta.dirname, "usuarios.json");
//configuracion de envio de datos json o form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/usuarios", (req, res) => {
  fs.readFile(ruta_archivo, "utf-8", (err, datos) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error lectura archivo o conexion BD" });
    }
    const usuarios = JSON.parse(datos);
    res.json(usuarios);
  });
});

app.listen(port, () => {
  console.log(`SERVIDOR EN: http://localhost:${port}/`);
});
