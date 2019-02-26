import React, { Component } from 'react'
import ThreadsList from "../components/thread/ThreadsList";
import AddThreadForm from "../components/thread/AddThreadForm";
import axios from "axios";
import * as ROUTES from "../../src/helpers/routes";
import GreetingMsg from "../components/shared/GreetingMsg";

import {saveThreadInDb} from "../helpers/common";

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.onThreadSubmit = this.onThreadSubmit.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.removeThread = this.removeThread.bind(this);

    this.state = {
      threads: {},
      isLoaded:false
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(ROUTES.GET_THREADS);
      const threads = response.data;
      this.setState({threads});
    } catch(e) {
      console.error(e);
    }
  }
  
  async onThreadSubmit(title) {
    try {
      const postResponse = await saveThreadInDb(title);
      const {_id,author,authorEmail,comments,createdDate} = postResponse;

      const threads = {...this.state.threads};
      threads[_id] = {
        title,
        authorEmail,
        createdDate,
        authorId: author,
        _id,
        comments
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
      await axios.post(ROUTES.POST_DELETE_COMMENT,postBody);
    } catch(e) {
      console.error(e);
    }
  };

  async removeThread(_id) {
    try {
      const threads = {...this.state.threads};
      delete threads[_id];
      this.setState({threads});
      await axios.post(ROUTES.POST_DELETE_THREAD,{_id});
    } catch(e) {
      console.error(e);
    }
  }

  handleComment(commentObj){
    const threads = {...this.state.threads};
    const {author,body,createdDate,threadId,_id} = commentObj;
    threads[threadId].comments.push({_id,author,body,createdDate});
    this.setState({threads});
  }

  render() {
    const loggedInUser = localStorage.getItem("email");
    return (
      <section className="feed">
        <GreetingMsg userEmail={loggedInUser}/>
        <div className="threads-main-container">
          <AddThreadForm onThreadSubmit={this.onThreadSubmit} />
          <ThreadsList 
            removeThread={this.removeThread}
            removeComment={this.removeComment} 
            handleComment={this.handleComment} 
            details={this.state.threads} 
          />
        </div>
      </section>
    )
  }
}
