import express from "express";
import { configDotenv } from "dotenv";
//import 'dotenv/config';//esto importa y ejecuta en una sola linea
configDotenv();

const app = express();
const port = process.env.PORT || 3030;

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
