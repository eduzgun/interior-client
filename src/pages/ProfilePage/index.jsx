import React, { useState, useEffect} from 'react'
import { useAuth } from '../../contexts';
import { UserProfile } from '../../components';
import './profile.css'

const Profile = () => {
  const { usersUsername } = useAuth()
  const { user } = useAuth()

  const [userData, setUserData] = useState('')
  const [likes, setLikes] = useState(null)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      async function displayUser() {
          const res = await fetch(`https://lap-4-project.onrender.com/users/${usersUsername}`)
          const data = await res.json()
          setUserData(data.data)

          // const res2 = await fetch(`https://lap-4-project.onrender.com/likes/user/1`)
          const res2 = await fetch(`https://lap-4-project.onrender.com/likes/user/${data.data.id}`)
          const data2 = await res2.json()
          setLikes(data2.data)
          
          setLoading(false)
      }
      displayUser()
  }, [])

  return (
    <>
      <UserProfile loading={loading} user={userData} likes={likes} />
    </>
    
  )
}

export default Profile