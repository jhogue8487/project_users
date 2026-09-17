const { Router } = require("express");
const autenticarRouter = require("./autenticar");
const usuariosRouter = require("./usuarios");
const enrutador = Router();

//enrutador
enrutador.use("/autenticar", autenticarRouter);
enrutador.use("/usuarios", usuariosRouter);
//enrutador.use("/");

module.exports = enrutador;
