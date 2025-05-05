import { useEffect, useState, useRef } from "react";

const VideoLoader = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dimensions, setDimensions] = useState({ 
    width: '100%', 
    height: '100%' 
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle responsive sizing
    const handleResize = () => {
      const windowRatio = window.innerWidth / window.innerHeight;
      const videoRatio = video.videoWidth / video.videoHeight;
      
      if (windowRatio > videoRatio) {
        // Window is wider than video (desktop)
        setDimensions({
          width: '100%',
          height: 'auto'
        });
      } else {
        // Window is taller than video (mobile)
        setDimensions({
          width: 'auto',
          height: '100%'
        });
      }
    };

    // Set initial dimensions when metadata loads
    const handleLoadedMetadata = () => {
      handleResize();
      video.play().catch(err => {
        video.muted = true;
        video.play();
      });
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('resize', handleResize);

    // Auto-dismiss after 5 seconds (fallback)
    const timer = setTimeout(() => setLoading(false), 5000);
    video.addEventListener('ended', () => setLoading(false));

    return () => {
      clearTimeout(timer);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('resize', handleResize);
      video.removeEventListener('ended', () => setLoading(false));
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          ...dimensions,
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
        className="transition-opacity duration-300"
      >
        <source src="/welcome.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Skip button with responsive sizing */}
      <button 
        onClick={() => setLoading(false)}
        className="absolute bottom-6 right-6 bg-white/90 text-black px-4 py-2 rounded-lg z-50
                   text-sm md:text-base hover:bg-white transition-all"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default VideoLoader;
