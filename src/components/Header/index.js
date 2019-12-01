import React from 'react'
import {
  Link
} from 'react-router-dom'

import './styles.scss'

import UsernameDisplay from './components/UsernameDisplay/index'

function Header() {
  return (
    <div className="Header">
      <UsernameDisplay/>
      <Link className="header-link btn btn-primary" to="/">Home</Link>
      <Link className="header-link btn btn-primary" to="/Login">Login</Link>
    </div>
  )
}

export default Header;
