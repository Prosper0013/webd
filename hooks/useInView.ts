import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that detects when an element is in the viewport
 * Used to optimize animations by only running them when visible
 * 
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility percentage threshold (0-1)
 * @param {number} options.rootMargin - Margin around the root element
 * @param {boolean} options.freezeOnceVisible - Whether to freeze the state once the element has been visible
 * @returns {[React.RefObject<any>, boolean]} - Ref to attach to element and boolean indicating if in view
 */
export default function useInView({
  threshold = 0.1,
  rootMargin = '0px',
  freezeOnceVisible = false
} = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Skip if SSR or ref not attached
    if (!ref.current || typeof IntersectionObserver !== 'function') {
      return;
    }
    
    let currentRef = ref.current;
    const frozen = freezeOnceVisible && isInView;
    
    // Do nothing if we want to freeze the visibility state and it's already visible
    if (frozen) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold, rootMargin }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, freezeOnceVisible, isInView]);
  
  return [ref, isInView];
}
