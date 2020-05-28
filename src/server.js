const express = require("express");
const routes = require("./routes");
const cors = require("cors");

require("dotenv").config();
require("./database")

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(port);
console.log(`Listening on port ${port}`);