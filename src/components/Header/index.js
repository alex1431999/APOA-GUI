import React from 'react'
import {
  Link
} from 'react-router-dom'

import './styles.scss'

import UsernameDisplay from './components/UsernameDisplay/index'

const pathsExcluded = [
  RegExp('/keywords/.*/graph'),
]

function Header() {
  const pathName = window.location.pathname;

  for (let i = 0; i < pathsExcluded.length; i += 1) {
    const path = pathsExcluded[i];

    if (pathName.match(path)) {
      return null;
    }
  }

  return (
    <div className="Header">
      <Link to="/">
        <img alt="logo" width="7%" height="7%" src={require("../../logo.png")}></img>
      </Link>
      <UsernameDisplay/>
    </div>
  )
}

export default Header;
