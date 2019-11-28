import React from 'react'
import {
  Link
} from 'react-router-dom'

import './styles.scss'

function Header() {
  return (
    <div className="Header">
      <nav>
        <Link className="Header-Link" to="/">Home</Link>
        <Link className="Header-Link" to="/Login">Login</Link>
      </nav>
    </div>
  )
}

export default Header;
