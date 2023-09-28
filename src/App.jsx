import React,{ useState,useEffect } from 'react'
import * as Pages from './pages';
// import { Login } from "./pages"
import { NavBar } from './layout'
import { Routes, Route } from "react-router-dom"
import "./App.css"
import axios from 'axios';
import { useAuth } from './contexts';
import ProtectedRoute from './routes';

export default function App() {

  const { user } = useAuth()

  const handleRefresh = async () => {
    try {

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(!user){
      handleRefresh()
    }
  },[user])

  return (
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route index element={<Pages.Home/>}/>
          <Route path='Explore' element={<Pages.Explore/>}/>
          <Route path='bedroom' element={<Pages.Bedroom/>}/>
          <Route path='studio' element={<Pages.Studio/>}/>
          <Route path='kitchen' element={<Pages.Kitchen/>}/>
          <Route path='bathroom' element={<Pages.Bathroom/>}/>
          <Route path='garden' element={<Pages.Garden/>}/>
          <Route path='living' element={<Pages.Living/>}/>
          <Route path='Login' element={<Pages.Login />}/>
          <Route path="generate" element={ <Pages.GenerateRoom /> }/>
          <Route path='*' element={<Pages.NotFound/>}/>
          <Route path='profile' element={<ProtectedRoute redirectTo="/Login" />}>
            <Route index element={<Pages.ProfilePage/>} />
          </Route>
        </Route>
      </Routes>

  )
}
