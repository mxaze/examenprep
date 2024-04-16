const express = require('express');
const app = express();
const path = require('path');
const database = require("better-sqlite3");

// bruker public mappen
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
    const { mail, password } = req.body;
})

app.post("/register", (req, res) => {
    const { name, mail, password, phone } = req.body;
})


app.listen(3000); 