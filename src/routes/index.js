const { Router } = require("express");
const autenticarRouter = require("./autenticar");
const enrutador = Router();

//enrutador
enrutador.use("/autenticar", autenticarRouter);
//enrutador.use("/");

module.exports = enrutador;
