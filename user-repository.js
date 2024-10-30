import DBLocal from "db-local";
import bcrypt from "bcrypt";
import crypto from 'crypto'

const { Schema } = new DBLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
export class UserRepository {
  static create({ username, password }) {
    //valicacion de username
    if (typeof username != "string")
      throw new Error("username must be a string");
    if (username.length < 3)
      throw new Error("username must be at least 3 characters long");
    //Validacion password
    if (typeof password != "string")
      throw new Error("password must be a string");
    if (password.length < 6)
      throw new Error("password must be at least 6 characters long");

    //Asegurarse que el username no existe
    const user = User.findOne({ username });
    if (user) throw new Error("username already exists");

    const id = crypto.randomUUID();

    //Encriptar password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create({
        _id: id,
        username,
        password: hashedPassword
    }).save()

    return id
  }
  
  static login({ username, password }) {}
}
