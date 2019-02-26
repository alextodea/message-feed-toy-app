const validation = require("./authentication/validation");
const login = require("./authentication/login");
const registration = require("./authentication/registration");
const User = require("./userSchema");

exports.getSingleUser = async (req,res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({email}).populate("threads").exec();
        res.status(200).json({user});
    } catch(e) {
        console.error(e);
    }
};

exports.getLogin = (req,res) => {
    res.status(200).json({message:"login page"})
};

exports.postLogin = async (req,res,next) => {
    try {
        // await validation.validateEmailAndPassword(req.body);
        const userInDb = await login.retrieveUser(req.body.email);
        await validation.compareStringAndHashPassword(req.body.password,userInDb.password);
        const token = await validation.signToken(userInDb.email);

        res.status(200).json(
            {   email: userInDb.email,
                token,
                message: "Authentication successful."
            }
        )
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
};

exports.postRegister = async (req,res) => {
    try {
        await validation.validateEmailAndPassword(req.body);
        await validation.compareOriginalAndVerificationPasswords(req.body);
        await registration.verifyIfUserAlreadyExists(req.body.email);
        await registration.encryptUserPassword(req.body);
        const userInDb = await registration.saveUserInDB(req.body);
        const token = await validation.signToken(userInDb.email);
        
        res.status(200).json(
            {   email: userInDb.email,
                token,
                message: "Authentication successful."
            }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
};