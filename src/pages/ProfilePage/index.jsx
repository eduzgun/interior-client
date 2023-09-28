import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './profile.css'

const Profile = () => {
  return (
    <>
      {/* <div>Profile</div> */}
      <div id='container'>
        <div id="sidebar">
          <a  id="sidebar-heading"href="#profile-title"><h5 role='heading2'>Profile</h5></a>
          <a id='sidebar-likes' href="#likes"><h5 role='heading3'>Likes</h5></a>
          
        </div>
        <div id="main-content">
          <h2 role='heading1' id='profile-title'>Profile</h2>
          <h3>Name</h3>
          <input type="text" placeholder='Name' id="" />
          <h3>Username</h3>
          <input type="text" placeholder='Username' id="" />
          <h3 id='likes' role='heading4'>Likes</h3>
          
        </div>
        <div role='profile-icon' id='profile-icon-container'>
          <FontAwesomeIcon id='profile-icon'  icon={faUser} />
        </div>
        
      </div>
    </>
    
  )
}

export default Profile