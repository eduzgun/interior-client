import React, {useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./style.css";
import { useAuth } from "../../contexts";
import axios from "axios";

const NavBar = () => {

  const { user, setUser } = useAuth();

  const activeStyle = {
    outline: "solid 2px #FAF8F2",
    backgrounColor: "var(--outline)",
  };

  const navActive = ({ isActive }) => (isActive ? activeStyle : undefined);

  function logout() {
    setUser("");
  }

  return (
    <>
      <nav className="nav-row">
        <img id="logo" src='https://res.cloudinary.com/de2nposrf/image/upload/v1697042188/static/logo.png' alt="API Image" />

        <ul>
          <li>
            <NavLink to="/" style={navActive}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" style={navActive}>
              Explore
            </NavLink>
          </li>
          <div className="generate-nav">
            {user ? (
              <li>
                <NavLink to="/generate" style={navActive}>
                  Create
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </div>
          <div className="login-nav">
            {user ? (
              <li>
                <NavLink to="/profile" style={navActive}>
                  Profile
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login" style={navActive}>
                  Login
                </NavLink>
              </li>
            )}
          </div>
          <div className="logout-nav">
            {user ? (
              <li>
                <NavLink to="/" onClick={logout}>
                  Log Out
                </NavLink>{" "}
              </li>
            ) : (
              ""
            )}
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
