import React, { useRef, useEffect } from "react";
import backgroundVideo from "../assets/videobakgrund.mp4";
import "../styles/BackgroundsVideo.css";

const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // hastighet på HALVA asså långsammare
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="background-video"
      src={backgroundVideo}
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default BackgroundVideo;
