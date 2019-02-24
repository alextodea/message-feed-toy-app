import React from 'react'
import { Route, Redirect} from "react-router-dom";
import { LOG_IN } from "../../helpers/routes";

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (
      isLoggedIn === true
      ? <Component {...props} {...rest} />
      : <Redirect to={LOG_IN}/>
  )} />
);

export default ProtectedRoute