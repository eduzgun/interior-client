import React from 'react'
import { NavLink, Outlet } from "react-router-dom"
import "./style.css"
import { useAuth } from '../../contexts'

const NavBar = () => {

  const { user,setUser } = useAuth()

  const activeStyle = {
    "outline": "solid 2px var(--outlinefocus)",
    "backgrounColor": "var(--outline)"
  }

  const navActive = ({isActive}) => (isActive ? activeStyle : undefined)

  function logout(){
    setUser("")
  } 

  return (
    <>
        <nav className='nav-row'>
            <img src="./src/assets/images/logo3.png" alt="logo" id='logo' />
            <ul>
                <li><NavLink to="/" style={navActive}>Home</NavLink></li>
                <li><NavLink to="/explore" style={navActive}>Explore</NavLink></li>
                <div className="generate-nav">
                  {user
                  ? <li><NavLink to="/generate" style={navActive}>Create</NavLink></li>
                  : ""
                }
                </div>
                <div className="login-nav">
                
                  {user 
                    ? <li><NavLink to="/profile" style={navActive}>Profile</NavLink></li>
                    : <li><NavLink to="/login" style={navActive}>Login</NavLink></li>
                  }
                </div>
                <div className="logout-nav">
                  {user
                  ? <li><NavLink to="/" onClick={logout}>Log Out</NavLink> </li>
                  : ""}
                </div>
            </ul>
        </nav>
        <Outlet />
    </>
  )
}

export default NavBar
