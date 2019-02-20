const Comment = require("./commentSchema");

exports.addComment = (req,res) => {
    const {author_id,thread_id,body} = req.body;
    const newComment = new Comment({body,thread_id,author_id});
    newComment.save()
        .then( savedAnswer => {
            res.status(200).json({message:"Answer added succesfully!",body:savedAnswer})
        })
        .catch(e => {
            console.error(e);
            res.status(500).json({message:"Internal error!"});
        })
}

// get comments