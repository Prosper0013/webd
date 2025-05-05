/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import type { NextPage } from "next";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import { FaDollarSign, FaPercentage } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import LorisSection from "../components/LorisSection";
import TokenomicsSection from "../components/TokenomicsSection";
import HowToBuySection from "../components/HowToBuySection";
import RoadmapSection from "../components/RoadmapSection";
import AnimatedFooter from "../components/AnimatedFooter";
import { useState, useEffect } from "react";
import { isLowPoweredDevice } from "../utils/performance";

// Animation components with lower priority - keeping only essential ones
const AnimationErrorBoundary = dynamic(
  () => import("../components/AnimationErrorBoundary"),
  { ssr: false }
);

// Only keep necessary animation providers
const SafeAnimationProvider = dynamic(
  () => import("../components/SafeAnimationProvider"),
  { ssr: false }
);

// Removing the animated background and magic trail for a cleaner look

const Header = dynamic(() => import("../components/Header"), { ssr: false });

// Use dynamic imports for better loading performance
const ImageGallerySection = dynamic(
  () => import("../components/ImageGallerySection"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[30vh] w-full bg-gradient-to-r from-gray-800 to-gray-900"></div>
    ),
  }
);

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lowPower = isLowPoweredDevice();
    setIsLowPower(lowPower);
  }, []);

  // Data for various sections
  const tokenomicsData = [
    {
      title: "Total Supply",
      value: "1,000,000,000 $BDOGE",
      icon: <FaDollarSign className="text-3xl text-primary" />,
    },
    {
      title: "Tax",
      value: "0% Buy/Sell",
      icon: <FaDollarSign className="text-3xl text-green-400" />,
    },
  ];

  const roadmapData = [
    {
      phase: "Short-Term Goals",
      description:
        "Community building, meme contests, weekly Telegram VC, and Doge AI introduction",
    },
    {
      phase: "Growth Phase",
      description:
        "CoinMarketCap listing, partnership with Dogecoin KOLs and community expansion",
    },
    {
      phase: "Long-Term Vision",
      description:
        "CEX listings, partnerships with market makers, and substantial growth with token burning rituals",
    },
  ];

  const howToBuySteps = [
    {
      step: 1,
      title: "Create a Wallet",
      description:
        "Download a Web3 wallet like MetaMask and set it up following the instructions.",
    },
    {
      step: 2,
      title: "Add Base Network",
      description:
        "Add Base Chain to your MetaMask (Chain ID: 8453, RPC URL: https://mainnet.base.org).",
    },
    {
      step: 3,
      title: "Get ETH on Base",
      description:
        "Get ETH and bridge it to Base Chain using the Coinbase Bridge or services like Across or Hop.",
    },
    {
      step: 4,
      title: "Swap ETH for $BDOGE",
      description:
        "Visit Baseswap or Aerodrome, connect your wallet, and swap ETH for $BDOGE.",
    },
  ];

  return (
    <SafeAnimationProvider>
      <div
        className="w-full min-h-screen overflow-x-hidden"
        style={{ background: "#085CA6" }}
      >
        <Header />
        <Layout>
          {/* Core content sections with simplified rendering */}
          <HeroSection />

          <AboutSection />

          <LorisSection />
          {/* {mounted && <ImageGallerySection />} */}
          <div
            className="relative z-10"
            // style={{
            //   backgroundImage: "url('/images/bg2.jpg')",
            //   backgroundSize: "contain",
            //   backgroundPosition: "center",
            //   objectFit: "contain",
            // }}
          >
            <TokenomicsSection tokenomicsData={tokenomicsData} />

            <HowToBuySection howToBuySteps={howToBuySteps} />
          </div>
          <RoadmapSection roadmapData={roadmapData} />

          <AnimatedFooter />
        </Layout>
      </div>
    </SafeAnimationProvider>
  );
};

export default Home;
