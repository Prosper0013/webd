/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";

/**
 * This component injects SVG placeholder images directly into the DOM
 * for use throughout the site where images would normally be loaded.
 */
const PlaceholderImagesComponent: React.FC = () => {
  // Only run this effect on the client side
  useEffect(() => {
    // Create style element
    const style = document.createElement('style');
    
    // Add CSS with data URIs for the placeholder images
    style.textContent = `
      .grass-element {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='60' viewBox='0 0 400 60'%3E%3Cpath d='M0,60 L0,40 C10,35 15,20 20,40 C25,30 30,20 40,30 C50,10 60,30 70,40 C75,30 80,20 90,30 C100,40 110,20 120,30 C130,40 140,30 150,40 C160,20 170,30 180,40 C190,30 200,20 210,30 C220,10 230,30 240,40 C250,30 260,20 270,30 C280,10 290,30 300,40 C310,20 320,30 330,40 C340,30 350,10 360,30 C370,40 380,30 390,20 L400,20 L400,60 Z' fill='%234CAF50' opacity='0.8' /%3E%3Cpath d='M0,60 L0,45 C10,40 15,30 20,45 C25,35 30,25 40,35 C50,20 60,35 70,45 C75,35 80,25 90,35 C100,45 110,25 120,35 C130,45 140,35 150,45 C160,25 170,35 180,45 C190,35 200,25 210,35 C220,15 230,35 240,45 C250,35 260,25 270,35 C280,15 290,35 300,45 C310,25 320,35 330,45 C340,35 350,15 360,35 C370,45 380,35 390,25 L400,25 L400,60 Z' fill='%232E7D32' opacity='0.8' /%3E%3C/svg%3E");
      }
      
      .flower-1 {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='8' fill='%23FF48B0' /%3E%3Ccircle cx='10' cy='20' r='7' fill='%23FF9ED8' /%3E%3Ccircle cx='30' cy='20' r='7' fill='%23FF9ED8' /%3E%3Ccircle cx='20' cy='10' r='7' fill='%23FF9ED8' /%3E%3Ccircle cx='20' cy='30' r='7' fill='%23FF9ED8' /%3E%3Ccircle cx='20' cy='20' r='4' fill='%23FFEA00' /%3E%3C/svg%3E");
      }
      
      .flower-2 {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M20,5 Q25,15 35,20 Q25,25 20,35 Q15,25 5,20 Q15,15 20,5 Z' fill='%239528FF' /%3E%3Ccircle cx='20' cy='20' r='5' fill='%23FFEA00' /%3E%3C/svg%3E");
      }
      
      .flower-3 {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='10' r='8' fill='%2300E1FF' /%3E%3Ccircle cx='10' cy='16' r='8' fill='%238AF4FF' /%3E%3Ccircle cx='30' cy='16' r='8' fill='%238AF4FF' /%3E%3Ccircle cx='15' cy='28' r='8' fill='%2300E1FF' /%3E%3Ccircle cx='25' cy='28' r='8' fill='%2300E1FF' /%3E%3Ccircle cx='20' cy='20' r='5' fill='%23FFEA00' /%3E%3C/svg%3E");
      }
      
      .forest-bg {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='100' viewBox='0 0 800 100'%3E%3Cpath d='M0,100 L0,60 L20,60 L30,40 L40,60 L50,30 L60,60 L80,60 L90,40 L100,60 L110,50 L120,60 L130,45 L140,60 L160,60 L170,30 L180,60 L200,60 L210,40 L220,60 L230,50 L240,60 L260,60 L270,35 L280,60 L300,60 L310,40 L320,60 L340,60 L350,30 L360,60 L370,45 L380,60 L400,60 L410,40 L420,60 L440,60 L450,30 L460,60 L470,40 L480,60 L500,60 L510,45 L520,60 L530,40 L540,60 L560,60 L570,35 L580,60 L600,60 L610,45 L620,60 L630,40 L640,60 L660,60 L670,35 L680,60 L700,60 L710,40 L720,60 L730,45 L740,60 L760,60 L770,40 L780,60 L800,60 L800,100 Z' fill='%23143F23' /%3E%3Cpath d='M0,100 L0,70 L10,70 L20,55 L30,70 L50,70 L60,50 L70,70 L80,65 L90,70 L110,70 L120,55 L130,70 L150,70 L160,45 L170,70 L190,70 L200,60 L210,70 L230,70 L240,50 L250,70 L270,70 L280,55 L290,70 L310,70 L320,45 L330,70 L350,70 L360,60 L370,70 L380,55 L390,70 L410,70 L420,50 L430,70 L450,70 L460,55 L470,70 L490,70 L500,45 L510,70 L520,60 L530,70 L550,70 L560,50 L570,70 L590,70 L600,55 L610,70 L620,55 L630,70 L650,70 L660,45 L670,70 L690,70 L700,60 L710,70 L730,70 L740,50 L750,70 L770,70 L780,55 L790,70 L800,70 L800,100 Z' fill='%230D2712' /%3E%3C/svg%3E");
      }
      
      [data-sparkle-bg] {
        position: relative;
      }
      
      [data-sparkle-bg]::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cg opacity='0.5'%3E%3Ccircle cx='80' cy='80' r='3' fill='white' /%3E%3Ccircle cx='140' cy='180' r='2' fill='white' /%3E%3Ccircle cx='250' cy='60' r='4' fill='white' /%3E%3Ccircle cx='300' cy='300' r='3' fill='white' /%3E%3Ccircle cx='370' cy='120' r='2' fill='white' /%3E%3Ccircle cx='100' cy='250' r='3' fill='white' /%3E%3Ccircle cx='180' cy='340' r='2' fill='white' /%3E%3Ccircle cx='220' cy='240' r='4' fill='white' /%3E%3Ccircle cx='340' cy='190' r='3' fill='white' /%3E%3Cpath d='M120,100 L125,105 L130,100 L125,95 Z' fill='white' /%3E%3Cpath d='M280,280 L285,285 L290,280 L285,275 Z' fill='white' /%3E%3Cpath d='M350,220 L355,225 L360,220 L355,215 Z' fill='white' /%3E%3Cpath d='M170,200 L175,205 L180,200 L175,195 Z' fill='white' /%3E%3C/g%3E%3C/svg%3E");
        background-size: 400px 400px;
        background-repeat: repeat;
        opacity: 0.3;
        z-index: -1;
        pointer-events: none;
      }
      
      /* Disney-style glass morphism effect */
      .glass-morphism {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 25px rgba(149, 40, 255, 0.15);
      }
      
      /* Disney sparkle animation */
      .disney-sparkle {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: white;
        box-shadow: 0 0 10px 2px white;
        animation: sparkle 2s ease-in-out infinite;
        z-index: 5;
      }
      
      @keyframes sparkle {
        0%, 100% { transform: scale(0.5); opacity: 0.3; }
        50% { transform: scale(1.2); opacity: 1; }
      }

      /* Magical text effect */
      .magical-text {
        position: relative;
        color: white;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                     0 0 20px rgba(149, 40, 255, 0.7);
      }
      
      .magical-text:after {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        color: transparent;
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
      }
    `;
    
    // Append to head
    document.head.appendChild(style);
    
    return () => {
      // Cleanup
      document.head.removeChild(style);
    };
  }, []);

  // Return null to avoid rendering anything (prevents hydration issues)
  return null;
};

export default PlaceholderImagesComponent;
