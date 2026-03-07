import { useState } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import getCurrentUser from './customHooks/getCurrentUser';
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

import getOtherUsers from './customHooks/getOtherUsers';


function App() {
    getCurrentUser()
    getOtherUsers()
    let {userData} = useSelector(state=> state.user)
  return (
    <Routes>
      <Route path='/login' element={!userData?<Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to="/profile"/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App
