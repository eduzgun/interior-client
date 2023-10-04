import React , { useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const UserProfile = ({ user, likes, loading }) => {
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [editProfileVisible, setEditProfileVisible] = useState(false)
  const [likesVisible, setLikesVisible] = useState(true)

  const bedroomImages = [
    {id: 1, src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1', clickCount: 0 },
    {id: 2, src: '../../src/assets/environmentMaps/0/1/pz.png', alt: 'Image 1', clickCount: 0},
    {id: 3, src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1', caption: "Modern", clickCount: 0 },
    {id: 4, src: '../../src/assets/environmentMaps/bedroom/3.jpeg', alt: 'Image 1', clickCount: 0 },
     {id: 5, src: '../../src/assets/environmentMaps/bedroom/4.jpeg', alt: 'Image 1', clickCount: 0 },
    {id: 6, src: '../../src/assets/environmentMaps/bedroom/5.avif', alt: 'Image 1', clickCount: 0 },
    {id: 7, src: '../../src/assets/environmentMaps/bedroom/6.jpeg', alt: 'Image 1', clickCount: 0 },
    {id: 8, src: '../../src/assets/environmentMaps/bedroom/7.jpeg', alt: 'Image 1', clickCount: 0 },
    {id: 9, src: '../../src/assets/environmentMaps/bedroom/8.webp', alt: 'Image 1', clickCount: 0 },
    {id: 10, src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1', clickCount: 0 },
    {id: 11, src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1', clickCount: 0 },
    {id: 12, src: '../../src/assets/environmentMaps/bedroom/4.jpeg', alt: 'Image 1', clickCount: 0 },
     {id: 13, src: '../../src/assets/environmentMaps/bedroom/5.avif', alt: 'Image 1', clickCount: 0 },
    {id: 14, src: '../../src/assets/environmentMaps/bedroom/6.jpeg', alt: 'Image 1', clickCount: 0 },
    {id: 15, src: '../../src/assets/environmentMaps/bedroom/7.jpeg', alt: 'Image 1', clickCount: 0 },
    {id: 16, src: '../../src/assets/environmentMaps/bedroom/8.webp', alt: 'Image 1', clickCount: 0 },
  
    
  ];

  const likedBedrooms = likes
    ? bedroomImages.filter((image) => likes.some((like) => like.room_id === image.id))
    : [];

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
        setProfileImage(imageURL)
      }
  }

  const toggleEditProfile = () => {
    setEditProfileVisible(true);
    setLikesVisible(false);
  };

  const toggleLikes = () => {
    setEditProfileVisible(false);
    setLikesVisible(true);
  };

  return (
    <>
      {/* <div>Profile</div> */}
      <div id='profile-container'>
        {loading ? (
          <p>loading ...</p>
          ) : (
            <>
              {/* <div id="sidebar">
                
                <div 
                  role='profile-icon' 
                  id='profile-icon-container1'
                  style={{ margin: 0, padding: 0 }}
                  onClick={handleClick}
                >
                  {profileImage ? (
                    <img src={profileImage} 
                      alt='Profile' 
                      id='profile-icon' 
                      style={{ maxWidth: '8rem', maxHeight: '8rem', padding: 0 }}
                    />
                  ) : (
                    
                    <img src="src/assets/images/profile.png" id='profile-icon' style={{ borderRadius: "100%", maxWidth: '8rem', maxHeight: '8rem'}} alt="" />
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
                
                
              </div> */}
              <div id="main-content">
              <div 
                  role='profile-icon' 
                  id='profile-icon-container1'
                  style={{ margin: 0, padding: 0 }}
                  onClick={handleClick}
                >
                  {profileImage ? (
                    <img src={profileImage} 
                      alt='Profile' 
                      id='profile-icon' 
                      style={{ maxWidth: '8rem', maxHeight: '8rem', padding: 0 }}
                    />
                  ) : (
                    // <FontAwesomeIcon icon={faUser} id='profile-icon' />
                    <img src="src/assets/images/profile.png" id='profile-icon' style={{ borderRadius: "100%", maxWidth: '8rem', maxHeight: '8rem'}} alt="" />
                  )}
                    {/* <img src="src/assets/images/profile.png" alt="" /> */}


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
                <h5 id='profile-email'>Email: {user.email}</h5>
                <div style={{padding: 0, paddingTop: "40px"}} className='main-content-nav'>
                <h5 className={likesVisible ? 'active' : ''} onClick={toggleLikes} id='sidebar-likes' role='heading3'>Likes</h5>
                  <h5 className={editProfileVisible ? 'active' : ''} onClick={toggleEditProfile} id="sidebar-heading" role='heading2'>Edit Profile</h5>
                  
                </div>

                <div id="edit-profile" style={{ display: editProfileVisible ? 'block' : 'none', paddingTop: "30px" }}>
                  {/* <h3 role='heading1' id='profile-title'>Profile</h3> */}
                  <p style={{textAlign:"left"}}>Name </p>
                  <input type="text" placeholder={user.username} id="" />
                  
                  <p style={{textAlign:"left"}}>Email</p>
                  {/* <h4>{user.email}</h4> */}
                  <input type="text" placeholder={user.email} id="" /> <br></br>
                  <button>save</button>
                </div>
                
                
                <div style={{ display: likesVisible ? 'block' : 'none', paddingTop: "30px" }}>
                  {/* <h3 id='likes' role='heading4'>Likes</h3> */}
                  <div id='likes-container' style={{ display: 'flex', flexDirection: 'row', padding: "0"}}>
                    {likes == null ? (
                      <p>You have not liked any rooms.<br></br> <Link to={`/explore`}><button>Find Rooms</button></Link></p>
                    ) : (
                      likedBedrooms.map((like, index) => (
                        <Link style={{textDecoration: "none"}} key={index} to={`/studio`}>
                          <img src={like.src} className="likes-img" style={{width: "200px", height:"200px", opacity: "0.75", borderRadius: "20%", margin: "10px 20px 0 0"}} alt="" /> 
                          <p key={index} style={{ display: 'flex', flexDirection: 'column', color: "white", margin: "10px 20px 0 0", textAlign: 'center', position:"relative", bottom:"48px", backgroundColor: "hsla(257, 64%, 2%, 0.644)"}}> 
                            Room {like.id}
                          </p>
                        </Link>
                      ))
                    )}
                  </div>
                  
                </div>
                
                
              </div>

              

              
            </>
        )}
        
        
        
      </div>
    </>
  )
}

export default UserProfile