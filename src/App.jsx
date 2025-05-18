import { useState, useEffect } from 'react'
import Axios from 'axios'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Nav from './components/Navbar/Nav'
import Footer from './components/Footer/Footer'
import SearchByIP from './pages/SearchByIP'
import AboutUS from './pages/AboutUS'

function App() {

  return (
    <>

      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/searchbyip' element={<SearchByIP/>} />
          <Route path='/about' element={<AboutUS/>} />
        </Routes>
         {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
