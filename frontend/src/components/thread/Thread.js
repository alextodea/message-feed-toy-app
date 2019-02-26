import React, { Component } from 'react'
import axios from "axios";

import {formatDate} from "../../helpers/common";
import {GET_SINGLE_USER,POST_COMMENT} from "../../helpers/routes";

// components
import Comment from "./Comment";

export default class Thread extends Component {
    constructor(props) {
      super(props)
      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      this.processThreadDelete = this.processThreadDelete.bind(this);
      this.processCommentDelete = this.processCommentDelete.bind(this);
    }

    processCommentDelete(commentId) {
        const threadId = this.props.details._id;
        this.props.removeComment(commentId,threadId)
    };

    processThreadDelete() {
        const threadId = this.props.details._id;
        this.props.removeThread(threadId);
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

            this.props.handleComment(commentStateObj);
        } catch(e) {
            console.error(e);
        }
    }
    
    render() {
        
        const details = this.props.details;
        const {authorEmail,createdDate,title} = details;
        const formattedDate = formatDate(createdDate);

        return (
            <div className="row d-flex justify-content-center single-thread-wrapper">
                <div className="card text-center single-thread-card">
                    <div className="card-body">
                        <h5 className="card-title">{authorEmail}</h5>
                        <p>wrote this on: {formattedDate}</p>
                        <span className="card-text">{title}</span>
                        <i className="fa fa-times" onClick={this.processThreadDelete} aria-hidden="true"></i>
                    </div>
                    <form ref={input => {this.commentForm = input}} onSubmit={this.handleCommentSubmit} className="card-footer text-muted single-thread-comment-input-wrapper">
                    <input ref={(input) => this.comment = input} type="text"/>
                        <button type="submit" className="btn btn-success">Reply</button>
                    </form>
                    <div className="card-comments-wrapper">
                        <ul className="list-group list-group-flush">
                            {
                                (details.comments && details.comments.length > 0) &&
                                    details.comments.map(obj => {
                                        console.log(obj);
                                        const key = Date.now() + obj.createdDate;
                                        return <Comment processCommentDelete={this.processCommentDelete} key={key} details={obj} />
                                    })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}