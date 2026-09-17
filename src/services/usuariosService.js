//logica de negocio
const encriptacion = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
const usuarioBd = require("../models/usuario");
//importar orm, para comunicarse
const { PrismaClient } = require("@prisma/client");
//instanciar orm
const ormPrisma = new PrismaClient();

//funciones de registro y login
const listar = async () => {
  const usuarios = await ormPrisma.user.all();
  return usuarios;
};

module.exports = listar;
