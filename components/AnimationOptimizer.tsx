/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useRef } from 'react';
import { useAnimationPerformance } from './SafeAnimationProvider';
import { rafThrottle } from '../utils/performance';

interface AnimationOptimizerProps {
  children: React.ReactNode;
  optimizeOnScroll?: boolean;
  scrollDebounceTime?: number;
}

/**
 * Component that optimizes animations for better performance
 * without completely disabling them
 */
const AnimationOptimizer: React.FC<AnimationOptimizerProps> = ({
  children,
  optimizeOnScroll = true,
  scrollDebounceTime = 200
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevScrollY = useRef<number>(0);
  const scrollDeltaRef = useRef<number>(0);
  
  // Apply optimizations during scrolling for better performance
  useEffect(() => {
    if (!optimizeOnScroll) return;
    
    // Only run on client
    if (typeof window === 'undefined') return;

    const handleScroll = rafThrottle(() => {
      // Only trigger on significant scroll movements
      const currentScrollY = window.scrollY;
      scrollDeltaRef.current = Math.abs(currentScrollY - prevScrollY.current);
      prevScrollY.current = currentScrollY;

      // If scroll delta is significant, optimize animations
      if (scrollDeltaRef.current > 5) {
        if (!isScrolling) {
          setIsScrolling(true);
          document.documentElement.classList.add('optimize-animations');
          document.documentElement.style.setProperty('--animation-quality', '0');
        }
        
        // Reset the timeout on each scroll event
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set a timeout to restore full animation quality after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          document.documentElement.classList.remove('optimize-animations');
          document.documentElement.style.setProperty('--animation-quality', '1');
        }, scrollDebounceTime);
      }
    });
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add CSS to document head to optimize animations, not disable them
    const style = document.createElement('style');
    style.textContent = `
      /* Optimize animations during scrolling instead of disabling them */
      .optimize-animations * {
        /* Use simpler/faster transitions during scrolling */
        transition-timing-function: linear !important;
        transition-duration: calc(var(--original-duration, 0.3s) * 0.7) !important;
        
        /* Simplify animations */
        animation-timing-function: linear !important;
        animation-duration: calc(var(--original-duration, 1s) * 0.7) !important;
        
        /* Promote using hardware acceleration */
        transform: translateZ(0);
        will-change: transform, opacity;
      }
      
      :root {
        --animation-quality: 1;
        --animation-duration-scale: 1;
      }
      
      /* Make animations simpler/faster on mobile */
      @media screen and (max-width: 768px) {
        .optimize-animations {
          contain: content;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      document.head.removeChild(style);
    };
  }, [optimizeOnScroll, isScrolling, scrollDebounceTime]);

  return <>{children}</>;
};

export default AnimationOptimizer;
