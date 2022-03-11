const express = require("express");

const router = require("./router");
const init = require("./db");

const app = express();

app.use("/", router);

const port = 8080;

init();
app.listen(port, () => {
  console.log(`App running on PORT ${port}`);
});
