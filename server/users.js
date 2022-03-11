const express = require("express");
const users = express.Router();
const userModel = require("./model");

users.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = users;
