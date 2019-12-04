import React from 'react'
import { Link } from 'react-router-dom'

import store from '../../store'

import './styles.scss'

class Sidebar extends React.Component {
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
        <div className="Sidebar wrapper">
          <nav>
            <div className="sidebar-header">
              <h3>Menue</h3>
            </div>
            <ul className="list-unstyled components">
              <li className="active">
                <Link to="/keywords">Keywords</Link>
              </li>
            </ul>
          </nav>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default Sidebar
