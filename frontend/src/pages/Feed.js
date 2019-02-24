import React, { Component } from 'react'

import Threads from "../components/thread/Threads";
import AddThreadForm from "../components/thread/AddThreadForm";
import axios from "axios";
import {GET_THREADS, GET_SINGLE_USER,POST_THREAD} from "../../src/helpers/routes";

export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.onThreadSubmit = this.onThreadSubmit.bind(this);

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
      
      await axios.post(POST_THREAD,postBody);
      
      threads[_id] = {
        title,
        email:emailFromLocalStorage,
        createdDate
      }

      this.setState({threads});
    } catch(e) {
      console.error(e);
    }
  };

  render() {
    return (
      <section className="feed">
        <AddThreadForm onThreadSubmit={this.onThreadSubmit} />
        <Threads threads={this.state.threads}/>
      </section>
    )
  }
}
