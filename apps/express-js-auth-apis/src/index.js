require("dotenv").config();
console.log(process.env);
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const path = require("path");

mongoose.connect("mongodb://localhost:27017/usermgmtdb", {
  useNewUrlParser: true,
});
const app = express();
app.use("/", (req, res, next) => {
  next();
});
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "invalid" });
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (isEqual) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET
    );

    return res.status(200).json({ status: "ok", access_token: token });
  }
  return res.status(400).json({ message: "invalid username/password" });
});

app.post("/auth/register", async (req, res) => {
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ message: "invalid payload" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.status(400).json({ message: "invalid payload" });
  }
  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const response = await User.create({
      username,
      password,
    });
    return res
      .status(201)
      .json({ message: { id: response._id, username: response.username } });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: `user already exists with this username ${username}`,
      });
    }
    return res.status(500).send();
  }
});

app.listen(process.env.PORT || 3005, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
