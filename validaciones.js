// Validación de correo electrónico mediante Regex
function esValidoEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validación de nombre (mínimo 3 caracteres)
function esValidoNombre(nombre) {
  return typeof name === "string" && name.length >= 3;
}

// Validación de ID (numérico y único)
function esValidoId(id, usuarios) {
  const esNumero = !isNaN(id);
  const esUnico = !usuarios.some((usuario) => usuario.id === id);
  return esNumero && esUnico;
}

//Funcion principal
function validarUsuario(usuario, usuarios) {
  const errores = [];
  if (!esValidoNombre(usuario.nombre)) {
    errores.push("El nombre debe tener tres caracteres.");
  }
  if (!esValidoEmail(usuario.email)) {
    errores.push("El correo electronico no es valido.");
  }
  return {
    esValido: errores.length === 0,
    errores: errores,
  };
}
export { esValidoEmail, esValidoNombre, validarUsuario };
