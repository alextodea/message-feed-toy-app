const Thread = require("./threadSchema");
const User = require("../users/userSchema");
const Comment = require("../comments/commentSchema");

exports.getThreads = async (req,res) => {
    const obj = {};
    const threads = await Thread.find({}).populate("author").sort({createdDate:-1})
    threads.forEach(async thread => {
        obj[thread._id] = {
            author: thread.author.email,
            title: thread.title,
            createdDate: thread.createdDate,
        }
        if (thread.comments === undefined || thread.comments.length === 0) return
        obj[thread._id]["comments"] = [];
        const threadComments = await Comment.find({'_id': { $in: thread.comments}}).populate("author_id thread_id");
        obj[thread._id].comments.push("Sss")
    })
    res.status(500).json({message:"Internal error!"});

    //// vezi dc nu se pushuiesc comentariile in obiect
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