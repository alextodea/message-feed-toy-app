import React, { Component } from 'react'
import axios from "axios";

export default class AddThreadForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onThreadSubmit(this.questionTitle.value);
        this.threadForm.reset();
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-10 col-lg-12">
                    <form ref={input => {this.threadForm = input}} className="write-thread-form" onSubmit={this.handleSubmit}>
                        <textarea ref={(input) => this.questionTitle = input} rows="2"></textarea>
                        <button type="submit">Add question</button>
                    </form>
                </div>
            </div>
        )
    }
} 
