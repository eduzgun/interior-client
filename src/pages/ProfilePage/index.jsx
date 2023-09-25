import React from 'react'
import './profile.css'

const Profile = () => {
  return (
    <>
      {/* <div>Profile</div> */}
      <div id='container'>
        <div id="sidebar">
          <h5>Profile</h5>
          <a id='sidebar-likes' href="#likes"><h5 >Likes</h5></a>
        </div>
        <div id="main-content">
          <h2>Profile</h2>
          <h3>Name</h3>
          <input type="text" placeholder='Name' id="" />
          <h3>Username</h3>
          <input type="text" placeholder='Username' id="" />
          <h3 id='likes'>Likes</h3>
        </div>
      </div>
    </>
    
  )
}

export default Profile