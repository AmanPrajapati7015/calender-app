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
// 2. gey out the pased events
// 3. add invalid url app in frontend
// 4. deploy frontend


export default App
