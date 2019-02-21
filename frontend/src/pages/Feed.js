import React, { Component } from 'react'

import Threads from "../components/thread/Threads";
import AddThreadForm from "../components/thread/AddThreadForm";
import axios from "axios";

export default class Feed extends Component {
  constructor() {
    super();

    this.onThreadSubmit = this.onThreadSubmit.bind(this);

    this.state = {
      threads: ""
    }
  }

  componentDidMount() {
    axios.get("http://localhost:4000/threads/")
      .then( response => {
        const threads = Object.values(response.data);
        this.setState({threads});
      })
      .catch(e => {
        console.log(e);
      })
  };

  onThreadSubmit(questionTitle) {
    const threads = {...this.state.threads};
    threads[Date.now()] = questionTitle;
    this.setState({threads});
  };

  render() {
    const threadsObj = this.state.threads;
    return (
      <section className="feed">
        <AddThreadForm onThreadSubmit={this.onThreadSubmit} />
        <Threads threads={threadsObj}/>
      </section>
    )
  }
}
