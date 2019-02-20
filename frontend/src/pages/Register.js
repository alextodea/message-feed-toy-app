import React, { Component } from 'react'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email:"",
      password:"",
      verificationPassword:""
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Register