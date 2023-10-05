import React, {useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./style.css";
import { useAuth } from "../../contexts";
import axios from "axios";

const NavBar = () => {

  const { user, setUser } = useAuth();

  const activeStyle = {
    outline: "solid 2px #3E8989",
    backgrounColor: "var(--outline)",
  };

  const navActive = ({ isActive }) => (isActive ? activeStyle : undefined);

  function logout() {
    setUser("");
  }

  return (
    <>
      <nav className="nav-row">

        <img id="logo" src='https://interior-cloud-store.s3.amazonaws.com/images/logo.png' alt="API Image" />

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
