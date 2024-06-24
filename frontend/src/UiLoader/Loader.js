import React from 'react'
import './loader.css'

const LoaderUi = () => {
    return (
        <>
            <div className="loader-container">
                <div className="progress float shadow">
                    <div className="progress__item"></div>
                </div>
            </div>
        </>
    )
}

export default LoaderUi
