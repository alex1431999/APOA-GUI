import React from 'react'

import store from '../../../../store'

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
  }

  render() {
    if (this.state.username) {
      return (
        <div className="UsernameDisplay float-right h3">
          <span>{this.state.username}</span>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default UsernameDisplay
