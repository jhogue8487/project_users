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

function ingresar(req, res) {
  const datos = req.body;
  if (!datos)
    return res.status(400).json({ mensaje: "Usuario y clave obligatorios" });
  //bd simulada
  const bd = { user: "jogm", pass: "123" };
  if (datos.usuario !== bd.user || datos.clave !== bd.pass) {
    res.json({ mensaje: "Credenciales incorrectas" });
  }
  const token = jwt.sign({ usuario: datos.usuario }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.json({ token });
}

module.exports = { registrar, ingresar };

// try {
//   const { usuario, clave } = req.body;
//   //funcion del servicio
//   const token = await ingresarUsuario(usuario, clave);

//   //puedes enviar mas informacion como avatar usuario
//   res.json(token);
// } catch (error) {
//   return res.status(400).json({ error: error.message });
// }
