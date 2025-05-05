import { useEffect, useState, useRef } from "react";

const VideoLoader = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Universal play handler
    const handlePlay = async () => {
      try {
        await video.play();
      } catch (err) {
        // If fails, mute and try again
        video.muted = true;
        await video.play();
      }
    };

    // Handle video end
    const handleEnded = () => setLoading(false);

    // Set up event listeners
    video.addEventListener('loadedmetadata', handlePlay);
    video.addEventListener('ended', handleEnded);

    // Fallback dismissal after 10 seconds
    const timer = setTimeout(() => {
      if (loading) setLoading(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      video.removeEventListener('loadedmetadata', handlePlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '100vh',
          objectFit: 'cover'
        }}
      >
        <source src="/welcome.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoader;
