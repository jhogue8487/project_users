const {
  registrarUsuario,
  ingresarUsuario,
} = require("../services/autenticarService");
const registrar = async (req, res) => {
  try {
    const { nombre, nombreUsuario, correo, clave } = req.body;
    //funcion del servicio, por crear
    await registrarUsuario(nombre, nombreUsuario, correo, clave);
    return res.status(201).json({ mensaje: "Usuario registrado" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

async function ingresar(req, res) {
  try {
    const { usuario, clave } = req.body;
    //funcion del servicion
    const token = await ingresarUsuario(usuario, clave);
    //puedes enviar mas informacion como avatar usuario
    res.json(token);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = { registrar, ingresarUsuario };
