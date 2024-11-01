import express from "express";
import { PORT } from "./config.js"; //es mejor separar este tipo de variables en otro archivo
import { UserRepository } from "./user-repository.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello bissstches");
});

//endpoints

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserRepository.login({ username, password });
        res.send({user});
    } catch (err) {
        res.status(401).send(err.message);
    }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await UserRepository.create({ username, password });
    console.log('Usuario creado con id: ', id);
    res.status(201).send({ id });
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

