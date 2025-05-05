import { AnimationProps, Variant, Transition } from "framer-motion";

/**
 * Ensures animations are compatible with spring/inertia limitations (only 2 keyframes)
 * @param value Animation value that might be problematic
 * @param defaultTransition Optional default transition to use
 * @returns Safe animation configuration
 */
export const createSafeAnimation = (
  value: any,
  defaultTransition?: Record<string, any>
): AnimationProps => {
  // Case: Animation is a complex array with more than 2 values
  if (Array.isArray(value) && value.length > 2) {
    // Convert to keyframes animation (which supports multiple points)
    return {
      animate: { opacity: 1 },
      initial: { opacity: 0 },
      transition: {
        type: "keyframes",
        duration: 0.8,
        ease: "easeInOut",
        ...defaultTransition
      }
    };
  }
  
  // Case: Direct animation value with appropriate transition
  return {
    animate: value,
    transition: {
      type: "tween", // Use tween instead of spring/inertia
      duration: 0.5,
      ease: "easeOut",
      ...defaultTransition
    }
  };
};

/**
 * Safely handles animation variants by ensuring spring/inertia animations
 * only use two keyframes
 * @param variants The animation variants object
 * @returns Safe variants object
 */
export const createSafeVariants = (variants: Record<string, any>): Record<string, any> => {
  const safeVariants: Record<string, any> = {};
  
  for (const [key, variant] of Object.entries(variants)) {
    safeVariants[key] = {};
    
    for (const [prop, value] of Object.entries(variant)) {
      // Skip transition properties
      if (prop === "transition") {
        safeVariants[key][prop] = {
          ...variant[prop],
          type: variant[prop]?.type === "spring" || variant[prop]?.type === "inertia" 
            ? "tween" 
            : variant[prop]?.type
        };
        continue;
      }
      
      // Handle array values that might be problematic
      if (Array.isArray(value) && value.length > 2) {
        // For arrays with more than 2 points, use only start and end points
        safeVariants[key][prop] = [value[0], value[value.length - 1]];
      } else {
        safeVariants[key][prop] = value;
      }
    }
  }
  
  return safeVariants;
};

/**
 * Fix common animation transition issues by replacing problematic transition types
 */
export const fixAnimationTransition = (transition?: Transition): Transition => {
  if (!transition) return { type: "tween", duration: 0.5 };
  
  // Convert spring/inertia to tween for safer animations
  return {
    ...transition,
    type: transition.type === "spring" || transition.type === "inertia" 
      ? "tween" 
      : transition.type
  };
};

/**
 * Creates a HOC that wraps any component with animation properties
 * to ensure animations are safe and won't throw errors
 */
export function withSafeAnimation<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return (props: P) => {
    // Extract and fix animation-related props
    const fixedProps = { ...props } as any;
    
    if (fixedProps.animate && Array.isArray(fixedProps.animate)) {
      if (Array.isArray(fixedProps.animate) && fixedProps.animate.length > 2) {
        fixedProps.animate = [fixedProps.animate[0], fixedProps.animate[fixedProps.animate.length - 1]];
      }
    }
    
    if (fixedProps.initial && Array.isArray(fixedProps.initial)) {
      if (Array.isArray(fixedProps.initial) && fixedProps.initial.length > 2) {
        fixedProps.initial = [fixedProps.initial[0], fixedProps.initial[fixedProps.initial.length - 1]];
      }
    }
    
    if (fixedProps.transition) {
      fixedProps.transition = fixAnimationTransition(fixedProps.transition);
    }
    
    if (fixedProps.variants) {
      fixedProps.variants = createSafeVariants(fixedProps.variants);
    }
    
    return <Component {...(fixedProps as P)} />;
  };
}

/**
 * Fix animation properties for any Framer Motion component props
 */
export const fixMotionProps = (props: any): any => {
  const result = { ...props };
  
  // Fix arrays in animate property
  if (result.animate) {
    Object.keys(result.animate).forEach(key => {
      if (Array.isArray(result.animate[key]) && result.animate[key].length > 2) {
        const arr = result.animate[key];
        result.animate[key] = [arr[0], arr[arr.length - 1]];
      }
    });
  }
  
  // Set transition to tween by default
  if (result.transition) {
    result.transition = {
      ...result.transition,
      type: "tween"
    };
  } else {
    result.transition = { type: "tween", duration: 0.5 };
  }
  
  return result;
};
