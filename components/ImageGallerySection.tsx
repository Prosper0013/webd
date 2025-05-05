/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ExportedImage from "next-image-export-optimizer";
import ApologyBadge from "./ApologyBadge";

const ImageGallerySection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Images to be used in the gallery
  const images = [
    { id: 1, src: "/images/1.jpg", alt: "Sorry Image 1" },
    { id: 2, src: "/images/2.jpg", alt: "Sorry Image 2" },
    { id: 3, src: "/images/3.jpg", alt: "Sorry Image 3" },
    { id: 4, src: "/images/4.jpg", alt: "Sorry Image 4" },
    { id: 5, src: "/images/5.jpg", alt: "Sorry Image 5" },
    { id: 6, src: "/images/6.jpg", alt: "Sorry Image 6" },
    { id: 7, src: "/images/7.jpg", alt: "Sorry Image 7" },
  ];

  // Optimize image loading
  const imageSizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw";

  if (!mounted) return null;

  return (
    <section
      id="gallery"
      className="px-6 md:px-20 py-24 relative overflow-hidden"
      style={{
        background: "#89CFF0",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.05)",
      }}
    >
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      {/* Elegant title section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-10"
      >
        <h2 className="font-[pricedown] text-center text-5xl md:text-7xl mb-4 py-3 text-black">
          The $SORRY Gallery
        </h2>

        {/* Subtle underline */}
        <div className="w-[180px] h-[3px] bg-black/70 rounded-full mx-auto" />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <ApologyBadge text="Sorry for the cuteness overload" color="#000" />
        <ApologyBadge text="Adorably apologetic" color="#000" />
        <ApologyBadge text="Slow loris, quick apologies" color="#000" />
      </div>

      <motion.p
        className="text-center text-black text-xl max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Explore our collection of adorable slow loris images showing just how
        sorry we really are! Each face is a sincere apology for crypto's broken
        promises.
      </motion.p>

      {/* Realistic wall-mounted image gallery */}
      <div
        className="max-w-6xl mx-auto relative"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* Simulated wall texture layer */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "url('/images/wall-texture.jpg')",
            backgroundSize: "cover",
            filter: "contrast(120%) brightness(120%)",
            mixBlendMode: "overlay",
          }}
        ></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-2 lg:gap-3 relative z-10">
          {images.map((image, index) => {
            // More varied and realistic rotation
            const rotation =
              index % 3 === 0
                ? -3 - Math.random() * 2
                : index % 5 === 0
                ? 3 + Math.random() * 2
                : index % 2 === 0
                ? -1 - Math.random() * 1
                : 1 + Math.random() * 1;

            // Staggered animation delay
            const delay = 0.08 * Math.min(index, 5);

            // Create a masonry-like effect with more varied heights
            const heightVariation =
              index % 7 === 0
                ? "3/4"
                : index % 5 === 0
                ? "1/1"
                : index % 3 === 0
                ? "4/5"
                : index % 2 === 0
                ? "3/5"
                : "4/3";

            // Position offsets for a more natural, slightly messy look
            const offsetX =
              index % 2 === 0 ? -Math.random() * 3 : Math.random() * 3;
            const offsetY =
              index % 3 === 0 ? -Math.random() * 3 : Math.random() * 3;

            // Z-index for layering effect
            const zIndex = 5 + Math.floor(Math.random() * 5);

            return (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: delay,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.03,
                  x: offsetX / 2, // Half the offset for subtle movement
                  y: offsetY / 2,
                  rotate: rotation / 2, // Half the rotation for subtle movement
                  zIndex: 20,
                  boxShadow:
                    "0 20px 25px rgba(0,0,0,0.3), 0 10px 10px rgba(0,0,0,0.2)",
                  filter: "brightness(1.05)",
                }}
                className="relative overflow-hidden"
                style={{
                  aspectRatio: heightVariation,
                  transformOrigin: "center",
                  borderRadius: "1px",
                  border: "5px solid white",
                  backgroundColor: "white",
                  boxShadow: `0 ${5 + Math.abs(rotation)}px ${
                    10 + Math.abs(rotation) * 2
                  }px rgba(0,0,0,${0.2 + Math.abs(rotation) * 0.01})`,
                  transition: "all 0.4s ease",
                  margin: "5px",
                  zIndex: zIndex,
                }}
                // Fix: Use Framer Motion's x, y, and rotate properties instead of CSS transform
                animate={{
                  x: offsetX,
                  y: offsetY,
                  rotate: rotation,
                }}
              >
                <ExportedImage
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  loading="lazy"
                  sizes={imageSizes}
                  quality={90}
                  style={{
                    objectFit: "cover",
                  }}
                />

                {/* Subtle image grain effect */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "url('/images/grain.png')",
                    backgroundSize: "200px 200px",
                    mixBlendMode: "overlay",
                  }}
                />

                {/* Subtle overlay with slightly reduced opacity */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-30 transition-opacity duration-300"
                  style={{ mixBlendMode: "overlay" }}
                />

                {/* More realistic tape effects */}
                {index % 2 === 0 ? (
                  <div
                    className="absolute top-[-8px] left-[calc(50%-10px)] w-[20px] h-[16px] opacity-90"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(240,240,240,0.7))",
                      boxShadow: "0 3px 5px rgba(0,0,0,0.15)",
                      borderRadius: "0 0 3px 3px",
                      transformOrigin: "top center",
                      transform: "rotate(-1deg)",
                    }}
                  />
                ) : (
                  <div
                    className="absolute top-[-8px] right-[calc(30%-10px)] w-[20px] h-[16px] opacity-90"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(240,240,240,0.7))",
                      boxShadow: "0 3px 5px rgba(0,0,0,0.15)",
                      borderRadius: "0 0 3px 3px",
                      transformOrigin: "top center",
                      transform: "rotate(1deg)",
                    }}
                  />
                )}

                {/* Add second tape piece for more realistic hanging */}
                {index % 3 === 0 && (
                  <div
                    className="absolute bottom-[-8px] right-[calc(40%-10px)] w-[20px] h-[16px] opacity-90"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(255,255,255,0.9), rgba(240,240,240,0.7))",
                      boxShadow: "0 -3px 5px rgba(0,0,0,0.15)",
                      borderRadius: "3px 3px 0 0",
                      transformOrigin: "bottom center",
                      transform: "rotate(-1deg)",
                    }}
                  />
                )}

                {/* Edge wear effect for realism */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 4px rgba(0,0,0,0.1)",
                    borderRadius: "1px",
                  }}
                />

                {/* Subtle finger smudge in corner for extra realism */}
                {index % 4 === 0 && (
                  <div
                    className="absolute bottom-[20%] right-[20%] w-[30px] h-[30px] opacity-5 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, #000 0%, transparent 70%)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Subtle decorative elements */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-[100px] z-0"
        style={{ background: "var(--sorry-pink)" }}
        animate={{
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] z-0"
        style={{ background: "var(--primary-purple)" }}
        animate={{
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
};

export default ImageGallerySection;
