const express = require("express");
const app = express();
const path = require("path");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const db = new Database("my.db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const insertUser = db.prepare(
  `INSERT INTO users (name, mail, phone, password) VALUES (?,?,?,?);`
);

app.post("/login", (req, res) => {
  const { mail, password } = req.body; // gets the email and password from the request body
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(mail); // gets the user with the given email
});

app.post("/register", (req, res) => {
  const { name, mail, phone, password } = req.body; // gets the email and password from the request body
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email); // gets the user with the given email
});

if (user) {
  res.status(409).send("Email already exists"); // if the user exists, send a 409 status code
} else {
  // hash the password
  const hash = bcrypt.hashSync(password, 6);

  // inserts the user into the database
  const insertUser = () => {
    sql.insertUser.run(name, email, rolle, hash, "", "", "", "1", "0", token);
  };
}

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// bruker public mappen
app.use("/", express.static(path.join(__dirname, "public")));
app.listen(3000);
