require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📌 Configurar la conexión con la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Servidor de la base de datos
  user: process.env.DB_USER,      // Usuario de la base de datos
  password: process.env.DB_PASSWORD,  // Contraseña
  database: process.env.DB_NAME,  // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error en la conexión a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL correctamente");
  }
});

// 📌 Ruta para probar la conexión
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
