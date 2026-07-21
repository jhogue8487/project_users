import express from "express";
import "dotenv/config"; //esto importa y ejecuta en una sola linea
import fs from "fs";
import path from "path";
import { validarUsuario } from "./validaciones.js";

const app = express();
const port = process.env.PORT || 3030;

//ruta para lectura del archivo
const ruta_archivo = path.join(import.meta.dirname, "usuarios.json");
//configuracion de envio de datos json o form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//listar usuarios
app.get("/usuarios", (req, res) => {
  fs.readFile(ruta_archivo, "utf-8", (err, datos) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error lectura archivo o conexion BD" });
    }
    const usuarios = JSON.parse(datos);
    res.json(usuarios);
  });
});

//adicionar usuarios
// app.post("/usuarios", (req, res) => {
//   const id = Object.length + 1;
//   const nombre = req.body.nombre || "N.N";
//   const edad = req.body.edad || 0;
//   const correo = req.body.correo || "sincorrreo@gmail.com";
//   res.json({ datos: { id, nombre, edad, correo } });
// });

app.post("/usuarios", (req, res) => {
  const nuevo_usuario = req.body;

  fs.readFile(ruta_archivo, "utf-8", (err, datos) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "No se puedo leer el archivo, o conexion BD" });
    }
    const usuarios = JSON.parse(datos); //objeto

    //id
    const maxId = usuarios.reduce((max, usuario) => {
      return usuario.id > max ? usuario.id : max;
    }, 0);
    nuevo_usuario.id = maxId + 1;
    //variable para validar
    const validar = validarUsuario(nuevo_usuario, usuarios);
    if (!validar.isValid) {
      return res.status(400).json({ error: validar.error });
    }
    usuarios.push(nuevo_usuario);
    fs.writeFile(ruta_archivo, JSON.stringify(usuarios, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar el usuario" });
      }
      res.status(201).json(nuevo_usuario);
    });
  });
});

//Editar un usuario
app.patch("/usuarios/:id", (req, res) => {
  const usuario_id = parseInt(req.params.id, 10);
  const usuario_editar = req.body;

  //leer archivo usuarios
  fs.readFile(ruta_archivo, "utf-8", (err, datos) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error lectura de archivo o conexion BD." });
    }
    //parseamos datos
    let lista_usuarios = JSON.parse(datos);

    //actualizar usuari que conicida con ID
    lista_usuarios = lista_usuarios.map((usuario) => {
      return usuario.id === usuario_id
        ? { ...usuario, ...usuario_editar }
        : usuario;
    });

    //guardar los cambios
    fs.writeFile(
      ruta_archivo,
      JSON.stringify(lista_usuarios, null, 2),
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al acutalizr el usuario" });
        }
        //se actualiza el usuario
        res.json(usuario_editar);
      },
    );
  });
});

//

app.listen(port, () => {
  console.log(`SERVIDOR EN: http://localhost:${port}/`);
});
