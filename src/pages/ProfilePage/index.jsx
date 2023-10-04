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
  const [imageUrl1, setImageUrl1] = useState("");
  const [editsSaved, setEditsSaved] = useState(false)

  const apiUrl =
    "https://lap-4-project.onrender.com//filestorage/static-files/profile.png"; 

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setImageUrl1(response.data.image_url);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  useEffect(() => {
    async function displayUser() {
      const res = await fetch(`http://localhost:5000/users/name/${usersUsername}`)
      const data = await res.json()
      setUserData(data.data)

      // const res2 = await fetch(`http://localhost:5000/likes/user/1`)
      const res2 = await fetch(`http://localhost:5000/likes/user/${data.data.id}`)
      const data2 = await res2.json()
      setLikes(data2.data)
      
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

      const response = await fetch(`http://localhost:5000/users/name/${userData.username}`, {
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


  return (
    <>
      <UserProfile imageUrl1={imageUrl1} updateUser={updateUser} loading={loading} user={userData} likes={likes} />
    </>
    
  )
}

export default Profile