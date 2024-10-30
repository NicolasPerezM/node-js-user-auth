import DBLocal from "db-local";
import bcrypt from "bcrypt";
import crypto from "crypto";

const { Schema } = new DBLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
export class UserRepository {
  static async create({ username, password }) {
    //valicacion de username
    Validation.username(username);
    //Validacion password
    Validation.password(password);

    //Asegurarse que el username no existe
    const user =  User.findOne({ username });
    if (user) throw new Error("username already exists");

    const id = crypto.randomUUID();

    //Encriptar password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); //hashSync => bloquea el threat principal

    User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save();

    return id;
  }

  static async login({ username, password }) {
    //valicacion de username
    Validation.username(username);
    //Validacion password
    Validation.password(password);

    const user = User.findOne({ username });
    if (!user) throw new Error("user not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("invalid password");

    const { password: _, ...publicUser } = user;

    return publicUser;
  }
}

class Validation {
  static username(username) {
    if (typeof username != "string")
      throw new Error("username must be a string");
    if (username.length < 3)
      throw new Error("username must be at least 3 characters long");
  }
  static password(password) {
    if (typeof password != "string")
      throw new Error("password must be a string");
    if (password.length < 6)
      throw new Error("password must be at least 6 characters long");
  }
}
