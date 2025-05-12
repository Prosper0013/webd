/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import ApologyBadge from "./ApologyBadge";
import Image from "next/image";
import { useAnimationPerformance } from "./SafeAnimationProvider";
import {
  FaTelegram,
  FaExternalLinkAlt,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";
type HowToBuyStep = {
  step: number;
  title: string;
  description: string;
  icon?: string;
};

interface HowToBuySectionProps {
  howToBuySteps: HowToBuyStep[];
}

const HowToBuySection: React.FC<HowToBuySectionProps> = ({ howToBuySteps }) => {
  const { enableHeavyAnimations } = useAnimationPerformance();
  const [copied, setCopied] = useState(false);

  // Simplified wobble animation
  const wobbleVariants = {
    initial: { rotate: 0 },
    animate: enableHeavyAnimations
      ? {
          rotate: [-1, 1, 0],
          transition: { duration: 2, repeat: Infinity, type: "tween" },
        }
      : {},
  };

  // More optimized confetti with fewer particles
  const triggerConfetti = () => {
    if (!enableHeavyAnimations) return;

    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6, x: 0.5 },
      colors: ["#085CA6", "#3672FF", "#6A90FF"],
      ticks: 200,
      gravity: 0.8,
    });
    window.open(
      "https://app.uniswap.org/swap?chain=base&inputCurrency=NATIVE&outputCurrency=0xb3ecba1330fe26bb36f40344992c481c2c916f23",
      "_blank"
    );
  };

  // Contract Address
  const contractAddress = "0xb3EcbA1330fe26BB36F40344992C481C2c916F23";

  // Copy address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
    });
  };

  // Simplified color accents using Base blue
  const accentColors = [
    {
      bg: "rgba(0, 82, 255, 0.15)",
      glow: "0 8px 24px rgba(0, 82, 255, 0.3)",
      border: "#085CA6",
    },
    {
      bg: "rgba(0, 82, 255, 0.15)",
      glow: "0 8px 24px rgba(0, 82, 255, 0.3)",
      border: "#085CA6",
    },
    {
      bg: "rgba(0, 82, 255, 0.15)",
      glow: "0 8px 24px rgba(0, 82, 255, 0.3)",
      border: "#085CA6",
    },
    {
      bg: "rgba(0, 82, 255, 0.15)",
      glow: "0 8px 24px rgba(0, 82, 255, 0.3)",
      border: "#085CA6",
    },
  ];

  // Simplified bounce animation
  const bounceVariants = {
    initial: { y: 0 },
    animate: enableHeavyAnimations
      ? {
          y: [-5, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          },
        }
      : {},
  };

  return (
    <section
      id="how-to-buy"
      className="px-6 md:px-20 py-5 relative overflow-hidden"
      style={{
        background: "#085CA6",
        backgroundImage: "url('/images/bg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "40%",
      }}
    >
      {/* Consistent pattern background*/}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex flex-col items-center mb-14">
          <motion.div
            className="relative"
            variants={wobbleVariants}
            initial="initial"
            animate="animate"
          >
            <h2
              className="font-[pricedown] text-center text-6xl md:text-8xl"
              style={{
                WebkitTextStroke: "1px #000",
                color: "#fff",
              }}
            >
              How to Buy $BDOGE
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 my-8">
            <ApologyBadge text="Low Transaction Fees" color="#000" />
            <ApologyBadge text="Fast Transaction Times" color="#000" />
            <ApologyBadge text="Coinbase Integration" color="#000" />
          </div>
        </div>

        {/* Step cards container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/40 hidden lg:block rounded-full"></div>

          {howToBuySteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={
                enableHeavyAnimations
                  ? {
                      scale: 1.03,
                    }
                  : {}
              }
              className="relative z-10"
            >
              {/* Card design */}
              <div
                className="relative bg-babyBlue text-white p-8 pt-14 rounded-standard border-3"
                style={{
                  borderColor: "#000",
                }}
              >
                {/* Speech bubble pointer */}
                <div
                  className="absolute bg-babyBlue -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    borderLeft: "3px solid #fff",
                    borderRight: "3px solid #fff",
                    borderTop: "3px solid #fff",
                  }}
                ></div>

                {/* Step number*/}
                <motion.div
                  variants={bounceVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "#085CA6",
                    border: "3px solid #fff",
                  }}
                >
                  <div className="text-white text-3xl font-bold">
                    {item.step}
                  </div>
                </motion.div>

                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {item.title}
                  </h3>

                  {/* Divider */}
                  <div className="h-1 w-12 mx-auto mb-4 rounded-full bg-white"></div>

                  <p className="text-white font-medium">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 w-full max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-babyBlue p-2 rounded-md w-full border-2 border-black">
            <p className="text-xs font-bold text-white mb-1">
              Contract Address:
            </p>
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-[0.65rem] md:text-xs text-white  break-all w-full ">
                {contractAddress}
              </span>
              <motion.button
                onClick={copyToClipboard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 p-1 rounded-md hover:bg-gray-100"
                title="Copy to clipboard"
              >
                {copied ? (
                  <FaCheckCircle size={16} className="text-green-600" />
                ) : (
                  <FaCopy size={16} className="text-gray-100" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-5 text-center"
        >
          <div className="relative inline-block">
            <motion.button
              whileHover={
                enableHeavyAnimations
                  ? {
                      scale: 1.03,
                    }
                  : {}
              }
              whileTap={{ scale: 0.98 }}
              onClick={triggerConfetti}
              className="text-2xl md:text-3xl px-10 py-5 font-bold rounded-button bg-babyBlue text-white"
              style={{
                border: "3px solid #fff",
              }}
            >
              Buy $BDOGE Now
            </motion.button>
          </div>

{/* Added Uniswap iframe here updated*/} 
<div className="relative w-full max-w-[430px] mx-auto">
  <div className="squid-widget-container">
    <iframe
      src="https://nakathecat.com/dev/index.html"
      height="684px"
      width="100%"
      style={{
        border: "none",
        borderRadius: "16px",
        backgroundColor: "rgb(8, 92, 166)", // Force background color
        minWidth: "300px",
        maxWidth: "430px",
        margin: "0 auto",
        display: "block"
      }}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    ></iframe>
  </div>
</div>

          {/* Added Uniswap iframe here */}
          <iframe
            src="https://app.uniswap.org/swap?chain=base&inputCurrency=NATIVE&outputCurrency=0xb3ecba1330fe26bb36f40344992c481c2c916f23"
            height="684px"
            width="100%"
            style={{
              border: "none",
              borderRadius: "16px",
              backgroundColor: "rgb(8, 92, 166)", // Force background color
              minWidth: "300px",
              maxWidth: "430px",
              margin: "0 auto",
              display: "block"
            }}
          ></iframe>
          
          <p className="mt-6 text-white font-medium text-lg">
            Join our vibrant community on Telegram or Twitter for assistance and
            the latest updates!
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowToBuySection;
