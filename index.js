import express from "express";
import { PORT } from "./config.js"; //es mejor separar este tipo de variables en otro archivo
import { UserRepository } from "./user-repository.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello bissstches");
});

//endpoints

app.post("/login", (req, res) => {});
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  try {
    const id = UserRepository.create({ username, password });
    res.send({ id });
  } catch (err) {
    //Lo ideal seria manejar los errores de mejor manera como usando middlewares 
    res.status(400).send(err.message);
  }
});
app.post("/logout", (req, res) => {});

app.get("/protected", (req, res) => {});

//levantar servidor
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

