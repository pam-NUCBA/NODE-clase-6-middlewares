const express = require("express");
const path = require("path");
const users = require("./Users");
const { logger } = require("./middlewares/logger");

const app = express();

const PORT = process.env.PORT || 8000;

//*los middleware podrían venir de otro archivo, así el index queda un poco más limpio... de hecho las rutas también deberían estar en otro archivo ;)
// app.use(logger);

//*con express ya no necesitamos el stringify!
app.get("/api/users", (req, res) => res.json(users));

app.get("/api/users/:id", (req, res) => {
  // res.send(req.params.id)
  //*some va a dar true o false, entonces puedo probar para que no me traiga un array vacío si el user no existe
  const userExists = users.some((user) => user.id === parseInt(req.params.id));

  if (userExists) {
    //*esto tiene un pequeño problema! req.params.id se manda como string, pero el id es un número! hay que hacer el parseInt para reconvertir
    console.log(typeof req.params.id);
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ message: "id not found" });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`server on ${PORT}`));
