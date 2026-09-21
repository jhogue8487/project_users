//rutas de autenticacion, importamos
const { Router } = require("express");

const listar = require("../controllers/usuarioController");

const enrutador = Router();

//este enrutado se comunica con el controlador (endpoint registrar nuevo de app), y el controlador con el servicio
enrutador.get("/", listar);

module.exports = enrutador;
