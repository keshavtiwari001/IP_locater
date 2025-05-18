import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCoordinates } from '../../APP/features/angleSet'
import ShowBTN from '../Address/ShowBTN'


const IPForum = () => {
    const [ip, setIp] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(null)
    const [ipData, setIpData] = useState(null)
    const dispatch = useDispatch();
    

    // IP address validation regex
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/

    const validateIP = (ipAddress) => {
        if (!ipRegex.test(ipAddress)) {
            return false
        }
        const parts = ipAddress.split('.')
        return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!ip) {
            setError('Please enter an IP address')
            return
        }
        if (!validateIP(ip)) {
            setError('Please enter a valid IP address')
            return
        }
        setError('')
        setLoading(true)

        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`)
            if (response.data.status === 'success') {
                setIpData(response.data)
            }
            else {
                setError('Could not fetch information for this IP address')
            }

        } catch (error) {
            setError('Error fetching IP information : ', error.message)
        } finally {
            setLoading(false)
        }

    }

    const handleClear = () => {
        setIp('')
        setError('')
        setIpData(null)
    }

    useEffect(()=>{
        if(ip && ipData){
        dispatch(setCoordinates({ lat: ipData.lat, lon: ipData.lon }))
    }
    },[ipData, dispatch])


    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Enter IP Address</h2>
            <div className="flex justify-center p-10">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center border-b border-white py-2">
                            <input
                                className={`appearance-none bg-transparent border-none w-full 
                                    text-indigo-100 mr-3 py-1 px-2 leading-tight focus:outline-none
                                    ${error ? 'border-red-500' : ''}`}
                                type="text"
                                placeholder="eg. 192.168.1.1"
                                aria-label="IP Address"
                                onChange={(e) => setIp(e.target.value)}
                                value={ip}
                            />
                            <button
                                className="flex-shrink-0 bg-indigo-500 hover:bg-[indigo-100] 
                                    border-indigo-500 hover:border-indigo-700 text-sm border-4 
                                    text-white py-1 px-2 rounded"
                                type="submit"
                            >
                                Search
                            </button>
                            <button
                                className="flex-shrink-0 border-transparent border-4 
                                    text-indigo-50 hover:text-indigo-400 text-sm py-1 px-2 rounded"
                                type="button"
                                onClick={handleClear}
                            >
                                Clear
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-500 text-xs italic">{error}</p>
                        )}

                        {loading && (
                            <div className="mt-4 text-center">
                                <p className="text-gray-600">Loading...</p>
                            </div>
                        )}

                        {ipData && (
                            <div className="mt-4  p-4 rounded-lg shadow-2xl">
                                <h3 className="font-bold text-lg mb-2">IP Information</h3>
                                <ul className="space-y-2">
                                    <li><span className="font-semibold">Country:</span> {ipData.country}</li>
                                    <li><span className="font-semibold">City:</span> {ipData.city}</li>
                                    <li><span className="font-semibold">Region:</span> {ipData.regionName}</li>
                                    <li><span className="font-semibold">ISP:</span> {ipData.isp}</li>
                                    <li><span className="font-semibold">Timezone:</span> {ipData.timezone}</li>
                                    <li><span className="font-semibold">Coordinates:</span> {ipData.lat}, {ipData.lon}</li>
                                </ul>
                            </div>
                        )}

                    </div>
                </form>
            </div>

            {ipData && (
                <ShowBTN />
            )}

        </div>
    )
}

export default IPForum