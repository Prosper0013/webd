import { useEffect, useState } from "react";

const VideoLoader = () => {
  const [loading, setLoading] = useState(true);

  // Hide loader when video ends or after 5 seconds (fallback)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 second fallback

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <video
        autoPlay
        muted
        playsInline
        onEnded={() => setLoading(false)}
        className="w-full h-full object-contain"
      >
        <source src="/welcome.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoader;
