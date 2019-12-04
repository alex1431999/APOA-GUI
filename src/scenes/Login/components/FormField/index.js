import React from 'react'

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
    apiService.login(this.state.username, this.state.password);
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

export default FormField;
