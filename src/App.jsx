import React from 'react'
import { Login } from "./pages"
import { NavBar } from './layout'
import { Routes, Route } from "react-router-dom"
import * as Pages from "./pages"
import "./App.css"


export default function App() {

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route index element={<Pages.Home/>}/>
          <Route path='Rooms' element={<Pages.Rooms/>}/>
          <Route path='Login' element={<Pages.Login/>}/>
          <Route path='*' element={<Pages.NotFound/>}/>
        </Route>
      </Routes>

    </div>

  )
}
