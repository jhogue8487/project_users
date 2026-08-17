const express = require("express");
require("dotenv/config");

const app = express();
app.use(express.json());
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
    const aprendiz = JSON.parse(datos).find((a) => a.cc == aprendizCc);
    res.json({ Aprendiz: aprendiz.length > 0 ? aprendiz : "sin datos" });
  });
});

//adicionar un aprendiz
app.post("/api/aprendices", (req, res) => {
  //en este endpoint falta validar datos como correo
  //capturar datos del nuevo aprendiz
  const nuevoAprendiz = req.body;
  //leer archivo
  sisArchivo.readFile(rutaArchivoJson, "utf-8", (err, datos) => {
    if (err) {
      return res.json({ Error: "Error conexin bd." });
    }
    const listaAprendices = JSON.parse(datos);
    listaAprendices.push(nuevoAprendiz);
    sisArchivo.writeFile(
      rutaArchivoJson,
      JSON.stringify(listaAprendices, null, 2),
      (err) => {
        if (err) {
          return res.json({ Error: "Error al guardar el usuario." });
        }
        res.status(201).json({ Aprendiz: nuevoAprendiz });
      },
    );
  });
});

//editar el aprendiz
app.patch("/api/aprendiz/:cc", (req, res) => {
  const aprendizCc = parseInt(req.params.cc, 10);
  const datosModificar = req.body;
  console.log(aprendizCc, datosModificar);
  sisArchivo.readFile(rutaArchivoJson, "utf-8", (err, datos) => {
    if (err) {
      return res.status(500).json({ Error: "Error conexion bd." });
    }
    let listaAprendices = JSON.parse(datos);
    listaAprendices = listaAprendices.map((a) =>
      a.cc === aprendizCc ? { ...a, ...datosModificar } : a,
    );
    sisArchivo.writeFile(
      rutaArchivoJson,
      JSON.stringify(listaAprendices, null, 2),
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ Error: "Error al actualizar usuario." });
        }
        res.status(200).json(datosModificar);
      },
    );
  });
});

//eliminar un aprendiz
app.delete("/api/aprendiz/:cc", (req, res) => {
  const aprendizCc = parseInt(req.params.cc);
  res.json({ mensaje: "trabajdno en delete" });
});

//escucha el puerto donde despliega el servidor
app.listen(PORT, () => {
  console.log(`URL SERVIDOR: http://localhost:${PORT}`);
});
