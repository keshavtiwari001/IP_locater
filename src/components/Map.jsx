import React, { useState, useEffect } from 'react'
// import ReactMapGL, { Marker } from 'react-map-gl'
import { RiUserLocationFill } from 'react-icons/ri'
import axios from 'axios'
// const API_KEY = 'http://ip-api.com/json/'

const Map = ({ip}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [viewport, setViewport] = useState({
    //     latitude: lat,
    //     longitude: lon,
    //     width: '100vw',
    //     height: '100vh',
    //     zoom: 10,
    //     pitch: 0,
    //     bearing: 0,
    // })
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
                {/* <ReactMapGL 
                    {...viewport}
                    mapboxA
                    <Marker >
                        <div className="mark">
                            <RiUserLocationFill size="25px" color='blue' />
                        </div>
                    </Marker>
                </ReactMapGL> */}
                   <div className="ip-info">
                <h3>IP Info</h3>
                <ul>
                    <li><b>IP:</b> {data.query}</li>
                    <li><b>Country:</b> {data.country}</li>
                    <li><b>Region:</b> {data.regionName}</li>
                    <li><b>City:</b> {data.city}</li>
                    <li><b>ISP:</b> {data.isp}</li>
                    <li><b>Timezone:</b> {data.timezone}</li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Map