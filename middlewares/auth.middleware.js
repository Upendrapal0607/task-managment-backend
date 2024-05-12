const { BlackListModel } = require("../models/user.molel");
const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const blacklistedToken = await BlackListModel.findOne({ token: token });
      if (blacklistedToken) {
        res.status(200).send({ msg: "please Login Again!" });
      } else {
        jwt.verify(token, process.env.LOGIN_SECRET_KEY, (err, decode) => {
          if (decode) {
            req.body.userId = decode.userID;
            next();
          } else res.send({ message: "error accurse" });
        });
      }
    } else {
      res.status(200).send({ message: "You are not authorized" });
    }
  } catch (error) {
    res.send({ message: "there is something wrong" });
  }
};

module.exports = {
  Auth,
};
