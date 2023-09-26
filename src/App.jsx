import React from 'react'
import * as Pages from './pages';
// import { Login } from "./pages"
import { NavBar } from './layout'
import { Routes, Route } from "react-router-dom"
import "./App.css"


export default function App() {

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route index element={<Pages.Home/>}/>
          <Route path='Explore' element={<Pages.Explore/>}/>
          <Route path='bedroom' element={<Pages.Bedroom/>}/>
          <Route path='Login' element={<Pages.Login/>}/>
          <Route path='*' element={<Pages.NotFound/>}/>
          <Route path='/profile' element={<Pages.ProfilePage/>} />
        </Route>
      </Routes>

    </div>

  )
}
