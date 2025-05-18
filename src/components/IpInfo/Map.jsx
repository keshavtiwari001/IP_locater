import React, { useState, useEffect } from 'react'
import { RiUserLocationFill } from 'react-icons/ri'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCoordinates } from '../../APP/features/angleSet'

const Map = ({ip}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(!ip) return
        setLoading(true)
        setError(null)
        axios.get(`http://ip-api.com/json/${ip}`).then(res =>{
            setData(res.data)
            setLoading(false)
            if(res.data && res.data.lat && res.data.lon){
                dispatch(setCoordinates({lat: res.data.lat, lon: res.data.lon}))
            }
        })
        .catch(err => setError("Failed to fetch IP info", err))
        .finally(()=> setLoading(false))
    }, [ip, dispatch])
    

    if(loading) return <div> Loading...</div>
    if(error) return <div> Error: {error}</div>
    if(!data || data.status !== 'success') return <div> No data found</div>

  
    return (
        <div>
            <div className="py-1 px-2.5 flex text-left">
               
                   <div className="ip-info">
                <h3 className='text-[28px]'>IP Info</h3>
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