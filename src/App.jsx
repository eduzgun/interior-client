import React from 'react'
import * as Pages from './pages';
import {Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Pages.Homepage/>} />
      <Route path='/profile' element={<Pages.ProfilePage/>} />
    </Routes>
  )
}

export default App
