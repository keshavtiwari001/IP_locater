import React, { useState, useEffect } from 'react'
import { RiUserLocationFill } from 'react-icons/ri'
import axios from 'axios'

const Map = ({ip}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        if(!ip) return
        setLoading(true)
        setError(null)
        axios.post(`http://ip-api.com/json/${ip}`).then(res =>{
            setData(res.data)
            setLoading(false)
        })
        .catch(err => setError("Failed to fetch IP info", err))
        .finally(()=> setLoading(false))
    }, [ip])

    if(loading) return <div> Loading...</div>
    if(error) return <div> Error: {error}</div>
    if(!data || data.status !== 'success') return <div> No data found</div>

    console.log(data)
    console.log(ip)
    return (
        <div>
            <div className="map">
               
                   <div className="ip-info">
                <h3>IP Info</h3>
                <ul>
                    <li><b>Country : </b> &nbsp; &nbsp;{data.country}</li>
                    <li><b>Region : </b> &nbsp; &nbsp;{data.regionName}</li>
                    <li><b>City : </b> &nbsp; &nbsp;{data.city}</li>
                    <li><b>ISP : </b> &nbsp; &nbsp;{data.isp}</li>
                    <li><b>Timezone : </b> &nbsp; &nbsp;{data.timezone}</li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Map