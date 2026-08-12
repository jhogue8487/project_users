const express = require("express");
require("dontenv");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/aprendiz/:cc", (req, res) => {
  const aprendizCc = req.params.cc || 111000111;
  res.send(`EL aprendiz tiene el numero de idenrifiacion: ${aprendizCc}`);
});

app.listen(port, () => {
  console.log(`URL SERVIDOR: http://localhost:${PORT}`);
});
