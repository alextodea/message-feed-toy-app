const Thread = require("./threadSchema");
const User = require("../users/userSchema");
const Comment = require("../comments/commentSchema");

exports.getThreads = async (req,res) => {
    try {
        let obj = {};
        
        const populateQuery = {
            path: "author comments",
            populate: { path: "author_id" }
        }

        const threads = await Thread.find({}).populate(populateQuery).sort({createdDate:-1});
        threads.forEach(thread=> {
            const {_id,createdDate,title} = thread;
            const authorEmail = thread.author.email
            obj[_id] = {title,createdDate,authorEmail}
            if (thread.comments === undefined || thread.comments.length === 0) return

            const mappedComments = thread.comments.map(comment => (
                {
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