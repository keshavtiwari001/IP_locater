import React, { useState } from 'react'

const AboutUS = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className="flex justify-center items-center dark h-screen w-full">
                <div className="relative cursor-pointer dark:text-white max-w-md" onClick={toggleExpand}>
                    <span className="absolute top-0 left-0 w-full h-full mt-2 ml-2  rounded-lg dark:bg-black"></span>
                    <div
                        className="relative p-6  dark border-2 border-indigo-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                        <div className="flex items-center">
                            <span className="text-xl">😎</span>
                            <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">Keshav Tiwari</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-left">
                            {isExpanded ? (
                                <>
                                    MERN Stack Developer with a passion for creating dynamic and responsive web applications.
                                    <br />
                                    Proficient in MongoDB, Express.js, React.js, and Node.js. Strong problem-solving skills and a keen eye for detail.
                                </>
                            ) : (
                                "MERN Stack Developer with a passion for creating..."
                            )}
                        </p>
                        <p className="text-sm mt-2 border-2 py-1 my-1 rounded-xl">
                            {isExpanded ? "Click to show less" : "Click to read more"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUS