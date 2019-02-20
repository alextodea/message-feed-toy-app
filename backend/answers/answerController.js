const Answer = require("./answerSchema");

exports.addAnswer = (req,res) => {
    const {content,thread_id,author_id} = req.body;
    const newAnswer = new Answer({content,thread_id,author_id});
    newAnswer.save()
        .then( savedAnswer => {
            res.status(200).json({message:"Answer added succesfully!",body:savedAnswer})
        })
        .catch(e => {
            console.error(e);
            res.status(500).json({message:"Internal error!"});
        })
}