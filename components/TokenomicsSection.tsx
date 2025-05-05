import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ViewportAnimation from "./ViewportAnimation";
import { useAnimationPerformance } from "./SafeAnimationProvider";
import ExportedImage from "next-image-export-optimizer";
// Main TokenomicsSection component with chart removed
const TokenomicsSection: React.FC = ({}) => {
  const { enableHeavyAnimations } = useAnimationPerformance();
  const bounceVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -5, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        type: "tween",
      },
    },
  };
  return (
    <section
      id="tokenomics"
      className="relative py-8  overflow-hidden"
      style={{
        background: "#085CA6",
        backgroundImage: "url('/images/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "40%",
      }}
    >
      {/* Background matching hero section */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ViewportAnimation
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Tokenomics
          </motion.h2>

          <motion.div
            className="relative inline-block mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-xl text-white max-w-3xl mx-auto bg-babyBlue px-6 py-3 rounded-standard border-2 border-black shadow-md">
              Based Doge is a community takeover project with no team
              allocation, no pre-sale allocation, and a burn liquidity pool.
              Designed for transparency and community growth.
            </p>
          </motion.div>
        </ViewportAnimation>

        <motion.div
          className="mt-16 text-center w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-block bg-white p-6 rounded-standard border-4 border-black shadow-lg max-w-4xl w-full">
            <h3 className="text-2xl font-bold text-black mb-4">
              Token Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="bg-babyBlue p-4 rounded-xl  border-black shadow-md"
                whileHover={{ scale: 1.05, rotate: -1 }}
              >
                <p className="text-lg font-bold text-white">Symbol</p>
                <p className="text-xl text-white">$BDOGE</p>
              </motion.div>

              <motion.div
                className="bg-babyBlue p-4 rounded-xl  border-black shadow-md"
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <p className="text-lg font-bold text-white">Total Supply</p>
                <p className="text-xl text-white">1,000,000,000</p>
              </motion.div>

              <motion.div
                className="bg-babyBlue p-4 rounded-xl  border-black shadow-md"
                whileHover={{ scale: 1.05, rotate: -1 }}
              >
                <p className="text-lg font-bold text-white">Network</p>
                <p className="text-xl text-white">Base Chain</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-8 max-w-4xl mx-auto bg-babyBlue p-6 rounded-standard border-4 border-black shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Community-Driven Principles
            </h3>
            <ul className="text-white text-left list-disc pl-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="text-lg">No team allocation</li>
              <li className="text-lg">No pre-sale allocation</li>
              <li className="text-lg">Burn liquidity pool</li>
              <li className="text-lg">
                Full transparency and community governance
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Community message bubble */}
        {/* <motion.div
          className="absolute -bottom-10 right-10 md:right-20"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
        >
          <div className="relative bg-white rounded-xl py-2 px-4 shadow-md border-2 border-black">
            <motion.p
              className="font-bold text-sm md:text-base text-black"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Community owned and driven!
            </motion.p>
            <div
              className="absolute -bottom-[8px] left-5 w-5 h-5 bg-white border-r-2 border-b-2 border-black"
              style={{ transform: "rotate(45deg)" }}
            />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default TokenomicsSection;
