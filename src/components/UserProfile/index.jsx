import React , { useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axiosInstance from '../../helpers';

const UserProfile = ({ user, likes, loading, updateUser, imageUrl1, setImageUrl1 }) => {
  const inputRef = useRef(null)
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [editProfileVisible, setEditProfileVisible] = useState(false)
  const [likesVisible, setLikesVisible] = useState(true)
  const [likedRooms, setLikedRooms] = useState([])

  const bedroomImages = [
    { id: 1, src: 'https://interior-cloud-store.s3.eu-central-1.amazonaws.com/room-images/bedroom/1.png', alt: 'Image 1', clickCount: 0 },
   { id: 2, src: 'https://interior-cloud-store.s3.eu-central-1.amazonaws.com/room-images/bedroom/2.png', alt: 'Image 2', clickCount: 0},
  { id: 3, src: 'https://interior-cloud-store.s3.eu-central-1.amazonaws.com/room-images/bedroom/3.png', alt: 'Image 3', clickCount: 0 },
  { id: 4, src: 'https://interior-cloud-store.s3.eu-central-1.amazonaws.com/room-images/bedroom/4.png', alt: 'Image 4', clickCount: 0 },
  { id: 5, src: 'https://interior-cloud-store.s3.eu-central-1.amazonaws.com/room-images/bedroom/5.png', alt: 'Image 5', clickCount: 0 },
  ];

  const generateRandomNumber = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
    }
    return Math.abs(hash) % bedroomImages.length;
  }

  const likedBedrooms = likes
    ? likes.map((like) => {
        const randomIndex = generateRandomNumber(like.room_id.toString());
        const likedBedroom = bedroomImages[randomIndex];
        return likedBedroom;
      })
    : []

  useEffect(() => {
  }, []);

  useEffect(() => {
    const fetchLikedRooms = async () => {
      if (likes && likes.length > 0) {
        const roomIds = likes.map((like) => like.room_id);
        try {
          const response = await axiosInstance.get('/rooms');
          const allRooms = response.data.rooms;
          const likedRoomNames = allRooms.filter((room) => roomIds.includes(room.id)).map((room) => room.name);
          console.log(likedRoomNames)
          setLikedRooms(likedRoomNames);
        } catch (error) {
          console.error('Error fetching room data:', error);
        }
      }
    };

    fetchLikedRooms();
  }, [likes]);

  const handleClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const formData = new FormData()
    formData.append(`file`, selectedImage)
      if (selectedImage) {
        if(user.avatar_image == "https://interior-cloud-store.s3.amazonaws.com/avatar-images/profile.png") {
          axiosInstance.post(`/filestorage/avatar-images/${user.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(() => {
            setImageUrl1(`https://interior-cloud-store.s3.amazonaws.com/avatar-images/${user.id}.${selectedImage.name.split('.')[1]}`);
          })
          .catch((error) => {
            console.error("Error fetching image:", error);
          });
        } else {
          axiosInstance.patch(`/filestorage/avatar-images/${user.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(() => {
            setImageUrl1(`https://interior-cloud-store.s3.amazonaws.com/avatar-images/${user.id}.${selectedImage.name.split('.')[1]}`);
          })
          .catch((error) => {
            console.error("Error fetching image:", error);
          });
        }
        
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
      <div id='profile-container'>
        {loading ? (
          <p>loading ...</p>
          ) : (
            <>
              
              <div id="main-content">
              <div 
                  role='profile-icon' 
                  id='profile-icon-container1'
                  style={{ margin: 0, padding: 0 }}
                  onClick={handleClick}
                >
                  {imageUrl1 ? (
                    <img src={imageUrl1} 
                      alt='Profile' 
                      id='profile-icon' 
                      style={{ maxWidth: '8rem', maxHeight: '8rem', padding: 0 }}
                    />
                  ) : (
                    <img src="https://interior-cloud-store.s3.amazonaws.com/avatar-images/profile.png" id='profile-icon' style={{ borderRadius: "100%", maxWidth: '8rem', maxHeight: '8rem'}} alt="" />
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
                <h5 id='profile-email'>Email: {user.email}</h5>
                <div style={{padding: 0, paddingTop: "40px"}} className='main-content-nav'>
                  <h5 className={likesVisible ? 'active' : ''} onClick={toggleLikes} id='sidebar-likes' role='heading3'>Likes</h5>
                  <h5 className={editProfileVisible ? 'active' : ''} onClick={toggleEditProfile} id="sidebar-heading" role='heading2'>Edit Profile</h5>
                  
                </div>

                <div id="edit-profile" style={{ display: editProfileVisible ? 'block' : 'none', paddingTop: "30px" }}>
                  <p style={{textAlign:"left"}}>Username </p>
                  <input 
                    type="text" 
                    placeholder={user.username} 
                    id="" 
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  
                  <p style={{textAlign:"left"}}>Email</p>
                  <input 
                    type="text" 
                    placeholder={user.email} 
                    id="" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  /> 
                  <br></br>
                  <button
                    onClick={() => updateUser(newUsername, newEmail)}
                  >save
                  </button>
                </div>
                
                
                <div style={{ display: likesVisible ? 'block' : 'none', paddingTop: "30px" }}>
                  {/* <h3 id='likes' role='heading4'>Likes</h3> */}
                  <div id='likes-container' style={{ display: 'flex', flexDirection: 'row', padding: "0"}}>
                    {likes == null ? (
                      <p>You have not liked any rooms.<br></br> <Link to={`/explore`}><button>Find Rooms</button></Link></p>
                    ) : (
                      likedBedrooms.map((like, index) => (
                        <Link id="imgs-container" style={{textDecoration: "none"}} key={index} to={`/studio`}>
                          <img src={like.src} className="likes-img" id='profile-imgs'  alt="" /> 
                          <p key={index} id='profile-imgs-text' > 
                            {likedRooms[index] ? (likedRooms[index].length > 10 ? likedRooms[index].substring(0, 10) + '...' : likedRooms[index]) : 'Unknown Room'}

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