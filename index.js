import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connection from "./lib/database/connection.js";
import accounts from "./lib/accounts/routes/accounts.route.js";
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options('*', cors())


app.use("/accounts", accounts);

try {
  connection();
} catch (e) {
  console.error(e);
}

const server = app.listen(port, () => {
  console.log("Server started on port: " + port);
});

export default server;
