const mongoose = require("mongoose");
const User = require("../userSchema");
const bcrypt = require("bcryptjs");

const errorMessages = {
    alreadyExists: {message: "User already registered."},
    internal: {message: "There was a problem processing your request. Please try again later."}
};

exports.verifyIfUserAlreadyExists = (email) => {
    return new Promise( (resolve,reject) => {
        const query = {email};
        User.findOne(query)
        .then(existentUser => {
            (existentUser) ? reject(errorMessages.alreadyExists) : resolve()
        })
    });
};

exports.encryptUserPassword = (userObj) => {
    return new Promise( (resolve,reject) => {
        bcrypt.hash(userObj.password,10, function(err, hash) {
            if (err) {
                console.error(err);
                reject(errorMessages.internal)
            } else {
                userObj.password = hash;
                resolve();
            }
        });
    });
}

exports.saveUserInDB = (userObj) => {
    return new Promise( (resolve,reject) => {
        const {email,password} = userObj
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password
        });
        
        newUser.save()
            .then( (savedUser) => {
                console.log(savedUser);
                resolve(savedUser);
            })
            .catch(err => {
                console.error(err);
                reject(errorMessages.internal)
            })
    })
}