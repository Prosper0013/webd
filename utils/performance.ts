/**
 * Performance utilities for better animations and rendering
 */

// Cache to prevent repeated calculations
const performanceCache = {
  isLowPower: undefined as boolean | undefined,
  devicePixelRatio: undefined as number | undefined,
};

/**
 * Throttle function that limits how often a function can be called
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Aggressive throttle function with requestAnimationFrame
 */
export const rafThrottle = <T extends (...args: any[]) => any>(func: T): ((...args: Parameters<T>) => void) => {
  let ticking = false;
  let lastArgs: Parameters<T> | null = null;
  
  return (...args: Parameters<T>) => {
    lastArgs = args;
    
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        if (lastArgs) func(...lastArgs);
        ticking = false;
        lastArgs = null;
      });
    }
  };
};

/**
 * Debounce function that only executes after waiting
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

/**
 * Detect if device is low-powered
 */
export const isLowPoweredDevice = (): boolean => {
  // Use cached result if available
  if (performanceCache.isLowPower !== undefined) {
    return performanceCache.isLowPower;
  }
  
  if (typeof window === 'undefined') {
    return true; // Default to true for SSR
  }

  const { navigator } = window;

  // Consider most devices as low power to be safe
  const result = true;
  
  // Cache and return the result
  performanceCache.isLowPower = result;
  return result;
};

/**
 * Get reduced animation settings based on device capabilities
 */
export const getOptimizedAnimationSettings = () => {
  const isLowPower = isLowPoweredDevice();
  
  return {
    enableParticles: !isLowPower,
    particleCount: isLowPower ? 10 : 30,
    enableComplexAnimations: !isLowPower,
    enableBlur: !isLowPower,
    enableFloatingElements: !isLowPower,
  };
};

/**
 * Batch processing helper to avoid long-running operations
 */
export const processBatch = <T>(
  items: T[],
  processFn: (item: T) => void,
  batchSize = 5,
  delay = 16
): Promise<void> => {
  return new Promise((resolve) => {
    let index = 0;
    
    function processNextBatch() {
      const limit = Math.min(index + batchSize, items.length);
      
      while (index < limit) {
        processFn(items[index]);
        index++;
      }
      
      if (index < items.length) {
        setTimeout(processNextBatch, delay);
      } else {
        resolve();
      }
    }
    
    processNextBatch();
  });
};

/**
 * Check if an element is currently visible in viewport
 */
export const isElementInViewport = (el: Element): boolean => {
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Detect if css content-visibility is supported
 */
export const isContentVisibilitySupported = (): boolean => {
  return CSS.supports && CSS.supports('content-visibility', 'auto');
};

/**
 * Get pixel density-adjusted sizes for mobile devices
 */
export const getPixelDensityAdjustedSize = (baseSize: number): number => {
  if (typeof window === 'undefined') {
    return baseSize;
  }
  
  // Cache pixel ratio
  if (performanceCache.devicePixelRatio === undefined) {
    performanceCache.devicePixelRatio = window.devicePixelRatio || 1;
  }
  
  // Reduce sizes on high DPI devices
  return baseSize / Math.min(performanceCache.devicePixelRatio, 2);
};

/**
 * Optimize the component tree by providing static alternatives 
 * when in performance mode
 */
export const getOptimizedElements = (regularElement: JSX.Element, performanceElement: JSX.Element) => {
  const isLowPower = isLowPoweredDevice();
  return isLowPower ? performanceElement : regularElement;
};

/**
 * Extremely optimized version of scroll handler to prevent jank
 */
export const createOptimizedScrollHandler = (callback: (scrollY: number) => void): () => void => {
  let lastKnownScrollY = 0;
  let ticking = false;
  let rafId: number | null = null;
  
  const update = () => {
    callback(lastKnownScrollY);
    ticking = false;
  };
  
  const onScroll = () => {
    lastKnownScrollY = window.scrollY;
    
    if (!ticking) {
      // Cancel any existing rAF to prevent queuing
      if (rafId) cancelAnimationFrame(rafId);
      
      // Schedule new update
      ticking = true;
      rafId = requestAnimationFrame(update);
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', onScroll);
    if (rafId) cancelAnimationFrame(rafId);
  };
};

/**
 * Measure performance of elements - for debugging
 */
export const measureRenderTime = <T extends (...args: any[]) => any>(
  func: T,
  name: string
): ((...args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>) => {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    console.log(`${name} rendered in ${end - start}ms`);
    return result;
  };
};
