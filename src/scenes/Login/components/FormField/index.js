import React from 'react'
import { withRouter } from 'react-router-dom'

import notificationService from '../../../../services/notification/index'
import apiService from '../../../../services/api/index'

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputUsername = this.updateInputUsername.bind(this);
    this.updateInputPassword = this.updateInputPassword.bind(this);
  }

  handleSubmit() {
    if (this.state.username.length === 0) {
      return notificationService.display(
        'Empty Username',
        'Please enter a Username first.',
        notificationService.types.danger,
      );
    }

    if (this.state.password.length === 0) {
      return notificationService.display(
        'Empty Password',
        'Please enter a Password first.',
        notificationService.types.danger,
      );
    }

    apiService.login(this.state.username, this.state.password)
      .then(() => {
        this.props.history.push('/keywords/');
        notificationService.display(
          'Login Successful',
          'You have logged in successfully!',
          notificationService.types.default,
        );
      })
      .catch(() => {
        notificationService.display(
          'Login Failed',
          'Wrong Password/Username.',
          notificationService.types.danger,
        );
      });
  }

  updateInputUsername(event) {
    this.setState({ username: event.target.value })
  }

  updateInputPassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="FormField">
        <input type="text" placeholder="Username" onChange={this.updateInputUsername}/>
        <br/>
        <br/>
        <input type="password" placeholder="Password" onChange={this.updateInputPassword}/>
        <br/>
        <br/>
        <button className="btn btn-warning" onClick={this.handleSubmit}>Log In</button>
      </div>
    )
  }
}

export default withRouter(FormField);
