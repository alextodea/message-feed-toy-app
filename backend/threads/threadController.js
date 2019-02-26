const Thread = require("./threadSchema");
const User = require("../users/userSchema");

exports.getThreads = async (req,res) => {
    try {
        let obj = {};
        
        const populateQuery = {
            path: "author comments",
            populate: { path: "author_id" }
        }

        const threads = await Thread.find({}).populate(populateQuery).sort({createdDate:-1});
        threads.forEach(thread=> {
            const {_id,createdDate,title,comments} = thread;
            const authorEmail = thread.author.email
            obj[_id] = {title,createdDate,authorEmail,comments,_id};

            if (comments === undefined || comments.length === 0) return
            const mappedComments = thread.comments.map(comment => (
                {
                    _id: comment._id,
                    author: comment.author_id.email,
                    body: comment.body,
                    createdDate: comment.createdDate
                }
            ));

            obj[_id]["comments"] = mappedComments;
        })

        res.status(200).json(obj);
    } catch(e) {
        res.status(500).json({message:"Internal error!"});
    }
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

exports.getSingleThread = async (req,res) => {
    try {
        const _id = req.query._id;
        const thread = await Thread.findOne({_id});
        res.status(200).json({thread});
    } catch(e) {
        console.error(e);
    }
}

exports.removeSingleThread = async (req,res) => {
    try {
        const _id = req.body._id;
        await Thread.findOneAndDelete({_id});
        res.status(200);
    } catch (e) {
        res.status(404).json({message:"Resource not found."});
    }
}