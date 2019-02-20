import React, { Component } from 'react'
import ThreadDetails from "./ThreadDetails";
import ThreadTitle from "./ThreadTitle";

class Thread extends Component {
  
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <ThreadTitle question="Dummy question"/>
          <ThreadDetails author="Alex" createdDate="24th of August 2019"/>
          <a type="submit" class="btn btn-primary">Answer</a>
          <a href="#" class="btn btn-primary">View Answers</a>
        </div>
</div>
    )
  }
}

export default Thread