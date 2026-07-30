// Validación de correo electrónico mediante Regex
function esValidoEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validación de nombre (mínimo 3 caracteres)
function esValidoNombre(nombre) {
  return typeof nombre === "string" && nombre.length >= 3;
}

// Validación de ID (numérico y único)
function esValidoId(id, usuarios) {
  const esNumero = !isNaN(id);
  const esUnico = !usuarios.some((usuario) => usuario.id === id);
  return esNumero && esUnico;
}

//Funcion principal
function validarUsuario(usuario, usuarios) {
  const { nombre, correo, id } = usuario;
  if (!esValidoNombre(nombre)) {
    return {
      esValido: false,
      error: `El nombre '${nombre}' debe tener tres caracteres.`,
    };
  }
  if (!esValidoEmail(correo)) {
    return {
      esValido: false,
      error: `El correo electronico "${correo}" no es valido.`,
    };
  }
  return {
    esValido: true,
  };
}
export { esValidoEmail, esValidoNombre, validarUsuario };
