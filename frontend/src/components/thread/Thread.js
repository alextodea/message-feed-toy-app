import React, { Component } from 'react'

// components
import CommentsList from "./CommentsList";
import ThreadReplyForm from "./ThreadReplyForm";
import ThreadBody from "./ThreadBody";

export default class Thread extends Component {
    constructor(props) {
      super(props)
      this.liftCommentSubmitParams = this.liftCommentSubmitParams.bind(this);
      this.liftUpCommentDeleteParams = this.liftUpCommentDeleteParams.bind(this);
      this.liftUpThreadDeleteParam = this.liftUpThreadDeleteParam.bind(this); 
    }

    liftUpCommentDeleteParams(commentId,threadId) {
        this.props.liftToRemoveComment(commentId,threadId);
    }

    liftUpThreadDeleteParam(threadId) {
        this.props.liftToRemoveThread(threadId);
    }

    liftCommentSubmitParams(commentStateObj) {
        this.props.liftToHandleComment(commentStateObj);
    }
    
    render() {

        return (
            <div className="card single-thread-card">
                <ThreadBody liftUpThreadDeleteParam={this.liftUpThreadDeleteParam} details={this.props.details}/>
                <ThreadReplyForm liftCommentSubmitParams={this.liftCommentSubmitParams} details={this.props.details}/>
                <CommentsList liftUpCommentDeleteParams={this.liftUpCommentDeleteParams} details={this.props.details}/>
            </div>
        )
    }
}