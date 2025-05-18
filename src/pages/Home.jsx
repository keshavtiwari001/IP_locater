import React from 'react'
import ShowBTN from '../components/Address/ShowBTN'
import IP from '../components/IpInfo/IP'

const Home = () => {
    return (
        <div className="rounded-[10px] my-[50px] m-6 p-4 rounded-lg shadow-xl">
            <IP />
            <ShowBTN />
        </div>
    )
}

export default Home