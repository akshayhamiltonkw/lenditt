const express = require("express");
const Sequelize = require("./config/database");
const cors = require("cors");
const filterContact = require("./route/filterContact");

const app = express();

const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/", filterContact);

Sequelize.sync();

app.listen(port, (err) => {
  if (err) {
    console.log("Unable to start the server!");
  } else {
    console.log("Server started running on : " + port);
  }
});
