import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import App from './App'

/* Scenes */
import Login from './scenes/Login/index'
import Keywords from './scenes/Keywords/index'

import store from './store'

/* Taken from this article: https://tylermcginnis.com/react-router-protected-routes-authentication */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().authenticator.username
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const routes = (
    <Router>
      <Route path="/" component={App}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute exact path="/keywords" component={Keywords}/>
    </Router>
);

export default routes;
