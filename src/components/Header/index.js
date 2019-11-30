import React from 'react'
import {
  Link
} from 'react-router-dom'

import './styles.scss'

import UsernameDisplay from './components/UsernameDisplay/index'

function Header() {
  return (
    <div className="Header">
      <nav className="float-left">
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/Login">Login</Link>
      </nav>
      <UsernameDisplay className="float-right"/>
    </div>
  )
}

export default Header;
