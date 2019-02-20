const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const userRoutes = require("./users/userRoutes");
const threadRoutes = require("./threads/threadRoutes");
const commentRoutes = require("./comments/commentRoutes");

const dbConnection = require("./db-connect");
require('dotenv').config()

app.use(cors());

// parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

// define main routes
app.use("/users",userRoutes);
app.use("/threads",threadRoutes);
app.use("/comments",commentRoutes);

module.exports = app;