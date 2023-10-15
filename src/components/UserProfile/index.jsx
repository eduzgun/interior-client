import React , { useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axiosInstance from '../../helpers';
import "./style.css"
import { EditOverlay, DeleteOverlay } from "../../components"

const UserProfile = ({ user, likes, loading, updateUser, imageUrl1, setImageUrl1, setRefresh }) => {
  const inputRef = useRef(null)
  // const [image, setImage] = useState(null)
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [editProfileVisible, setEditProfileVisible] = useState(false)
  const [likesVisible, setLikesVisible] = useState(true)
  const [likedRooms,setLikedRooms] = useState([])
  const [hoverImage,setHoverImage] = useState(null)

  const [imgToDelete,setImgToDelete] = useState(null)

  const [toggleDeleteBtn,setToggleDeleteBtn] = useState(false)

  async function getLikedRooms() {
    const rooms = []
    const x = await axiosInstance("/rooms").then(resp => {
      const data = resp.data.rooms
      for(let i=0;i<data.length;i++){
        if(data[i].user_id == user.id){
          rooms.push(data[i])
        }
      }
      setLikedRooms(rooms)
    })
  }

  useEffect(() => {
    getLikedRooms()
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

  const toDelete = (room) => {
    setToggleDeleteBtn(!toggleDeleteBtn)
    setImgToDelete(room)
  }

  return (
    <>
      {/* <div>Profile</div> */}
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
                    // <FontAwesomeIcon icon={faUser} id='profile-icon' />
                    <img src="https://interior-cloud-store.s3.amazonaws.com/avatar-images/profile.png" id='profile-icon' style={{ borderRadius: "100%", maxWidth: '8rem', maxHeight: '8rem'}} alt="" />
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
                
                
                <div style={{ display: likesVisible ? 'flex' : 'none', paddingTop: "30px" }}>
                  {/* <h3 id='likes' role='heading4'>Likes</h3> */}
                  <div id='likes-container' style={likedRooms.length < 1 ? {"display":"flex","alignItems":"center"} : {}}>
                    {likedRooms.length < 1
                    ? (
                      <p>You have not liked any rooms.<br></br> <Link to={`/explore`}><button>Find Rooms</button></Link></p>
                    ) 
                    : (
                      likedRooms.map((room, index) => (
                        <div className='card-wrapper'>
                          <Link 
                          className="imgs-container" 
                          style={{textDecoration: "none"}} 
                          key={index} 
                          to={`/${room.category}`}
                          onMouseEnter={() => setHoverImage(room.id)}
                          onMouseLeave={() => setHoverImage(null)}>
                            <img src={`https://res.cloudinary.com/de2nposrf/image/upload/${room.category}/${room.user_id}/${room.name}/nz.png`} className="likes-img" alt="" /> 
                            <p key={index} id='profile-imgs-text'>{room.name.split("_").join(" ")}</p>
                            
                          </Link>
                          {hoverImage == room.id && (
                            <div
                            className="config"
                            onMouseEnter={() => setHoverImage(room.id)}
                            onMouseLeave={() => setHoverImage(null)}
                            >
                              <p id="edit">⚙</p>
                              <p id='delete' onClick={() => toDelete(room)}>-</p>
                            </div>
                          )}
                        </div>
                      ))

                    )}
                      
                  </div>

                </div>
              </div>
            </>
        )}
        
      { toggleDeleteBtn
        ? <DeleteOverlay hoverImg={imgToDelete} toggle={toggleDeleteBtn} setToggle={setToggleDeleteBtn} setRefresh={setRefresh}/>
        : ""
      }
        
      </div>
    </>
  )
}

export default UserProfile