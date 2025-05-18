import React, { useState } from 'react'
import Address from './Address'
const ShowBTN = () => {
    const [show, setShow] = useState(false)

    const handleBTN = () => {
        setShow(!show)
    }

    return (
        <div className="my-10" >
            <button
                className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${show
                        ? 'bg-green-800 hover:bg-green-900'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                onClick={handleBTN} >
                {show ? 'Hide Address' : 'Show Address'}
            </button>
            <br />
            <br />
            {show && (
                <Address />
            )}
        </div>
    )
}

export default ShowBTN