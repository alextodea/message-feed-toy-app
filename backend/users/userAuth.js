const validator = require("validator");

exports.inputsValidation = (userObj) => {

    return new Promise( (resolve,reject) => {

        userObj.email = validator.normalizeEmail(userObj.email);
    
        let errors = [];
        const {username,email,passwordOne,passwordTwo} = userObj;

        if (!validator.isAlphanumeric(username)) {
            errors.push(
                {
                    input: "username",
                    message: "Username should contain only alphanumeric characters!"
                }
            )
        };

        if (!validator.isEmail(email)) {
            errors.push(
                {
                    input: "email",
                    message: "Please add a valid e-mail!"
                }
            )
        }

        if (!validator.isLength(passwordOne,{min:6})) {
            errors.push(
                {
                    input: "password",
                    message: "Password should be at least 6 characters length!"
                }
            )
        }

        if (!validator.equals(passwordOne,passwordTwo)) {
            errors.push(
                {
                    input: "password",
                    message: "Passwords don't match. Please try again!"
                }
            )
        }

        if (errors.length > 0) {
            reject(errors)
        } else {
            resolve();
        }
    });
};