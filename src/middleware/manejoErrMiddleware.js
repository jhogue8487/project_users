const manejoErr = (err, req, res, next) => {
  const codigoEstado = err.statusCode || 500;
  const mensaje = err.message || "Ocurrio un error Inesperado.";

  console.error(
    `[ERROR] ${new Date().toISOString()} - ${codigoEstado} - ${mensaje}`,
  );
  //validar si tenemos mas informacion
  if (err.stack) {
    console.error(err.stack);
  }
  //enviar respuesta json
  res.status(codigoEstado).json({
    estado: "error",
    codigoEstado,
    mensaje,
    //mas detalles solo en modo de desarrollo
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = manejoErr;
