import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar  from './navbar/navbar';
import Home from './pages/homepage/homepage'
import Dashboard from './pages/dashboard/dashboard'
import AddEventForm from './pages/addNewEvent/addNewEvent';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addnewform' element={<AddEventForm/>}/>
      </Routes>
    </div>
  )
}

// TODO
// 2. DO THE TIME CONVERSION
// 4. deploy


export default App
