/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, createContext, useContext, useState } from 'react';
import { MotionConfig } from 'framer-motion';

// Add viewport control to animation context
export const AnimationPerformanceContext = createContext({
  enableHeavyAnimations: true,
  enableBackgroundAnimations: true,
  enableHoverEffects: true,
  enableTransitions: true,
  enableParallaxEffects: true,
  highQualityAnimations: true,
  reducedMotion: false,
  viewportRenderOnly: true, // NEW: Only animate elements in viewport
  viewportMargin: '100px', // NEW: How much to expand the viewport check
});

interface SafeAnimationProviderProps {
  children: React.ReactNode;
  viewportRenderOnly?: boolean;
}

const SafeAnimationProvider: React.FC<SafeAnimationProviderProps> = ({ 
  children,
  viewportRenderOnly = true 
}) => {
  // Performance settings - optimized but not disabled
  const [performanceSettings, setPerformanceSettings] = useState({
    enableHeavyAnimations: true,
    enableBackgroundAnimations: true,
    enableHoverEffects: true, 
    enableTransitions: true,
    enableParallaxEffects: true,
    highQualityAnimations: true,
    reducedMotion: false,
    viewportRenderOnly: viewportRenderOnly,
    viewportMargin: '100px',
  });
  
  // Track frame rate for adaptive performance tuning
  const [frameTimes, setFrameTimes] = useState<number[]>([]);
  const [isLowFrameRate, setIsLowFrameRate] = useState(false);

  useEffect(() => {
    // Check for performance capabilities
    const checkPerformance = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Detect low-end devices that need optimization
      const isLowPowerDevice = 
        navigator.hardwareConcurrency <= 4 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2;
      
      // Optimize animations for better performance, not disable them
      setPerformanceSettings({
        enableHeavyAnimations: !prefersReducedMotion,
        enableBackgroundAnimations: !isLowPowerDevice && !prefersReducedMotion,
        enableHoverEffects: !prefersReducedMotion,
        enableTransitions: true, // Always keep transitions
        enableParallaxEffects: !isLowPowerDevice && !prefersReducedMotion,
        highQualityAnimations: !isLowPowerDevice,
        reducedMotion: prefersReducedMotion,
        viewportRenderOnly: true, // Always use viewport optimization for best performance
        viewportMargin: isLowPowerDevice ? '50px' : '100px', // Smaller viewport margin for low-power devices
      });
    };

    checkPerformance();
    
    // Monitor framerate to adapt performance settings
    let lastTime = performance.now();
    let frameCount = 0;
    const frameThreshold = 50; // ms (20 FPS threshold)
    
    const monitorFrameRate = () => {
      const now = performance.now();
      const delta = now - lastTime;
      
      if (frameCount % 30 === 0) { // Check every 30 frames
        // If frame time is consistently high, optimize animations
        if (delta > frameThreshold) {
          setIsLowFrameRate(true);
          setPerformanceSettings(prev => ({
            ...prev,
            highQualityAnimations: false, // Reduce animation quality but keep animations
            enableParallaxEffects: false,
            enableBackgroundAnimations: false
          }));
        }
        
        setFrameTimes(prev => {
          const updated = [...prev, delta].slice(-20);
          return updated;
        });
      }
      
      lastTime = now;
      frameCount++;
      requestAnimationFrame(monitorFrameRate);
    };
    
    // Start monitoring frame rate
    const frameMonitor = requestAnimationFrame(monitorFrameRate);
    
    // Fix animation issues but don't disable them
    try {
      // Override problematic framer-motion functions globally
      const originalConsoleError = console.error;
      console.error = (...args: any[]) => {
        // Suppress specific animation errors
        if (
          args[0] && 
          typeof args[0] === 'string' && 
          (args[0].includes('Only two keyframes currently supported') || 
           args[0].includes('Trying to animate'))
        ) {
          return;
        }
        originalConsoleError.apply(console, args);
      };

      // Optimize Framer Motion animations
      const motionWindow = window as any;
      let originalAnimate: any;
      if (motionWindow.FramerMotion) {
        originalAnimate = motionWindow.FramerMotion.animate;
        
        motionWindow.FramerMotion.animate = (target: any, ...args: any[]) => {
          // Optimize animation values
          if (args[0]) {
            const animationDef = args[0];
            Object.keys(animationDef).forEach(key => {
              const value = animationDef[key];
              if (Array.isArray(value) && value.length > 2) {
                // Keep animations but simplify keyframes
                animationDef[key] = [value[0], value[value.length - 1]];
              }
            });
            
            // Use more efficient animation types
            if (args[1]?.type === 'spring') {
              args[1] = { 
                ...args[1], 
                // Keep springs but with better performance
                stiffness: Math.min(args[1].stiffness || 100, 200),
                damping: Math.max(args[1].damping || 10, 10),
                mass: Math.min(args[1].mass || 1, 1)
              };
            }
            
            // Optimize inertia
            if (args[1]?.type === 'inertia') {
              args[1] = { 
                ...args[1],
                // Keep inertia but make it lighter
                power: Math.min(args[1].power || 0.8, 0.5),
                timeConstant: Math.min(args[1].timeConstant || 700, 400)
              };
            }
          }
          return originalAnimate(target, ...args);
        };
      }

      return () => {
        console.error = originalConsoleError;
        if (motionWindow.FramerMotion) {
          motionWindow.FramerMotion.animate = originalAnimate;
        }
        cancelAnimationFrame(frameMonitor);
      };
    } catch (error) {
      console.warn('Error optimizing Framer Motion:', error);
    }
  }, []);

  return (
    <AnimationPerformanceContext.Provider value={performanceSettings}>
      <MotionConfig
        transition={{
          // Optimize default transitions but keep animations
          type: performanceSettings.highQualityAnimations ? "spring" : "tween", 
          duration: 0.4,
          ease: "easeOut",
        }}
        reducedMotion={performanceSettings.reducedMotion ? "user" : "never"}
      >
        {children}
      </MotionConfig>
    </AnimationPerformanceContext.Provider>
  );
};

// Custom hook to access animation performance settings
export const useAnimationPerformance = () => useContext(AnimationPerformanceContext);

// Optimized component for performance-sensitive areas
export const OptimizedAnimationWrapper: React.FC<{
  children: React.ReactNode, 
  priority?: 'high'|'low'|'background',
  viewportOnly?: boolean // NEW: Option to override viewport-only behavior
}> = ({
  children,
  priority = 'high',
  viewportOnly
}) => {
  const perf = useAnimationPerformance();
  
  // Check if this animation should render based on priority and performance
  const shouldRender = 
    priority === 'high' || 
    (priority === 'low' && perf.enableHeavyAnimations) || 
    (priority === 'background' && perf.enableBackgroundAnimations);
    
  if (!shouldRender) {
    return null;
  }
  
  // Use viewport optimization if enabled
  const useViewportOptimization = viewportOnly !== undefined ? viewportOnly : perf.viewportRenderOnly;

  // If not using viewport optimization, render directly with quality class
  if (!useViewportOptimization) {
    return (
      <div className={`${perf.highQualityAnimations ? 'high-quality' : 'optimized-quality'}`}>
        {children}
      </div>
    );
  }

  // Import is done here to avoid issues with circular dependencies
  const ViewportAnimation = require('./ViewportAnimation').default;
  
  // Otherwise use ViewportAnimation wrapper
  return (
    <ViewportAnimation 
      rootMargin={perf.viewportMargin}
      className={`${perf.highQualityAnimations ? 'high-quality' : 'optimized-quality'}`}
      runOnce={false} // Continue animating whenever in viewport
    >
      {children}
    </ViewportAnimation>
  );
};

export default SafeAnimationProvider;
