import React, { useEffect, useState } from 'react'

const Video = () => {

    const [videoUrl, setVideoUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Set the URL for video stream from your server endpoint
        setVideoUrl("http://localhost:3000/video",);
    
        // Simulate loading delay or fetch video metadata if needed
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }, []);
  return (
<div className="video-player-container">
      {isLoading ? (
        <div className="loading-spinner">Loading video...</div>
      ) : (
        <video
          controls
          width="100%"
          height="auto"
          src={videoUrl}
          type="video/mp4"
          style={{ background: "black" }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>  )
}

export default Video