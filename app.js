const express = require("express");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 3000;
//datos para leer archivo
//const listaAprendices = require("./aprendices.json");//manera sincrona
const sisArchivo = require("fs");
const ruta = require("path");
const rutaArchivoJson = ruta.join(__dirname, "aprendices.json");

app.get("/", (req, res) => {
  res.send("Api de aprendices");
});

//listar todos los aprendices
app.get("/api/aprendices", (req, res) => {
  sisArchivo.readFile(rutaArchivoJson, "utf-8", (err, datos) => {
    if (err) {
      res.status(500).json({ error: "Error conexion bd." });
    }
    const listaAprendices = JSON.parse(datos);
    res.json({ "listado Aprendices": listaAprendices });
  });
});

//listar un aprendiz
app.get(["/api/aprendiz", "/api/aprendiz/:cc"], (req, res) => {
  const aprendizCc = req.params.cc || 10001;
  //res.send(`EL aprendiz tiene el numero de identifiacion: ${aprendizCc}`);
  sisArchivo.readFile(rutaArchivoJson, "utf-8", (err, datos) => {
    if (err) {
      return res.status(500).json({ Error: "Error conexion bd." });
    }
    const aprendiz = JSON.parse(datos).filter((a) => a.cc == aprendizCc);
    res.json({ Aprendiz: aprendiz.length > 0 ? aprendiz : "sin datos" });
  });
});

//adicionar un aprendiz

//escucha el puerto donde despliega el servidor
app.listen(PORT, () => {
  console.log(`URL SERVIDOR: http://localhost:${PORT}`);
});
