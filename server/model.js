const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  contact: String,
  currentOrganization: String,
  imagePath: String,
});

const User = mongoose.model("friends", UserSchema);

module.exports = User;