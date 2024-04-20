const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const BlackList = mongoose.Schema({
  blacklistToken: {
    type: String,
  },
});
const UserModel = mongoose.model("User", userSchema);
const BlackListModel = mongoose.model("BlackList", BlackList);

module.exports = {
  UserModel,
  BlackListModel,
};
