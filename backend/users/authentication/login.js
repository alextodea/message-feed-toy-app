const mongoose = require("mongoose");
const User = require("../userSchema");

const errorMessages = {
    notInDatabase: {message: "User is not registered."},
    internal: {message: "There was a problem processing your request. Please try again later."}
};

exports.retrieveUser = (email) => {
    return new Promise( (resolve,reject) => {
        const query = {email};
        User.findOne(query)
            .then(userInDb => {
                (!userInDb) ? reject(errorMessages.notInDatabase) : resolve(userInDb)
            })
            .catch( err => {
                console.error(err);
                reject(errorMessages.internal)
            })
    })
};