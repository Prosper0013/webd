import { AnimationProps, TargetAndTransition, Transition, Variants } from "framer-motion";
import { useAnimationPerformance } from "../components/SafeAnimationProvider";

/**
 * Optimized animation presets that maintain animations while 
 * being careful about performance
 */
export const animationPresets = {
  // Subtle fade in with hardware acceleration
  fadeIn: {
    initial: { opacity: 0, transform: "translateZ(0)" },
    animate: { 
      opacity: 1, 
      transform: "translateZ(0)",
      transition: { duration: 0.4 }
    }
  },
  
  // Performant bounce animation
  bounce: {
    initial: { transform: "translateY(20px) translateZ(0)", opacity: 0 },
    animate: { 
      transform: [
        "translateY(20px) translateZ(0)", 
        "translateY(-10px) translateZ(0)", 
        "translateY(0) translateZ(0)"
      ],
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  
  // Hardware accelerated scale animation
  pop: {
    initial: { scale: 0.8, opacity: 0, transform: "translateZ(0)" },
    animate: { 
      scale: 1, 
      opacity: 1,
      transform: "translateZ(0)",
      transition: { type: "spring", stiffness: 300, damping: 15 } 
    },
    // Add hover state
    hover: { 
      scale: 1.05,
      transform: "translateZ(0)",
      transition: { duration: 0.2 } 
    }
  },
  
  // Performant floating animation
  float: {
    animate: {
      y: [0, -10, 0],
      transform: "translateZ(0)", // Hardware acceleration
      transition: { 
        duration: 3, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  },
  
  // Pulse with minimal repaints
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transform: "translateZ(0)", // Hardware acceleration
      transition: { 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  }
};

/**
 * Custom hook that returns properly optimized animation variants
 * based on the device performance
 */
export const useOptimizedAnimations = () => {
  const { highQualityAnimations, reducedMotion } = useAnimationPerformance();
  
  // Return appropriate animation presets based on performance
  const getOptimizedPreset = (presetName: keyof typeof animationPresets): Variants => {
    const preset = animationPresets[presetName];
    
    if (reducedMotion) {
      // For reduced motion preference, minimize animations
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.1 } },
        exit: { opacity: 0, transition: { duration: 0.1 } }
      };
    }
    
    if (!highQualityAnimations) {
      // For lower-end devices, use simplified animations
      // that still animate but with better performance
      const simplePreset = {...preset};
      
      if (simplePreset.animate && typeof simplePreset.animate === 'object') {
        // Add hardware acceleration
        const animateObj = simplePreset.animate as TargetAndTransition;
        if (animateObj.transition) {
          // Simplify transitions
          animateObj.transition = {
            ...animateObj.transition,
            duration: Math.min(((animateObj.transition as any).duration) || 0.3, 0.5),
            type: 'tween',
            ease: 'easeOut'
          };
        }
      }
      
      return simplePreset;
    }
    
    // Return the original preset for high performance devices
    return preset;
  };
  
  return {
    fadeIn: getOptimizedPreset('fadeIn'),
    bounce: getOptimizedPreset('bounce'),
    pop: getOptimizedPreset('pop'),
    float: getOptimizedPreset('float'),
    pulse: getOptimizedPreset('pulse')
  };
};

/**
 * Creates optimized animation props with performance in mind
 */
export const optimizeAnimation = (animationProps: AnimationProps): AnimationProps => {
  const { highQualityAnimations } = useAnimationPerformance();
  
  let optimized = {...animationProps};
  
  // Apply hardware acceleration
  if (optimized.animate && typeof optimized.animate === 'object') {
    const animate = optimized.animate as TargetAndTransition;
    
    // Add transform: translateZ(0) for hardware acceleration
    optimized.animate = {
      ...animate,
      transform: `${(animate as any).transform || ''} translateZ(0)`.trim()
    };
    
      // Optimize transition properties
    if (animate.transition) {
      // Safely access duration which might not exist on all transition types
      const duration = 'duration' in animate.transition 
        ? (animate.transition.duration as number) 
        : 0.3;
      
      optimized.animate.transition = {
        ...animate.transition,
        duration: highQualityAnimations ? duration : Math.min(duration, 0.5)
      };
    }
  }
  
  return optimized;
};
