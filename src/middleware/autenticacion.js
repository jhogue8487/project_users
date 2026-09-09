const jwt = require("jsonwebtoken");

const authtoken = (req, res, next) => {
  const token = req.header("Auth")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ Error: "Acceso Denegado, no provee token" });
  //informacion desde nuestras variable de entorno
  jwt.verify(token, process.env.JWT_SECRET, (error, usuario) => {
    if (error) res.status(403).json({ Error: "Token Invalido" });
    req.usuario = usuario;
    console.log("de autenticacion ", req.usuario);
    next();
  });
};

module.exports = authtoken;
