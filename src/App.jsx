import { useState, useEffect } from 'react'
import Axios from 'axios'
import Map from './components/Map'
import './App.css'


function App() {
  // const [ipDetails, setIpDetails] = useState([])
  // const [lat, setLat] = useState(22.5732)
  // const [lon, setLon] = useState(88.3832)

  const [userIp, setUserIp] = useState(null)

  async function getUserIPv4() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) throw new Error('Failed to fetch IP');
      const data = await response.json();
      return data.ip; // returns the IPv4 address as a string
    } catch (error) {
      console.error('Error fetching IP:', error);
      return null;
    }
  }

  useEffect(() => {
    getUserIPv4().then(ip => setUserIp(ip))
  }, [])

  return (
    <>
      <h1>Ip Address Find</h1>
      <div className="App">
        <p>Your IP: {userIp ? userIp : "Loading..."}</p>
      </div>
        <Map ip={userIp} />
    </>
  )
}

export default App
