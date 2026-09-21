//logica de negocio
const encriptacion = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
const usuarioBd = require("../models/usuario");
//importar orm, para comunicarse
const ormPrisma = require("../config/db");

//funciones de registro y login
const listar = async () => {
  const usuarios = await ormPrisma.user.findMany();
  return usuarios;
};

module.exports = listar;
