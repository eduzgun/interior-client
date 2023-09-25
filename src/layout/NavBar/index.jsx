import React from 'react'
import { NavLink, Outlet } from "react-router-dom"
import "./style.css"

const NavBar = () => {

  const activeStyle = {
    "outline": "solid 2px var(--outlinefocus)",
    "background-color": "var(--outline)"
  }

  const navActive = ({isActive}) => (isActive ? activeStyle : undefined)

  return (
    <>
        <nav className='nav-row'>
            <h2>LOGO</h2>
            <ul>
                <li><NavLink to="/" style={navActive}>Home</NavLink></li>
                <li><NavLink to="/rooms" style={navActive}>Rooms</NavLink></li>
                <li><NavLink to="/login" style={navActive}>Login</NavLink></li>
            </ul>
        </nav>
        <Outlet />
    </>
  )
}

export default NavBar