//logica de negocio
const encriptacion = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
//importar orm
//const { PrismaClient } = require("@prisma/client");
//instanciar orm
//const ormPrisma = new PrismaClient();

//funciones de registro y login
const registrarUsuario = async (nombre, nombreUsuario, correo, clave) => {
  //hashear la contraseña
  //   const claveHashed = await bcrypt.hash(clave, 10);
  //   //crear usuario
  //   const nuevoUsuario = await ormPrisma.user.create({
  //     datos: { nombre, nombreUsuario, correo, claveHashed, perfil: "aprendiz" },
  //   });
  //   return nuevoUsuario;
  return "Trabajando en el registro de usuario con baseD";
};

const ingresarUsuario = async (nombreUsuario, clave) => {
  //   const usuario = await prisma.usuario.findUnique({ where: { nombreUsuario } });
  //   if (!usuario) {
  //     throw new Error("Usuario y/o contraseña incorrectos.");
  //   }
  //   const validarClave = await bcrypt.compare(clave, usuario.clave);
  //   if (!validarClave) {
  //     throw new Error("Usuario y/o contraseña incorrectos.");
  //   }
  const { username, password } = req.body;
  const usuario = {
    id: 111,
    perfil: "aprendiz",
    usernamebd: "jogm",
    passwordbd: "abc123",
  };
  if (username !== usuario.usernamebd || password !== usuario.passwordbd) {
    res.status(400).json({ mensaje: "usuario o contraseña incorrectos" });
  }
  const token = jwtoken.sign(
    { id: usuario.id, perfil: usuario.perfil },
    process.env.JWT_SECRET,
    { expiresIn: "2h" },
  );
  return token;
};

module.exports = { registrarUsuario, ingresarUsuario };
