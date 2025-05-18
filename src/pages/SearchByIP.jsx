import React from 'react'
import IPForum from '../components/SearchByIP/IPForum'
import ShowBTN from '../components/Address/ShowBTN'

const SearchByIP = () => {
    return (
        <>
            <div className='p-10 rounded-lg shadow-xl'>
                <IPForum />
                <ShowBTN />
            </div>
        </>
    )
}

export default SearchByIP