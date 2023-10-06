import React, { useState, useEffect} from 'react'
import { useAuth } from '../../contexts';
import { useNavigate } from 'react-router-dom'
import { UserProfile } from '../../components';
import axios from "axios";
import './profile.css'

const Profile = () => {
  const { usersUsername, setUsersUsername } = useAuth()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState('')
  const [likes, setLikes] = useState(null)
  const [loading, setLoading] = useState(true);
  const [imageUrl1, setImageUrl1] = useState('');
  const [editsSaved, setEditsSaved] = useState(false)

  // const apiUrl =
  //   "https://lap-4-project.onrender.com//filestorage/static-files/profile.png"; 

  // useEffect(() => {
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       setImageUrl1(response.data.image_url);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching image:", error);
  //     });
  // }, []);

  useEffect(() => {
    async function displayUser() {
      const res = await fetch(`https://lap-4-project.onrender.com/users/name/${usersUsername}`)
      const data = await res.json()
      setUserData(data.data)

      setImageUrl1(data.data.avatar_image)

      // const res2 = await fetch(`https://lap-4-project.onrender.com/likes/user/1`)
      const res2 = await fetch(`https://lap-4-project.onrender.com/likes/user/${data.data.id}`)
      const data2 = await res2.json()
      setLikes(data2.data)
      console.log(data.data)
      setLoading(false)
    }
    displayUser()
  }, [])

  async function updateUser(newUsername, newEmail) {
    try {

      const updatedUserData = {
        username: newUsername || user.username, 
        email: newEmail || user.email,
      }

      const response = await fetch(`https://lap-4-project.onrender.com/users/name/${userData.username}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      setEditsSaved(true)
      setUsersUsername(updatedUserData.username)
      navigate('/')
      alert('Your edits have been saved!')
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const updateImage = async (newImage) => {
    try {
      const formData = new FormData();
      formData.append('file', newImage)

      const response = await fetch(`https://lap-4-project.onrender.com/filestorage/avatar-images/${userData.id}`, {
        method: 'PATCH',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        // console.log(data)
        setImageUrl1(data.image_url)
      } 
    
    } catch (error) {
      console.error('Error updating profile image:', error)
    }
  }


  return (
    <>
      <UserProfile imageUrl1={imageUrl1} updateImage={updateImage} updateUser={updateUser} loading={loading} user={userData} likes={likes} />
    </>
    
  )
}

export default Profile