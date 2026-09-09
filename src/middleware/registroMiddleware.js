const registroMiddleware = (req, res, next) => {
  const fechaUTC = new Date().toISOString();
  console.log([`${fechaUTC} , ${req.method} , ${req.url} , IP ${req.ip}`]);

  const milisegundos = Date.now();
  res.on("finish", () => {
    const duracion = Date.now() - milisegundos;
    console.log(`Status: ${res.statusCode} - Duracion: ${duracion} ms `);
  });
  next();
};

module.exports = registroMiddleware;
