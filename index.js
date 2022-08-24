const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const database = require("./lib/database/connection");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/health-check", (req, res) => {
  res.json({
    status: "ok",
  });
});

try {
  database.connection();
} catch (e) {
  console.error(e);
}

app.listen(port, () => {
  console.log("Server started on port: " + port);
});