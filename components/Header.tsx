/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburger, GiCancel } from "react-icons/gi";
import { ImMenu } from "react-icons/im";
import ExportedImage from "next-image-export-optimizer";
import logo from "../public/images/logo.jpg";
import {
  FaHome,
  FaInfoCircle,
  FaCoins,
  FaShoppingCart,
  FaRoad,
  FaChartLine,
  FaTelegram,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Prevent hydration errors by marking as mounted
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent rendering until client-side
  if (!mounted) return null;

  const navItems = [
    { name: "Home", href: "#home", icon: <FaHome /> },
    { name: "About", href: "#about", icon: <FaInfoCircle /> },
    { name: "Tokenomics", href: "#tokenomics", icon: <FaCoins /> },
    { name: "How to Buy", href: "#how-to-buy", icon: <FaShoppingCart /> },
    { name: "Roadmap", href: "#roadmap", icon: <FaRoad /> },
  ];

  // Social links for header
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

  // Simplified header variants
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Clean, fixed header with improved positioning */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 pt-2 px-4 md:px-10">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>

        {/* Enhanced background with baby blue */}
        <div
          className={`w-full px-4 md:px-8 transition-all duration-500 bg-babyBlue border-black border-2 rounded-standard`}
        >
          {/* Simplified content wrapper with clean animations */}
          <motion.div
            className="container mx-auto flex justify-between items-center "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Clean logo */}
            <motion.div className="w-14 p-1">
              <ExportedImage
                src={logo}
                layout="responsive"
                alt=""
                className="w-16"
              />
            </motion.div>

            {/* Clean desktop navigation with consistent hover effects */}
            <div className="hidden md:flex items-center">
              {/* Navigation links */}
              <nav className="flex gap-6 lg:gap-8 mr-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white text-xl font-bold hover:text-babyBlue transition-colors px-2 py-1 relative group"
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.1 * index,
                        duration: 0.4,
                      },
                    }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-babyBlue rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </nav>

              {/* Social Links */}
              <div className="flex items-center gap-2 mr-4">
                {socialLinks.map((platform) => (
                  <motion.a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full flex items-center justify-center relative group bg-white border-2 border-black shadow-md hover:shadow-lg transition-all duration-300"
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
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                {/* <motion.a
                  href="#chart"
                  className="px-8 py-2 rounded-button text-black font-bold text-lg relative overflow-hidden w-fit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "white",
                    border: "2px solid #000",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <FaChartLine className="mr-1" /> Chart
                </motion.a> */}
                <motion.a
                  href="#how-to-buy"
                  className="px-8 py-2 rounded-button text-black font-bold text-lg relative overflow-hidden w-fit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "white",
                    border: "2px solid #000",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Buy $BDOGE
                </motion.a>
              </div>
            </div>

            {/* Clean mobile menu button */}
            <motion.button
              className="md:hidden p-3 rounded-full focus:outline-none z-50 bg-white border-2 border-black text-black"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {isOpen ? (
                  <GiCancel className="text-black text-3xl" />
                ) : (
                  <ImMenu className="text-black text-3xl" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </header>

      {/* Clean mobile navigation with consistent colors */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-0 right-0 top-[4rem] bg-babyBlue md:hidden z-40 shadow-lg"
          >
            <div className="relative overflow-hidden">
              {/* Clean menu items container */}
              <motion.div
                className="py-6 px-4 flex flex-col items-stretch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 bg-white hover:bg-white/90 mb-3 p-4 rounded-standard text-black font-bold text-xl relative overflow-hidden border-2 border-black"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0.08 * index,
                        duration: 0.4,
                      },
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="bg-babyBlue p-3 rounded-full border border-black">
                      <div className="text-white">{item.icon}</div>
                    </div>
                    {item.name}
                  </motion.a>
                ))}

                {/* Social media links for mobile */}
                <div className="flex items-center justify-center gap-4 my-4">
                  {socialLinks.map((platform) => (
                    <motion.a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-11 h-11 rounded-full flex items-center justify-center bg-white border-2 border-black shadow-md"
                    >
                      <div className="text-black">{platform.icon}</div>
                    </motion.a>
                  ))}
                </div>

                {/* Clean mobile CTA button */}
                <motion.a
                  href="https://app.uniswap.org/swap?chain=base&inputCurrency=NATIVE&outputCurrency=0xb3ecba1330fe26bb36f40344992c481c2c916f23"
                  className="mt-4 bg-white p-4 text-black font-bold text-center rounded-button shadow-md border-2 border-black"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: navItems.length * 0.08 + 0.1,
                      duration: 0.4,
                    },
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Buy $BDOGE Now
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
