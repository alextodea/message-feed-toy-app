import React, { Component } from 'react'
import axios from "axios";
import {GET_SINGLE_USER,POST_COMMENT} from "../../helpers/routes";

export default class ThreadReplyForm extends Component {
  constructor(props) {
    super(props)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  async handleCommentSubmit(e){
    try {
        e.preventDefault();       

        const emailFromLocalStorage = localStorage.getItem("email");
        const GET_SINGLE_USER_ENDPOINT_API = GET_SINGLE_USER + `?email=${emailFromLocalStorage}`;
        const response = await axios.get(GET_SINGLE_USER_ENDPOINT_API);

        const postCommentBodyLoad = {
            body: this.comment.value,
            author_id: response.data.user._id,
            thread_id: this.props.details._id
        };
        
        const postComment = await axios.post(POST_COMMENT,postCommentBodyLoad);
        const commentCreatedDate = postComment.data.body.createdDate;

        const commentStateObj = {
            _id: postComment.data.body._id,
            author: emailFromLocalStorage,
            body: this.comment.value,
            createdDate: commentCreatedDate,
            threadId: this.props.details._id
        }

        this.props.liftCommentSubmitParams(commentStateObj);
    } catch(e) {
        console.error(e);
    }
}
  
  render() {
    return (
      <form ref={input => {this.commentForm = input}} onSubmit={this.handleCommentSubmit} className="card-footer single-thread-comment-input-wrapper">
          <div className="thread-reply-form-title">
            Write a reply:
          </div>
          <div className="thread-reply-elements-wrapper">
            <input ref={(input) => this.comment = input} type="text"/>
            <button type="submit" className="btn btn-success">Reply</button>
          </div>
      </form>
    )
  }
}
