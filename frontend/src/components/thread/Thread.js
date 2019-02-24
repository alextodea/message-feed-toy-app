import React, { Component } from 'react'
import {formatDate} from "../../helpers/common";

export default class Thread extends Component {
    constructor(props) {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const comment = this.comment.value;
        this.props.handleComment(comment);
        this.commentForm.reset();
    }
    
    render() {
        
        const details = this.props.details;
        const {email,createdDate,title} = details;
        const formattedDate = formatDate(createdDate);

        return (
            <div className="row d-flex justify-content-center single-thread-wrapper">
                <div className="card text-center single-thread-card">
                    <div className="card-body">
                        <h5 className="card-title">{email}</h5>
                        <p className="card-text">{title}</p>
                        Posted on: {formattedDate}
                    </div>
                    <form ref={input => {this.commentForm = input}} onSubmit={this.handleSubmit} className="card-footer text-muted single-thread-comment-input-wrapper">
                    <input ref={(input) => this.comment = input} type="text"/>
                        <button type="submit" className="btn btn-success">Reply</button>
                    </form>
                </div>
            </div>
        )
    }
}