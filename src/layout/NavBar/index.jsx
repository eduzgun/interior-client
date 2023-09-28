import React from 'react'
import { NavLink, Outlet } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import "./style.css"

const NavBar = () => {

  const activeStyle = {
    "outline": "solid 2px var(--outlinefocus)",
    "backgrounColor": "var(--outline)"
  }

  const navActive = ({isActive}) => (isActive ? activeStyle : undefined)

  return (
    <>
        <nav className='nav-row'>
            <img src="./src/assets/images/logo3.png" alt="logo" id='logo' />
            <ul>
                <li><NavLink to="/" style={navActive}>Home</NavLink></li>
                <li><NavLink to="/explore" style={navActive}>Explore</NavLink></li>
                <li><NavLink to="/login" style={navActive}>Login</NavLink></li>
                <li><NavLink to="/profile" style={navActive}>Profile</NavLink></li>
            </ul>
            
        </nav>
        <Outlet />
    </>
  )
}

export default NavBar
