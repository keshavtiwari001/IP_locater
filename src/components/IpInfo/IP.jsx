import { useState, useEffect } from 'react'
import Map from './Map'
import '../../App.css'


function IP() {

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

  console.log("ip in app : ", userIp)

  return (
    <>
     <div className="maindiv">
       <h1>Ip Address Find</h1>
      <div className="App">
        <p>Your IP: {userIp ? userIp : "Loading..."}</p>
        <Map ip={userIp} />
      </div>
      
     </div>
    </>
  )
}

export default IP
