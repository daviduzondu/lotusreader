import React from 'react'
import '../../src/arrow.css'
function ClickPrompt() {
    return (
        <div className="h-screen bg-white text-xl">
            <div className="flex justify-center items-center h-full">
                <div className="arrow mr-5">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                Click on a post to get started.
            </div>
        </div>
    )
}

export default ClickPrompt