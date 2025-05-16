import { useState, useEffect } from 'react'
import Axios from 'axios'
import IP from "./components/IpInfo/IP"
import './App.css'
import Address from './components/Address/Address'


function App() {



  return (
    <>
      <IP />
      <Address />
    </>
  )
}

export default App
