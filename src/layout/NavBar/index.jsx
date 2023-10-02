import React, {useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./style.css";
import { useAuth } from "../../contexts";
import axios from "axios";

const NavBar = () => {
  const [imageUrl, setImageUrl] = useState("");
  const apiUrl =
    "https://lap-4-project.onrender.com//filestorage/static-files/logo.png"; 

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setImageUrl(response.data.image_url);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  const { user, setUser } = useAuth();

  const activeStyle = {
    outline: "solid 2px var(--outlinefocus)",
    backgrounColor: "var(--outline)",
  };

  const navActive = ({ isActive }) => (isActive ? activeStyle : undefined);

  function logout() {
    setUser("");
  }

  return (
    <>
      <nav className="nav-row">
        {imageUrl ? (
          <img id="logo" src={imageUrl} alt="API Image" />
        ) : (
          <p>Loading image...</p>
        )}
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
          <div className="generate-nav" >
            {user ? (
              <li >
                <NavLink to="/generate" style={navActive} >
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
                <NavLink to="/" onClick={logout} >
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
