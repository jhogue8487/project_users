const express = require("express");
require("dotenv");

const app = express();
const PORT = process.env.PORT || 3000;
const listaAprendices = require("./aprendices.json");

app.get("/", (req, res) => {
  res.send("Api de aprendices");
});

app.get("/api/aprendices", (req, res) => {
  res
    .status(200)
    .json({ Mensaje: "Lista de aprendices", Lista: listaAprendices });
});

app.get(["/api/aprendiz", "/api/aprendiz/:cc"], (req, res) => {
  const aprendizCc = req.params.cc || 111000111;
  //res.send(`EL aprendiz tiene el numero de identifiacion: ${aprendizCc}`);
  const aprendiz = listaAprendices.filter((a) => a.cc == aprendizCc);

  res.json({ Aprendiz: aprendiz.length > 0 ? aprendiz : "sin datos" });
});

app.listen(PORT, () => {
  console.log(`URL SERVIDOR: http://localhost:${PORT}`);
});
