import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import store from '../../../../store'
import { logout } from '../../../../services/api/actions'

class UsernameDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
    }

    store.subscribe(() => {
      this.setState({
        username: store.getState().authenticator.username,
      })
    });

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    store.dispatch(logout());
    this.props.history.push('/login');
  }

  render() {
    if (this.state.username) {
      return (
        <div className="UsernameDisplay float-right">
          <span id="username">{this.state.username}</span>
          <button onClick={this.handleLogoutClick} className="btn btn-warning margin-left">Sign out</button>
        </div>
      )
    } else {
      return (
        <div className="float-right">
          <Link className="btn btn-warning" to="/login">Sign in</Link>
        </div>
      )
    }
  }
}

export default withRouter(UsernameDisplay)
