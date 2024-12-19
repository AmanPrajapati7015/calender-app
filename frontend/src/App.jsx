import { Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar  from './navbar/navbar';
import Home from './pages/homepage/homepage'
import Dashboard from './pages/dashboard/dashboard'
import AddEventForm from './pages/addNewEvent/addNewEvent';
import ErrorPage from './pages/errorPage/errorPage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addnewform' element={<AddEventForm/>}/>
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
    </div>
  )
}

// TODO
// 2. gey out the pased events
// 3. make notification work 
// 5. study MUI basics


export default App
