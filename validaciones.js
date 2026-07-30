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
  const errores = [];
  if (!esValidoNombre(usuario.nombre)) {
    errores.push(`El nombre '${usuario.nombre}' debe tener tres caracteres.`);
  }
  if (!esValidoEmail(usuario.correo)) {
    errores.push(`El correo '${usuario.correo}' electronico no es valido.`);
  }
  return {
    esValido: errores.length === 0,
    errores: errores,
  };
}
export { esValidoEmail, esValidoNombre, validarUsuario };
