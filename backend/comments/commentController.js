const Comment = require("./commentSchema");
const Thread = require("../threads/threadSchema");

exports.addComment = (req,res) => {
    const {author_id,thread_id,body} = req.body;
    const newComment = new Comment({body,thread_id,author_id});
    newComment.save()
        .then( savedComment => {
            Thread.findOne({_id:thread_id})
                .then(thread =>{
                    thread.comments.push(savedComment);
                    thread.save();
                    res.status(200).json({message:"Answer added succesfully!",body:savedComment})
                })
        })
        .catch(e => {
            console.error(e);
            res.status(500).json({message:"Internal error!"});
        })
};

exports.removeSingleComment = async (req,res) => {
    try {
        const _id = req.body._id;
        console.log(_id);
        await Comment.deleteOne({_id});
        res.status(200);
    } catch (e) {
        res.status(404).json({message:"Resource not found."});
    }
}