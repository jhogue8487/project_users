//rutas de autenticacion, importamos
const { Router } = require("express");

const {
  registrar,
  iniciarSesion,
} = require("../controllers/autenticarController");

const autenticarToken = require("../middleware/autenticacion");
const enrutador = Router();

//este enrutado se comunica con el controlador (endpoint registrar nuevo de app), y el controlador con el servicio
enrutador.post("/registro", registrar);
enrutador.post("/login", iniciarSesion);

enrutador.get("/api/rutaprotegida", autenticarToken, (req, res, next) => {
  res.json({ mensaje: "Ruta protegida" });
});

module.exports = enrutador;
