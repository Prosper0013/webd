/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import { useAnimationPerformance } from "./SafeAnimationProvider";
import useInView from "../hooks/useInView";

const AnimatedBackground: React.FC = () => {
  const { enableBackgroundAnimations, highQualityAnimations } =
    useAnimationPerformance();

  // If background animations are disabled, render minimal version
  if (!enableBackgroundAnimations) {
    return (
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 opacity-50" />
    );
  }

  // Use appropriate particle count based on quality settings
  const particleCount = highQualityAnimations ? 12 : 6;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 opacity-50" />

      {/* Divide screen into sections and use viewport detection for each section */}
      <ViewportBackgroundSection
        particleCount={Math.ceil(particleCount / 3)}
        section="top"
      />
      <ViewportBackgroundSection
        particleCount={Math.ceil(particleCount / 3)}
        section="middle"
      />
      <ViewportBackgroundSection
        particleCount={Math.ceil(particleCount / 3)}
        section="bottom"
      />
    </div>
  );
};

// Component that only renders particles for a specific section when it's in view
const ViewportBackgroundSection: React.FC<{
  particleCount: number;
  section: "top" | "middle" | "bottom";
}> = ({ particleCount, section }) => {
  // Use in-view detection with a large margin to ensure smooth transitions
  const [ref, isInView] = useInView({
    rootMargin: "20% 0px",
    threshold: 0.1,
  });

  // Calculate position range for this section
  const getPositionRange = () => {
    switch (section) {
      case "top":
        return { yMin: 0, yMax: 33 };
      case "middle":
        return { yMin: 33, yMax: 66 };
      case "bottom":
        return { yMin: 66, yMax: 100 };
    }
  };

  const { yMin, yMax } = getPositionRange();

  // Generate optimized particles for this section
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    // Calculate position to distribute particles evenly in this section
    const xPos = Math.random() * 100;
    const yPos = yMin + Math.random() * (yMax - yMin);

    return {
      width: 3 + Math.random() * 4,
      height: 3 + Math.random() * 4,
      left: `${xPos}%`,
      top: `${yPos}%`,
      opacity: 0.4,
      delay: i * 0.7,
      duration: 5 + Math.random() * 3,
    };
  });

  // If not in view, don't animate
  if (!isInView) {
    return <div ref={ref as any} className="absolute inset-0" />;
  }

  return (
    <div ref={ref as any} className="absolute inset-0">
      {/* Optimized particles with hardware acceleration */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white will-change-transform"
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            boxShadow: "0 0 3px #fff",
            willChange: "transform, opacity",
            transform: "translateZ(0)", // Hardware acceleration
          }}
          animate={{
            y: [0, -30],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(AnimatedBackground);
