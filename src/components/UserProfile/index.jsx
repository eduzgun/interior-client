import React , { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const UserProfile = ({ user, likes, loading }) => {
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage')
    if (storedImage) {
      setImage(storedImage)
    }
  }, []);

  const handleClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
      if (selectedImage) {
        const imageURL = URL.createObjectURL(selectedImage)
        setImage(imageURL)
        localStorage.setItem('profileImage', imageURL)
      }
  }
  return (
    <>
      {/* <div>Profile</div> */}
      <div id='container'>
        {loading ? (
          <p>loading ...</p>
          ) : (
            <>
              <div id="sidebar">
                <div 
                  role='profile-icon' 
                  id='profile-icon-container1'
                  onClick={handleClick}
                >
                  {image ? (
                    <img src={image} 
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
                  style={{display: "none"}}
                  ref={inputRef}
                  onChange={
                    handleImageChange
                  }
                />
                <label id="edit-image" htmlFor="profile-icon-container1">Edit</label>
                
                </div>

                <h4>{user.username}</h4>
                <h5>Email: {user.email}</h5>
                {/* <a  id="sidebar-heading"href="#profile-title"><h5 role='heading2'>Profile</h5></a>
                <a id='sidebar-likes' href="#likes"><h5 role='heading3'>Likes</h5></a> */}
                
              </div>
              <div id="main-content">
                <h2 role='heading1' id='profile-title'>Profile</h2>
                {/* <h3>Name </h3>
                <input type="text" placeholder='Name' id="" /> */}
                <h3>Hello, {user.username}</h3>
                
                <h3>Email</h3>
                <h4>{user.email}</h4>
                {/* <input type="text" placeholder='Username' id="" /> */}
                <h3 id='likes' role='heading4'>Likes</h3>
                {likes == null ? (
                  <p>You have not liked any rooms. Find rooms <Link to={`/explore`}>here</Link>.</p>
                ) : (
                  likes.map((like, index) => (
                    <p key={index}>Room {like.room_id}</p>
                  ))
                  
                )}
              </div>

              

              
            </>
        )}
        
        
        
      </div>
    </>
  )
}

export default UserProfile