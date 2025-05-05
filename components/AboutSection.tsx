/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import { motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";
import { useAnimationPerformance } from "./SafeAnimationProvider";

const AboutSection: React.FC = () => {
  const { enableHeavyAnimations } = useAnimationPerformance();

  // Use simpler animations for better performance
  const wobbleVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: enableHeavyAnimations ? [-0.5, 0.5, 0] : 0,
      transition: {
        duration: 2.5,
        repeat: enableHeavyAnimations ? Infinity : 0,
      },
    },
  };

  // Bubble speech variants - simplified
  const bubbleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  return (
    <section
      id="about"
      className="px-6 md:px-20 py-5 relative overflow-hidden"
      style={{
        background: "#085CA6",
        backgroundImage: "url('/images/bgb.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "40%",
      }}
    >
      {/* Consistent pattern background */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        className="max-w-6xl mx-auto p-8 relative z-10 rounded-standard bg-babyBlue/80"
        style={{
          // background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          border: "3px solid #000",
        }}
      >
        {/* Title with subtle animation */}
        {/* <motion.h2
          variants={wobbleVariants}
          initial="initial"
          animate="animate"
          className="font-[pricedown] text-center text-6xl md:text-8xl mb-10 relative z-10"
          style={{
            color: "#fff",
            WebkitTextStroke: "1px #000",
            letterSpacing: "2px",
          }}
        >
          BASED DOGE VISION
        </motion.h2> */}

        <div className="md:flex items-center gap-10 relative z-10">
          {/* Image with clean styling */}
          <div className="md:w-1/2 relative">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative rounded-standard overflow-hidden"
            >
              <ExportedImage
                src="/images/2.jpg"
                alt="About Based Doge"
                layout="responsive"
                width={800}
                height={800}
                className="relative z-10"
              />
            </motion.div>
          </div>

          {/* Content with clean styling */}
          <div className="md:w-1/2 mt-12 md:mt-0">
            <h3 className="text-3xl md:text-4xl mb-6 font-bold text-white">
              Introduction
            </h3>

            {/* Text bubble with cleaner styling */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-8 bg-babyBlue"
              style={{
                // background: "white",
                borderRadius: "6px",
                padding: "20px",
                // border: "3px solid #000",
              }}
            >
              <p className="text-white text-lg leading-relaxed">
                Doge is not just a meme. Doge is freedom, break the archaic
                Hooman money systems. No kings, no gatekeepers. Just Doge. Very
                power to many.
                <br />
                <br />
                Doge says "Money no need be boring. Money can unite. Money can
                meme." Truly Decentralized. Much rich hooman business men - stay
                very far away.
                <br />
                <br />
                No Doge? no shiba, no pepe, no floki. no memecoins.
                <br />
                <br />
                Based Doge? We carry the torch on the hottest chain - Base
                Chain. Not copy-pasta. Not replica.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
