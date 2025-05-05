import "../styles/globals.css";
import "../styles/theme.css";
import VideoLoader from '../components/VideoLoader';
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <VideoLoader />
      <Component {...pageProps} />
    </>
  );
}
function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Ensure the body doesn't overflow and handle client-side only code
  useEffect(() => {
    setMounted(true);

    // Fix for iOS height issues
    const setViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    // Stop any potential body overflow issues
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.overflowX = "hidden";

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setReducedMotion(prefersReducedMotion.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    prefersReducedMotion.addEventListener("change", handleReducedMotionChange);
    window.addEventListener("resize", setViewportHeight, { passive: true });
    setViewportHeight();

    return () => {
      prefersReducedMotion.removeEventListener(
        "change",
        handleReducedMotionChange
      );
      window.removeEventListener("resize", setViewportHeight);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Reset CSS for better cross-browser consistency */}
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          body { margin: 0; padding: 0; min-height: 100vh; text-rendering: optimizeSpeed; }
          img, picture { max-width: 100%; display: block; }
          svg { display: inline-block; vertical-align: middle; }
        `}</style>

        <title>BasedDoge - The Most Based Meme Coin Ever</title>
        <meta
          property="og:title"
          content="BasedDoge - The Most Based Meme Coin Ever"
        />
        <meta
          name="description"
          content="BasedDoge is here to bring the most based experience to the crypto space with tremendous wow factor."
        />
        <meta
          property="og:description"
          content="BasedDoge is here to bring the most based experience to the crypto space with tremendous wow factor."
        />
        <meta property="og:url" content="https://baseddoge.com" />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#f7931a" />
      </Head>

      {/* Load Google Fonts via next/script to avoid render blocking */}

      {/* Conditionally render to prevent hydration mismatch */}
      <div
        style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s" }}
        className={reducedMotion ? "reduced-motion" : ""}
        id="app-root"
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
