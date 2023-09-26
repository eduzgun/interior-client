import React from "react";
import { useLocation, Link } from "react-router-dom";
import './NotFound.css'


const NotFound = () => {
 
  const location = useLocation();

  return (
    <>
    
    <h1 id="h1" >Page <span id="location">{location.pathname}</span> not found
      </h1>
      <Link to="/" id="location"> Home Page &rarr;</Link>
    </>
  )
};

export default NotFound;
