/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import { motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";
import logo2 from "../public/images/logo.jpg"; // adjust path as needed
import ViewportAnimation from "./ViewportAnimation";
import { useAnimationPerformance } from "./SafeAnimationProvider";
import { BsTwitterX } from "react-icons/bs";
import {
  FaTelegram,
  FaExternalLinkAlt,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

const HeroSection = () => {
  const { highQualityAnimations } = useAnimationPerformance();
  const [copied, setCopied] = useState(false);

  const triggerConfetti = () => {
    // Add confetti logic here if needed
  };

  // Reset copy state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Contract Address
  const contractAddress = "0xb3EcbA1330fe26BB36F40344992C481C2c916F23";

  // Copy address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
    });
  };

  // Chart and trading links with images
  const chartLinks = [
    {
      name: "CoinGecko",
      href: "https://www.coingecko.com/en/coins/based-doge",
      imgSrc: "/images/coingecko.png",
    },
    {
      name: "DexScreener",
      href: "https://dexscreener.com/base/0x1c377683C82Bc0F335Bf1270F966C8240D8452B9",
      imgSrc: "/images/dexscreener.png",
    },
    {
      name: "DexTools",
      href: "https://www.dextools.io/app/en/base/pair-explorer/0xb3EcbA1330fe26BB36F40344992C481C2c916F23",
      imgSrc: "/images/dextools.png",
    },
  ];

  // Buy link (GeckoTerminal)
  const buyLink =
    "https://www.geckoterminal.com/base/pools/0x1c377683c82bc0f335bf1270f966c8240d8452b9?utm_source=telegram&utm_medium=buytechbot&utm_campaign=buytechbot";
  const geckoTerminalImg = "/images/geckoterminal.png";

  // Simplified animation variants
  const floatingVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        type: "tween",
      },
    },
  };

  const glowingVariants = {
    animate: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bounceVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  // More subtle letter animations
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const popVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const title = "BASED DOGE";

  const socialLinks = [
    {
      name: "Twitter",
      icon: <BsTwitterX size={18} />,
      href: "https://x.com/Based_DogeCTO",
    },
    {
      name: "Telegram",
      icon: <FaTelegram size={18} />,
      href: "https://t.me/OfficialBasedDoge",
    },
  ];

  return (
    <section
      className="relative min-h-screen bg-[url('/images/bga.jpg')] bg-center  w-full overflow-hidden z-10 pt-14 md:pt-32 bg-cover bg-no-repeat md:bg-cover"
      id="home"
      style={{
        background: "#085CA6",
        backgroundImage: "url('/images/bga.jpg')",
        backgroundSize: "cover",
        // backgroundPosition: "40%",
      }}
    >
      {/* Clean, base-themed background */}
      <div className="absolute inset-0 z-0">
        {/* Main background */}
        {/* <div
            className="absolute inset-0"
            style={{
              background: "#085CA6", 
            }}
          /> */}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>

      {/* Main content */}
      <div className="relative h-full w-full flex flex-col md:flex-row-reverse items-center justify-center px-6 md:px-24 pt-20">
        {/* Logo container with cleaner animations */}
        <ViewportAnimation
          className="w-4/5 md:w-2/5 relative"
          variants={floatingVariants}
          initial="hidden"
          animate="visible"
          rootMargin="0px"
        >
          <motion.div
            className="relative rounded-full border-4 border-white bg-secondary"
            variants={glowingVariants}
            animate="animate"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "tween", stiffness: 260, damping: 20 }}
          >
            <ExportedImage
              src={logo2}
              alt="Based Doge Logo"
              layout="responsive"
              className="rounded-full"
            />

            {/* Simplified speech bubble */}
            {/* <motion.div
              className="absolute -top-12 -right-6 md:-right-16 md:-top-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.8,
                type: "spring",
                bounce: 0.4,
              }}
            >
              <div
                className="relative bg-white rounded-xl py-2 px-4 shadow-md"
                style={{
                  border: "2px solid #000",
                  background: "white",
                }}
              >
                <motion.p
                  className="font-bold text-sm md:text-base text-black"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  So Based!
                </motion.p>

                <div
                  className="absolute -bottom-[8px] left-5 w-5 h-5 bg-white border-r-2 border-b-2 border-black"
                  style={{ transform: "rotate(45deg)" }}
                />
              </div>
            </motion.div> */}
          </motion.div>
        </ViewportAnimation>

        {/* Text content with cleaner styling */}
        <ViewportAnimation
          className="md:w-1/2 text-center md:text-left mt-8 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={popVariants}
            className="relative inline-block mb-3"
          >
            {/* Title with simplified styling */}
            <div className="text-4xl md:text-7xl font-extrabold mb-6 relative">
              {title.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.1 }}
                  className="inline-block text-white"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
          {/* <div className="flex items-center justify-center md:justify-start  gap-5 mb-7">
            {socialLinks.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3, rotate: -5 }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                className="w-11 h-11 rounded-full flex items-center justify-center relative group bg-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300"
              >
                <motion.span
                  className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs font-bold bg-white px-2 py-1 rounded-md border border-black pointer-events-none text-black"
                  initial={{ y: 5 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {platform.name}
                </motion.span>
                <div className="text-black">{platform.icon}</div>
              </motion.a>
            ))}
          </div> */}
          {/* Contract Address with Copy functionality */}

          {/* <div className="flex flex-col items-center md:items-start">
      
            <motion.div
              className="text-xl md:text-2xl font-bold mb-8 inline-block w-fit"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="relative">
                <span
                  className="relative z-10 text-black p-2 px-4 rounded-standard block"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "2px solid #000",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  The Original Doge Community on Base
                </span>
              </span>
            </motion.div>

      
          </div> */}
        </ViewportAnimation>
      </div>
    </section>
  );
};

export default HeroSection;
