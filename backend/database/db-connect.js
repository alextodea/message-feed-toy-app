const mongoose = require("mongoose");
require('dotenv').config()

// set database options in order to avoid deprecation warnings
const databaseOptions = { 
    useCreateIndex: true,
    useNewUrlParser: true
};

mongoose.connect(process.env.DB_URL,databaseOptions);
mongoose.Promise = global.Promise;

const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "MongoDB connection error:"));