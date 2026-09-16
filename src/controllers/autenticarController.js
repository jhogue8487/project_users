//como es de prueba expotamos jsonwebtoken
const jwt = require("jsonwebtoken");
const {
  registrarUsuario,
  ingresarUsuario,
} = require("../services/autenticarService");

const registrar = async (req, res) => {
  try {
    const { nombre, nombreUsuario, correo, clave } = req.body;
    //funcion del servicio, por crear
    //await registrarUsuario(nombre, nombreUsuario, correo, clave);
    const datosUsuario = req.body;
    return res
      .status(201)
      .json({ mensaje: "Usuario registrado", Datos: datosUsuario });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//separamos la logica de la logica del negocio
async function ingresar(req, res) {
  try {
    const { usuario, clave } = req.body;
    //funcion del servicio
    const token = await ingresarUsuario(usuario, clave);
    //puedes enviar mas informacion como avatar usuario
    res.json(token);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { registrar, ingresar };
