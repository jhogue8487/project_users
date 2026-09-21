//como es de prueba expotamos jsonwebtoken
const listarUsuarios = require("../services/usuariosService");

const listar = async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al comunicarse con la base de datos" });
  }
};

module.exports = listar;
