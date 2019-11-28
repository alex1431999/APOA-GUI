import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './scenes/Login/index'
import App from './App'

const routes = (
    <Router>
      <Route path="/" component={App}/>
      <Route path="/login" component={Login}/>
    </Router>
);

export default routes;
