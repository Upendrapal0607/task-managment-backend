const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel, BlackListModel } = require("../models/user.molel");
const { validator } = require("../utils/Password.validation");
require("dotenv").config();

const userRoute = express.Router();
userRoute.get("/", async (req, res) => {
  try {
    const AllUser = await UserModel.find();
    res.status(200).json({ userList: AllUser });
  } catch (error) {
    res.status(200).send({ mess: error });
  }
});

userRoute.post("/register", async (req, res) => {
  const resUser = req.body;

  try {
    const AlraidyExitst = await UserModel.findOne({ email: resUser.email });
    if (AlraidyExitst) {
      res.status(200).json({
        message: `user whose mail ${resUser.email} is alraiday resistered`,
        name: AlraidyExitst.name,
      });
    } else {
      bcrypt.hash(resUser.password, 3, async (err, hash) => {
        if (err) res.status(404).send({ message: err });
        const registerUser = new UserModel({ ...resUser, password: hash });
        await registerUser.save();
        res
          .status(200)
          .send({ message: "new user resistered", name: registerUser.name });
      });
    }
  } catch (error) {
    res.status(404).send({ message: error });
  }
});
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
   ;
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, user: user.name },
            process.env.LOGIN_SECRET_KEY || "uesrsecreate",
            { expiresIn: "7d" }
          );
     
          res.status(200).send({ message: "login successful", token, user });
        } else {
          res.status(200).send({ message: "wrong password or email" });
        }
      });
    } else {
      res.status(200).send({ message: "please provid email and password" });
    }
  } catch (error) {
    res.status(200).send({ message: error });
  }
});

userRoute.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const blacklist = new BlackListModel({ token });
    await blacklist.save();
    res.status(200).send({ message: "loguot successful" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
});
module.exports = {
  userRoute,
};
