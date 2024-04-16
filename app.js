const express = require("express");
const app = express();
const path = require("path");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const db = new Database("dev.db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const insertUser = db.prepare(
  `INSERT INTO users (name, mail, phone, password) VALUES (?,?,?,?);`
);

app.post("/login", (req, res) => {
  const { mail, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE mail = ?").get(mail);
  if (!user) {
    res.status(401).send("Invalid email or password");
    return;
  }
  const compare = bcrypt.compareSync(password, user.password);

  if (compare) {
    res.redirect("/");
  } else {
    res.status(401).send("Invalid email or password");
  }
});

app.post("/register", (req, res) => {
  const { name, mail, phone, password } = req.body; // gets the email and password from the request body
  const user = db.prepare("SELECT * FROM users WHERE mail = ?").get(mail); // gets the user from the database

  if (user) {
    res.status(409).send("Email already exists"); // if the user exists, send a 409 status code
  } else {
    // hash the password
    const hash = bcrypt.hashSync(password, 6);
    insertUser.run(name, mail, phone, hash); // inserts the user into the database
    res.redirect("/") // sends the user to main site
  }
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// bruker public mappen
app.use("/", express.static(path.join(__dirname, "public")));
app.listen(3000);