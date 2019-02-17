const User = require("./userSchema");
const {sanitizeInputs,inputsValidation} = require("./userAuth");

exports.listUsers = (req,res) => {
    res.status(200).json({"message":"List all users"});
};

exports.loginUser = (req,res) => {
    res.status(200).json({"message":"User logged in"});
};

exports.registerUser = async (req,res) => {

    try {
        await inputsValidation(req.body);
        const user = await User.findOne({email:req.body.email});
        if (user) {throw new Error("User already exists in db")};

        res.status(200).json(req.body)
    } catch (errorsArray) {
        console.log(errorsArray)
        res.status(500).json({"errors": errorsArray})
    }

    // const queryUsername = {username: req.body.username};
    // User.findOne(queryUsername)
    //     .then(existentUser => {
    //         if (existentUser) {return res.status(409).json({"message": "Username or e-mail already exists!"})};


    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(500).json({"message":"Error processing user registration."})
    //     });
};