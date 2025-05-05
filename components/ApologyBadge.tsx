/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface ApologyBadgeProps {
  text: string;
  color?: string;
  icon?: ReactNode;
  className?: string;
}

const ApologyBadge: React.FC<ApologyBadgeProps> = ({
  text,
  color = "var(--sorry-pink)",
  icon,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, -3, 0],
        transition: { duration: 0.5 },
      }}
      className={`inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur shadow-lg ${className}`}
      style={{ boxShadow: `0 5px 15px ${color}40` }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="font-bold" style={{ color }}>
        {text}
      </span>
    </motion.div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ApologyBadge);
