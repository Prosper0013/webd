/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import { motion } from "framer-motion";
import { GiRoad, GiMagicGate, GiCastle, GiSparkles } from "react-icons/gi";
import { FaMagic } from "react-icons/fa";
import ExportedImage from "next-image-export-optimizer";
type RoadmapItem = {
  phase: string;
  description: string;
};

interface RoadmapSectionProps {
  roadmapData: RoadmapItem[];
}
const RoadmapSection: React.FC<RoadmapSectionProps> = ({ roadmapData }) => {
  // Refined wobble animation with smoother transitions
  const wobbleVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [-2, 2, -1, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Phase icons with updated colors
  const phaseIcons = [
    <motion.div
      key="gate"
      whileHover={{ scale: 1.05, y: -3 }}
      className="rounded-full bg-white p-4 border-3 border-black"
    >
      <GiMagicGate className="text-5xl text-black" />
    </motion.div>,
    <motion.div
      key="road"
      whileHover={{ scale: 1.05, y: -3 }}
      className="rounded-full bg-white p-4 border-3 border-black"
    >
      <GiRoad className="text-5xl text-black" />
    </motion.div>,
    <motion.div
      key="castle"
      whileHover={{ scale: 1.05, y: -3 }}
      className="rounded-full bg-white p-4 border-3 border-black"
    >
      <GiCastle className="text-5xl text-black" />
    </motion.div>,
  ];

  // Border accent colors for phase cards
  const phaseBorderColors = [
    "border-black", // All black border
    "border-black",
    "border-black",
  ];

  return (
    <section
      id="roadmap"
      className="px-6 md:px-20 py-10 relative overflow-hidden"
      style={{
        background: "#085CA6",
        borderTop: "6px dashed rgba(255,255,255,0.25)",
        borderBottom: "6px dashed rgba(255,255,255,0.25)",
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Consistent pattern background */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto"
      >
        {/* Refined title with subtle animation */}
        <motion.h2
          variants={wobbleVariants}
          initial="initial"
          animate="animate"
          className="font-[pricedown] text-center text-5xl md:text-7xl mb-8 text-white"
        >
          Roadmap
        </motion.h2>

        {/* Enhanced badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["Short-Term Goals", "Long-Term Vision"].map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              className="relative px-5 py-2 bg-babyBlue text-white backdrop-blur-md rounded-standard"
              style={{
                border: "3px dashed rgba(255, 255, 255, 0.5)",
                transform: "rotate(-1deg)",
              }}
            >
              <span className=" font-medium">{text}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-white text-xl max-w-3xl mx-auto mb-20"
        >
          Join us on the Based Doge journey as we build the ultimate Doge
          community on Base Chain with transparency and community at our core.
        </motion.p>

        {/* Enhanced zigzag path with better animation */}
        <div className="hidden md:block absolute left-1/2 top-[300px] bottom-48 transform -translate-x-1/2 z-0">
          <svg width="30" height="100%" preserveAspectRatio="none">
            <motion.path
              d="M15,0 Q25,50 5,100 Q25,150 5,200 Q25,250 5,300 Q25,350 5,400 Q25,450 5,500"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8,8"
              fill="none"
              animate={{
                strokeDashoffset: [0, -32],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Path elements with refined animations */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`path-element-${i}`}
              className="absolute w-6 h-6 left-1/2 -translate-x-1/2 flex items-center justify-center"
              style={{
                top: `${20 + i * 25}%`,
              }}
              animate={{
                y: [-4, 4, -4],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            >
              {
                [
                  <GiSparkles key="sparkle" className="text-white" />,
                  <FaMagic key="magic" className="text-white" />,
                  <div key="star" className="text-white">
                    ★
                  </div>,
                ][i % 3]
              }
            </motion.div>
          ))}
        </div>

        {/* Refined roadmap items */}
        <div className="relative max-w-6xl mx-auto">
          {roadmapData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              className={`relative md:mb-24 mb-5 md:w-5/12 ${
                index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"
              }`}
            >
              {/* Timeline marker */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute top-1/2 -translate-y-1/2 hidden md:block z-20 ${
                  index % 2 === 0
                    ? "left-0 -translate-x-1/2"
                    : "right-0 translate-x-1/2"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white p-1 border-3 border-black">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-black font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card design */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -4,
                }}
                transition={{ duration: 0.2 }}
                className={`p-7 backdrop-blur-md bg-babyBlue border-3 ${
                  phaseBorderColors[index % phaseBorderColors.length]
                }`}
                style={{
                  borderRadius: "6px",
                }}
              >
                {/* Icon with animation */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-6 flex justify-center"
                >
                  {phaseIcons[index % phaseIcons.length]}
                </motion.div>

                {/* Phase Title */}
                <h3
                  className="text-2xl font-bold text-white mb-4 text-center"
                  style={{
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.phase}
                </h3>

                {/* Divider */}
                <div className="relative h-px w-2/3 mx-auto mb-5 overflow-hidden bg-gray-200">
                  <motion.div
                    className="absolute inset-0 bg-black"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Description text */}
                <p className="text-center text-white leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default RoadmapSection;
