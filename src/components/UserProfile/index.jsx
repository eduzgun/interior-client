import React , { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserProfile = ({ user }) => {
  const [profileImage, setProfileImage] = useState(null)
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
          {/* <h3>Name </h3>
          <input type="text" placeholder='Name' id="" /> */}
          <h3>Username</h3>
          <h4>{user.data.username}</h4>
          <h3>Email</h3>
          <h4>{user.data.email}</h4>
          <input type="text" placeholder='Username' id="" />
          <h3 id='likes' role='heading4'>Likes</h3>
          
        </div>

        

        <div role='profile-icon' id='profile-icon-container'>
          {profileImage ? (
            <img src={profileImage} 
              alt='Profile' 
              id='profile-icon' 
              style={{ maxWidth: '8rem', maxHeight: '8rem', padding: 0 }}
            />
          ) : (
            <FontAwesomeIcon icon={faUser} id='profile-icon' />
          )}


          <input
          type='file'
          accept='image/*'
          placeholder='Edit'
          onChange={(e) => {
            const selectedImage = e.target.files[0];
            if (selectedImage) {
              const imageURL = URL.createObjectURL(selectedImage);
              setProfileImage(imageURL);
            }
          }}
        />
        </div>
        
        
      </div>
    </>
  )
}

export default UserProfile