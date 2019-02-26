import React, { Component } from 'react'

import Thread from "../components/thread/Thread";
import AddThreadForm from "../components/thread/AddThreadForm";
import axios from "axios";
import {GET_THREADS, GET_SINGLE_USER,POST_THREAD,POST_DELETE_COMMENT,POST_DELETE_THREAD} from "../../src/helpers/routes";

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.onThreadSubmit = this.onThreadSubmit.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.removeThread = this.removeThread.bind(this);

    this.state = {
      threads: {},
      isLoaded:false
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(GET_THREADS);
      const threads = response.data;
      this.setState({threads});
    } catch(e) {
      console.error(e);
    }
  }
  
  async onThreadSubmit(title) {
    try {
      const threads = {...this.state.threads};
      const emailFromLocalStorage = localStorage.getItem("email");
      const FULL_URL = GET_SINGLE_USER + `?email=${emailFromLocalStorage}`;
      const response = await axios.get(FULL_URL);
      const userFromDb = response.data.user;
      const {_id,createdDate} = userFromDb;

      const postBody = {
        author:_id,
        title
      };
      
      const postResponse = await axios.post(POST_THREAD,postBody);
      const threadId = postResponse.data.body._id;

      threads[threadId] = {
        title,
        email: emailFromLocalStorage,
        createdDate,
        authorId: _id,
        _id: threadId,
        comments: []
      }

      this.setState({threads});
    } catch(e) {
      console.error(e);
    }
  }

  async removeComment(commentId,threadId) {
    const threads = {...this.state.threads};
    const targetThread = threads[threadId];
    const commentsArr = targetThread.comments;

    commentsArr.forEach(commentObj => {
      if (commentObj._id !== commentId) return
      const index = commentsArr.indexOf(commentObj);
      threads[threadId].comments.splice(index, 1);
      this.setState({threads});
    })

    const postBody = {_id:commentId}
    try {
      await axios.post(POST_DELETE_COMMENT,postBody);
    } catch(e) {
      console.error(e);
    }
  };

  async removeThread(_id) {
    const threads = {...this.state.threads};
    delete threads[_id];
    this.setState({threads});
    try {
      await axios.post(POST_DELETE_THREAD,{_id});
    } catch(e) {
      console.error(e);
    }
  }

  onCommentSubmit(commentObj){
    const threads = {...this.state.threads};
    const {author,body,createdDate,threadId,_id} = commentObj;
    threads[threadId].comments.push({_id,author,body,createdDate});
    this.setState({threads});
  }

  render() {
    return (
      <section className="feed">
        <h2 className="feed-page-title">Welcome to Feedio - Ask questions or reply to threads.</h2>
        <div className="threads-main-container">
          <AddThreadForm onThreadSubmit={this.onThreadSubmit} />
          <div className="list-of-threads">
                {
                    Object
                        .values(this.state.threads)
                        .map(obj => {
                            const key = Date.now() + obj._id;
                            return <Thread 
                                    removeThread={this.removeThread}
                                    removeComment={this.removeComment} 
                                    handleComment={this.onCommentSubmit} 
                                    key={key} 
                                    details={obj} 
                                   />
                        })
                }
            </div>
        </div>
      </section>
    )
  }
}
