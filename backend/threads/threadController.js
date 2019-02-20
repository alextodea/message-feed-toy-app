const Thread = require("./threadSchema");

exports.getThreads = (req,res) => {
    Thread.find({})
    .populate("author_id")
        .then( threadsArr => {
            res.status(200).json(threadsArr);
        })
        .catch(e => {
            console.error(e);
            res.status(500).json({message:"Internal error!"});
        })
};

exports.addThread = (req,res) => {
    const {title,author_id} = req.body;
    const newThread = new Thread({title,author_id});
    newThread.save()
        .then( savedThread => {
            res.status(200).json({message:"Thread added succesfully!",body:savedThread})
        })
        .catch(e => {
            console.error(e);
            res.status(500).json({message:"Internal error!"});
        })
};