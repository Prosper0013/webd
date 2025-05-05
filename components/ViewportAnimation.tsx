/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion, MotionProps } from "framer-motion";
import useInView from "../hooks/useInView";

interface ViewportAnimationProps extends MotionProps {
  children: React.ReactNode;
  /** Distance from the viewport to trigger animation (e.g., "100px") */
  rootMargin?: string;
  /** Whether to run animation only once when it comes into view */
  runOnce?: boolean;
  /** Whether to use a placeholder element with the same dimensions while not in view */
  usePlaceholder?: boolean;
  /** Default animation variants to apply when in view */
  defaultAnimation?: {
    hidden: any;
    visible: any;
  };

  className?: string;
  /** Tag to use for the container element (default: div) */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Component that only runs animations when in viewport
 * This dramatically improves performance by not animating off-screen elements
 */
const ViewportAnimation: React.FC<ViewportAnimationProps> = ({
  children,
  rootMargin = "50px",
  runOnce = true,
  usePlaceholder = false,
  defaultAnimation,
  className,
  as: Component = "div",
  ...motionProps
}) => {
  // Use our custom hook to detect if element is in viewport
  const [ref, isInView] = useInView({
    rootMargin,
    freezeOnceVisible: runOnce,
  });

  // If using defaultAnimation, apply proper variants
  const animationProps = defaultAnimation
    ? {
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
        variants: defaultAnimation,
        ...motionProps,
      }
    : {
        ...motionProps,
        animate: isInView ? motionProps.animate : motionProps.initial || {},
      };

  // If not in view and using placeholder, render an empty div with same dimensions
  if (!isInView && usePlaceholder) {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={className}
        style={{ minHeight: "100px" }}
      />
    );
  }

  return (
    <motion.div
      ref={ref as any}
      className={className}
      {...animationProps}
      // Force GPU acceleration for better performance
      style={{
        ...animationProps.style,
        willChange: isInView ? "transform, opacity" : "auto",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(ViewportAnimation);
