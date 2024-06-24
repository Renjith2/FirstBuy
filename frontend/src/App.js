import './App.css';

import React from 'react'
import Register from './Pages/Register';
import {BrowserRouter,Router,Route, Routes} from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {
  return (
    <div>
    
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Register />} />
  <Route path='/login' element={<Login/>}/>
  <Route path='/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App