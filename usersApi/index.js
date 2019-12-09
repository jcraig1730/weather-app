const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../db/models/users.js");
const db = require("../db/index.js");

const app = express();

const corsOptions = { origin: "http://localhost:3000" };

app.use(cors());
app.use(bodyParser.json());

app.get("/login", (req, res) => {
  const user = db.findUser(req.body.id);
  if (user) {
    res.json(user);
  } else {
    db.createUser(req.body.id);
  }
});

app.post("/api/users/", (req, res) => {
  const { user } = req.body;
  db.createUser(user)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.get("/api/users/:id", (req, res) => {
  let { id } = req.params;
  db.findUser(id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { updatedUserInfo } = req.body;
  console.log(updatedUserInfo, "hiiiiiiiiii");

  db.updateUser(id, updatedUserInfo)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.deleteUser(id)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.listen(3002, () => console.log("users api running on port 3002"));
