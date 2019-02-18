const validation = require("./authentication/validation");
const login = require("./authentication/login");
const registration = require("./authentication/registration");

exports.getProfile = (req,res) => {
    res.status(200).json({"message":"This is the profile page"});
};

exports.getLogin = (req,res) => {
    res.status(200).json({message:"login page"})
};

exports.postLogin = async (req,res,next) => {
    try {
        await validation.validateEmailAndPassword(req.body);
        const userInDb = await login.retrieveUser(req.body.email);
        await validation.compareStringAndHashPassword(req.body.password,userInDb.password);
        const token = await validation.signToken(userInDb.email);
        
        // add web token in headers and the compare it in 'verifytoken()'

        res.status(200).json(
            {
                message: "Login success!",
                body: token
            }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
};

exports.postRegister = async (req,res) => {
    try {
        await validation.validateEmailAndPassword(req.body);
        await validation.compareOriginalAndVerificationPasswords(req.body);
        await registration.verifyIfUserAlreadyExists(req.body.email);
        await registration.encryptUserPassword(req.body);
        await registration.saveUserInDB(req.body);
        
        res.status(200).json(
            {
                message: "Success!",
                body: req.body
            }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
};