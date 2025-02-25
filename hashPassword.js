const bcrypt = require("bcryptjs");

const password = "123456"; // Cambia esto por la contraseña que quieres cifrar
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log("Contraseña cifrada:", hash);
});
