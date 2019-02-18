const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require("./users/userRoutes");
const dbConnection = require("./db-connect");
require('dotenv').config()

// parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

// define main routes
app.use("/user",userRoutes);

module.exports = app;