require("dotenv").config();
const sequelize = require("./db");
const express = require("express");
const models = require("./models/models");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleWare/ErrorHandlingMiddleWare");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "WORKING" });
});

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
