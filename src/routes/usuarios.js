//rutas de autenticacion, importamos
const { Router } = require("express");

const listar = require("../controllers/listarController");

const enrutador = Router();

//este enrutado se comunica con el controlador (endpoint registrar nuevo de app), y el controlador con el servicio
enrutador.post("/usuarios", listar);

module.exports = enrutador;
