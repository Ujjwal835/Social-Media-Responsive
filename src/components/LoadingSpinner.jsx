import React from 'react'

export default function LoadingSpinner() {
    return (
        <div className="d-flex justify-content-center spinner">
            <div className="spinner-border spinner-size" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
