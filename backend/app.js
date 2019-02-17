const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// app.use("/calculator",triangleRoutes);

module.exports = app;