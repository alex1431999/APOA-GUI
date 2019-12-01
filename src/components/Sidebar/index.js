import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
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
}

export default Sidebar
