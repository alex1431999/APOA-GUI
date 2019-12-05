import React from 'react'
import {
  Link
} from 'react-router-dom'

import './styles.scss'

import UsernameDisplay from './components/UsernameDisplay/index'

function Header() {
  return (
    <div className="Header">
      <Link className="btn btn-warning header-center" to="/">Home</Link>
      <UsernameDisplay/>
    </div>
  )
}

export default Header;
