import React, { Component } from 'react'
import {formatDate} from "../../helpers/common";

export default class Thread extends Component {
  render() {
    
    const details = this.props.details;
    const {author,createdDate,title} = details;
    const formattedDate = formatDate(createdDate);

    return (
        <div className="row d-flex justify-content-center">
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">{author}</h5>
                        <p className="card-text">{title}</p>
                        <a className="btn btn-primary">View Answers</a>
                    </div>
                    <div className="card-footer text-muted">
                        Posted on: {formattedDate}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}