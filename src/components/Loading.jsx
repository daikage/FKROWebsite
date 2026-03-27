import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="loading-spinner-segment" />
        <div className="loading-spinner-segment" />
        <div className="loading-spinner-segment" />
        <div className="loading-spinner-segment" />
      </div>
      <p>Loading Fortknox Content...</p>
    </div>
  )
}

export default Loading
