const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
require('dotenv').config()

const errorMessages = {
    password: {
        length: {message: "Password is not strong enough. It should be minimum 6 characters."},
        match: {message: "Passwords don't match."},
        internal: {message: "There was a problem processing your request. Please try again later."}
    },
    email: {message:"E-mail is not valid."}
};

exports.validateEmailAndPassword = (userObj) => {
    return new Promise( (resolve,reject) => {
        userObj.email = validator.normalizeEmail(userObj.email);
        const {email,password} = userObj;
        (!validator.isEmail(email)) ? reject(errorMessages.email) : "";
        (!validator.isLength(password,{min:6})) ? reject(errorMessages.password.length) : "";
        resolve();
    });
};

exports.compareOriginalAndVerificationPasswords = (userObj) => {
    return new Promise( (resolve,reject) => {
        const {password,verificationPassword} = userObj;
        (!validator.equals(password,verificationPassword)) ? reject(errorMessages.password.match) : resolve();
    });
};

exports.compareStringAndHashPassword = (stringPass,hashPass) => {
    return new Promise( (resolve,reject) => {
        bcrypt.compare(stringPass,hashPass)
            .then(passwordsMatch => {
                (passwordsMatch) ? resolve() : reject(errorMessages.password.match)
            })
            .catch(err => {
                console.error(err);
                reject(errorMessages.internal)
            })
    })
}

exports.signToken = (email) => {
    return new Promise( (resolve,reject) => {
        const payload = {email};
        const options = {expiresIn: '30s'};
        jwt.sign(payload, process.env.SECRET_KEY,options,(err,token) =>{
            if (err) reject({message:"Internal error."})
            resolve(token)
        });
    })
};

exports.verifyToken = (req,res,next) => {
    jwt.verify(req.token,process.env.SECRET_KEY,(err,authData) => {
        if (err) {
            return res.status(403).json({message:"Unauthorized"})
        } else {
            console.log(authData);
            next();
        }
    })
};