const express = require("express");
require("dotenv/config");

const app = express();
const registroMiddleware = require("./middleware/registroMiddleware");
const manejoErrMiddleware = require("./middleware/manejoErrMiddleware");
//middleware validar informacion json y form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(registroMiddleware);
app.use(manejoErrMiddleware);

const PORT = process.env.PORT || 3000;
//datos para leer archivo
//const listaAprendices = require("./aprendices.json");//manera sincrona
const sisArchivo = require("fs");
const ruta = require("path");
const rutaArchivoJson = ruta.join(__dirname, "aprendices.json");
//libreria para cargar imagenes
const multer = require("multer");

//configuracion de almacenamiento
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imagenes/");
  },
  filename: (req, file, cb) => {
    const extension = ruta.extname(file.originalname);
    cb(null, `${Date.now()}${extension}`);
  },
});

const cargar = multer({ storage: almacenamiento });

//middleware, se ejecuta c/que se realiza una peticion, no tiene ruta.
app.use((req, res, next) => {
  const tiempoEnMilisegundos = Date.now();
  const fechaGMT = new Date(tiempoEnMilisegundos);
  console.log(`"Milesegundos": ${tiempoEnMilisegundos}
  "Fecha": ${fechaGMT}`);
  next();
});

//middleware registro, registrar que peticion se hizo
//se realizo el codigo aqui

app.use(registroMiddleware);

//ENDPOINTS
app.get("/", (req, res) => {
  res.send("Api de aprendices.");
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

//listar un aprendiz, existe un bug con >0
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
app.post("/api/aprendices", cargar.single("imagen"), (req, res) => {
  //en este endpoint falta validar datos como correo
  //capturar datos del nuevo aprendiz
  const nuevoAprendiz = req.body;
  if (!nuevoAprendiz) {
    return res.status(400).json({ Error: "No se enviaron datos" });
  }
  nuevoAprendiz.avatar = req.file
    ? `/imagenes/${req.file.filename}`
    : "sin imagen";
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

app.get("/error", (req, res, next) => {
  next(new Error("Error provocado"));
});

//escucha el puerto donde despliega el servidor
app.listen(PORT, () => {
  console.log(`URL SERVIDOR: http://localhost:${PORT}`);
});
