const Thread = require("./threadSchema");
const User = require("../users/userSchema");

exports.getThreads = (req,res) => {
    Thread.find({})
    .populate("author")
        .then( threadsArr => {
            const responseObj = {};

            threadsArr.forEach(threadObj => {
                const email = threadObj.author.email;
                const {_id,title,createdDate} = threadObj;
                responseObj[_id] = {email,title,createdDate}
            })
            
            res.status(200).json(responseObj);
        })
        .catch(e => {
            console.error(e);
            res.status(500).json({message:"Internal error!"});
        })
};

exports.addThread = (req,res) => {
    const {title,author} = req.body;
    const newThread = new Thread({title,author});
    newThread.save()
        .then( savedThread => {
            User.findOne({_id:author})
                .then( user => {
                    user.threads.push(savedThread)
                    user.save();
                    res.status(200).json({message:"Thread added succesfully!",body:savedThread})
                })
        })
        .catch(e => {
            console.error(e);
            res.status(500).json({message:"Internal error!"});
        })
};