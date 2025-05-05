/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import { motion } from "framer-motion";
import { FaTelegram, FaCopy, FaCheckCircle } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import ExportedImage from "next-image-export-optimizer";
import { useState, useEffect } from "react";
import Image from "next/image";

const AnimatedFooter: React.FC = () => {
  // Copy state
  const [copied, setCopied] = useState(false);

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
    {
      name: "GeckoTerminal",
      href: "https://www.geckoterminal.com/base/pools/0x1c377683c82bc0f335bf1270f966c8240d8452b9?utm_source=telegram&utm_medium=buytechbot&utm_campaign=buytechbot",
      imgSrc: "/images/geckoterminal.png",
    },
  ];

  return (
    <footer
      className="text-center py-5 relative overflow-hidden bg-center bg-cover"
      style={{
        background: "#085CA6",
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Wave background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-0">
        <svg
          className="relative block w-full"
          style={{ height: "35px" }}
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white opacity-20"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-8 relative z-10">
        {/* Social links */}
        <motion.div
          className="flex justify-center gap-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        >
          {[
            {
              name: "Twitter",
              icon: <BsTwitterX size={20} />,
              href: "https://x.com/Based_DogeCTO",
            },
            {
              name: "Telegram",
              icon: <FaTelegram size={20} />,
              href: "https://t.me/OfficialBasedDoge",
            },
          ].map((platform) => (
            <motion.a
              key={platform.name}
              href={platform.href}
              whileHover={{
                y: -5,
                scale: 1.15,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full flex items-center justify-center relative group bg-babyBlue border-black"
            >
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs font-bold transition-opacity whitespace-nowrap text-white">
                {platform.name}
              </div>
              <div className="text-white">{platform.icon}</div>
              <motion.div
                className="absolute w-full h-full rounded-full border-2 border-black"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Chart Links with PNG images */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {chartLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-md text-white font-bold text-sm flex items-center gap-2 bg-babyBlue border-black shadow-md"
            >
              <div className="w-4 h-4 relative">
                <ExportedImage
                  src={link.imgSrc}
                  alt={link.name}
                  width={16}
                  height={16}
                  layout="fixed"
                />
              </div>
              <span>{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Clean button styling */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: "14px 24px",
            borderRadius: "6px",

            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
          }}
          className="w-fit mb-8 bg-babyBlue text-white"
          onClick={() => {
            window.open(
              "https://app.uniswap.org/swap?chain=base&inputCurrency=NATIVE&outputCurrency=0xb3ecba1330fe26bb36f40344992c481c2c916f23",
              "_blank"
            );
          }}
        >
          Buy $BDOGE now
        </motion.button>
        {/* Disclaimer */}
        <motion.div
          className="text-sm text-white max-w-2xl mx-auto mb-8 bg-babyBlue backdrop-blur-sm rounded-standard p-4 border-2 border-black"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="mb-2 font-medium ">Disclaimer:</p>
          <p>
            Based Doge is a decentralized meme coin community takeover project.
            There is no team or prior allocation—only a dedicated community.
            Meme coins do not guarantee returns and are intended for
            entertainment purposes. Invest only what you can afford to lose.
            This does not constitute financial advice.
          </p>
        </motion.div>
        <motion.div
          className="bg-babyBlue rounded-standard p-4 max-w-2xl mx-auto mb-4 "
          whileHover={{ scale: 1.02 }}
        >
          <motion.p
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative z-10 text-white font-medium"
          >
            Copyright © {new Date().getFullYear()} BASED DOGE. All Rights
            Reserved. DO ONLY GOOD EVERYDAY!
          </motion.p>
        </motion.div>

        <p className="text-sm text-white">
          <span className="opacity-70">Made with</span>
          <motion.span
            className="inline-block mx-1 text-white"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💙
          </motion.span>
          <span className="opacity-70">by the Based Doge community</span>
        </p>
      </div>
    </footer>
  );
};

export default AnimatedFooter;
