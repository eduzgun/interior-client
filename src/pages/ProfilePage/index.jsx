import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { UserProfile } from '../../components';
import './profile.css'

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null)
  const [user, setUser] = useState([])
    const {id} = useParams()
    useEffect(() => {
        async function displayUser() {
            const res = await fetch(`https://lap-4-project.onrender.com/users/1`)
            const data = await res.json()
            setUser(data)
            console.log(data)
        }
        displayUser()
    }, [])

  
  return (
    <>
      <UserProfile user={user} />
    </>
    
  )
}

export default Profile