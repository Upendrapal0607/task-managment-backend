const { BlackListModel } = require("../models/user.molel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      const blacklistedToken = await BlackListModel.findOne({ token: token });
      if (blacklistedToken) {
        res.status(200).send({ msg: "please Login Again!" });
      }
       else {

        jwt.verify(token, process.env.LOGIN_SECRET_KEY, (err, decode) => {
          if (decode) {
     
            next();
          } else {
            console.log({err});
            res.send({ message: "error accurse" });
          }
        });
      }
    } else {
      res.status(200).send({ message: "You are not authorized" });
    }
  } catch (error) {
    res.send({error, message: "there is something wrong" });
  }
};

module.exports = {
  Auth,
};
