const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./model");
const app = express();

const port = 8080;

const data = [
  { id: 1, name: "Gourav Tiwari", contact: 7685846284 },
  { id: 2, name: "Rakesh Yadav", contact: 9883962164 },
  { id: 3, name: "Rishu Yadav", contact: 9883979229 },
];

mongoose.connect(
  `mongodb+srv://gouravt16:Impossible888@professional.acozh.mongodb.net/Professional?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.once("open", function () {
  console.log("MongoDB Connected successfully");
});

app.get("/", (req, res) => {
  res.send(data);
});

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App running on PORT ${port}`);
});
