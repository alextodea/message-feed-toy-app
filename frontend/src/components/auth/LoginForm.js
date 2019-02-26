import React, { Component } from 'react';
import axios from "axios";
import { Redirect} from "react-router-dom";

import * as ROUTES from "../../helpers/routes";
import AuthorFormTitle from "./shared/AuthFormTitle";
import EmailFormGroup from "./shared/EmailFormGroup";
import PasswordFormGroup from "./shared/PasswordFormGroup"
import AuthenticateButton from "./shared/AuthenticateButton"
import LoginFormFooter from "./shared/LoginFormFooter";
import DisplayErrorMessageDiv from "./shared/DisplayErrorMessageDiv";

export default class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email:"",
      password:"",
      token:"",
      formTitle: "Log in",
      error: {
        exists:false,
        message:""
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value})
  };

  async handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const {email,password} = this.state;
      const postBody = {email,password};
      const postCredentials = await axios.post(ROUTES.POST_LOG_IN,postBody);
      const responseData = postCredentials.data;

      localStorage.setItem("email",responseData.email);
      localStorage.setItem("token",responseData.token);

      this.props.authenticateUser();

    } catch(e) {
      const errorMsg = e.response.data.message;
      this.setState({
        error: {
          exists:true,
          message:errorMsg
        }
      })
    }
  }
  
  
  render() {
    if (this.props.state.isLoggedIn) return <Redirect to="/"/>
    
    let displayErrorMsg;
    if (this.state.error.exists) {
      displayErrorMsg = <DisplayErrorMessageDiv errorMessage={this.state.error.message} />
    }

    return (
      <div className="authentication-section">
        <div className="card">
            <AuthorFormTitle title={this.state.formTitle} />
            <div className="card-body">
              <form onSubmit={this.handleLoginSubmit}>
                <EmailFormGroup handleInputChange={this.handleInputChange}/>
                <PasswordFormGroup handleInputChange={this.handleInputChange}/>
                <AuthenticateButton authBtnText={this.state.formTitle} />
              </form>
              {displayErrorMsg}            
            </div>
            <LoginFormFooter/>
		      </div>
      </div>
    )
  }
}