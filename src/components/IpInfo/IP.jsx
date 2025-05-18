import { useState, useEffect } from 'react'
import Map from './Map'
import '../../App.css'
import ShowBTN from '../Address/ShowBTN';


function IP() {

  const [userIp, setUserIp] = useState(null)

  async function getUserIPv4() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) throw new Error('Failed to fetch IP');
      const data = await response.json();
      return data.ip; 
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
     <div >
       <h1 className="text-[40px] " >Your IP Address</h1>
       <br /> <hr />
       <br />
      <div className="flex justify-evenly items-center">
        <p>Your IP: {userIp ? userIp : "Loading..."}</p>
        <Map ip={userIp} />
      </div>
      
     </div>
     {/* <ShowBTN /> */}
    </>
  )
}

export default IP
