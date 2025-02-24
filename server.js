require("dotenv").config();
const express = require("express");
const db = require("./db");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// **Ruta de login**
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) return res.status(500).json({ error: "Error al verificar contraseña" });

        if (isMatch) {
          res.json({ message: "Inicio de sesión exitoso", userId: user.id });
        } else {
          res.status(401).json({ error: "Contraseña incorrecta" });
        }
      });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  });
});

// **Ruta de registro**
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al registrar usuario" });

      res.json({ message: "Usuario registrado con éxito" });
    }
  );
});

// **Ruta de recuperación de contraseña**
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    if (results.length > 0) {
      res.json({ message: "Se ha enviado un enlace de recuperación a tu correo." });
    } else {
      res.status(404).json({ error: "Correo no encontrado" });
    }
  });
});

// **Iniciar el servidor**
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
