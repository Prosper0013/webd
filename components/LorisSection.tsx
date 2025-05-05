/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import ExportedImage from "next-image-export-optimizer";
import Image from "next/image";

const LorisSection: React.FC = () => {
  const wobbleVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [-2, 2, -2, 2, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        type: "tween",
      },
    },
  };

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

  // Shared background styling with unique image paths
  const getBackgroundStyle = (imagePath: string) => ({
    background: "#085CA6",
    backgroundImage: `url('${imagePath}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "2rem 1.5rem 3rem",
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#085CA6",
      }}
    >
      {/* Consistent pattern background */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
        style={getBackgroundStyle("/images/bg.jpg")}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-5">
          <div className="md:flex items-center gap-12 mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                initial="initial"
                animate="animate"
                variants={bounceVariants}
                className="relative"
              >
                <ExportedImage
                  src="/images/5.jpg"
                  alt="Based Doge Vision"
                  width={600}
                  height={500}
                  className="rounded-standard relative z-10 w-full h-auto"
                  style={{
                    border: "3px solid #000",
                  }}
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-babyBlue/70 backdrop-blur-md p-8 rounded-standard"
                style={{
                  border: "3px solid #000",
                }}
              >
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="text-white text-2xl mb-4 font-bold">Vision</h4>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative comic-bubble bg-babyBlue/95 p-5 border-3 border-black rounded-standard">
                    <div className="absolute -left-5 top-10 w-10 h-10 bg-babyBlue/95 border-l-3 border-b-3 border-black transform rotate-45"></div>
                    <p className="text-white leading-relaxed font-medium text-lg">
                      To establish a premier Doge Community on Base Chain and to
                      provide a safe space for all crypto enthusiastics.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Header Section */}

      {/* Community Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
        style={getBackgroundStyle("/images/bgc.jpg")}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
          // style={getBackgroundStyle("/images/bgd.jpg")}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-20 py-5">
            <motion.h2
              variants={wobbleVariants}
              initial="initial"
              animate="animate"
              className="font-[pricedown] text-center text-5xl md:text-7xl mb-8 text-white"
            >
              THE COMMUNITY
            </motion.h2>

            <h3 className="text-center text-3xl text-white mb-12 font-bold tracking-wide">
              DO ONLY GOOD EVERYDAY
            </h3>
          </div>
        </motion.div>
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-5">
          <div className="md:flex items-center gap-12 mb-16 flex-row-reverse">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                initial="initial"
                animate="animate"
                variants={bounceVariants}
                className="relative"
              >
                <ExportedImage
                  src="/images/6.jpg"
                  alt="Based Doge Community"
                  width={600}
                  height={500}
                  className="rounded-standard relative z-10 w-full h-auto"
                  style={{
                    border: "3px solid #000",
                  }}
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-babyBlue/70 backdrop-blur-md p-8 rounded-standard"
                style={{
                  border: "3px solid #000",
                }}
              >
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="text-white text-2xl mb-4 font-bold">
                    Community
                  </h4>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative comic-bubble bg-babyBlue/95 p-5 border-3 border-black rounded-standard">
                    <div className="absolute -right-5 top-10 w-10 h-10 bg-babyBlue/95 border-r-3 border-t-3 border-black transform rotate-45"></div>
                    <p className="text-white leading-relaxed font-medium text-lg">
                      Based Doge is a community take over, with no team
                      allocation, pre-sale allocation and a burn liquidity pool.
                      In fact, there is no formal team. Based Doge is a
                      collection of energetic Base enthusiast who see the
                      opportunity to create the greatest DOGE community on base
                      through transparency and community building. No tricks, no
                      lies, no snake oil, and no rich hoomen mentality, just
                      straight Doge and masters of memes.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Community Ethos Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
        style={getBackgroundStyle("/images/8.jpg")}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-5">
          <div className="md:flex items-center gap-12 mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                initial="initial"
                animate="animate"
                variants={bounceVariants}
                className="relative"
              >
                <ExportedImage
                  src="/images/7.jpg"
                  alt="Based Doge Ethos"
                  width={600}
                  height={500}
                  className="rounded-standard relative z-10 w-full h-auto"
                  style={{
                    border: "3px solid #000",
                  }}
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-babyBlue/70 backdrop-blur-md p-8 rounded-standard"
                style={{
                  border: "3px solid #000",
                }}
              >
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="text-white text-2xl mb-4 font-bold">
                    Community Ethos
                  </h4>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative comic-bubble bg-babyBlue/95 p-5 border-3 border-black rounded-standard">
                    <div className="absolute -left-5 top-10 w-10 h-10 bg-babyBlue/95 border-l-3 border-b-3 border-black transform rotate-45"></div>
                    <p className="text-white leading-relaxed font-medium text-xl text-center font-bold">
                      We embrace transparency, community building, and the ethos
                      of "DO ONLY GOOD EVERYDAY," inspired by the original
                      Dogecoin philosophy.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Short Term Goal Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
        style={getBackgroundStyle("/images/bgc.jpg")}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-5">
          <div className="md:flex items-center gap-12 mb-12 flex-row-reverse">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                initial="initial"
                animate="animate"
                variants={bounceVariants}
                className="relative"
              >
                <ExportedImage
                  src="/images/8.jpg"
                  alt="Based Doge Short Term Goal"
                  width={600}
                  height={500}
                  className="rounded-standard relative z-10 w-full h-auto"
                  style={{
                    border: "3px solid #000",
                  }}
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-babyBlue/70 backdrop-blur-md p-8 rounded-standard"
                style={{
                  border: "3px solid #000",
                }}
              >
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="text-white text-2xl mb-4 font-bold">
                    Short Term Goal
                  </h4>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative comic-bubble bg-babyBlue/95 p-5 border-3 border-black rounded-standard">
                    <div className="absolute -right-5 top-10 w-10 h-10 bg-babyBlue/95 border-r-3 border-t-3 border-black transform rotate-45"></div>
                    <p className="text-white leading-relaxed font-medium text-lg">
                      To build a vibrant and engaged community across all
                      platforms, achieve significant trading volume on
                      decentralized exchanges, and secure strategic partnerships
                      within the Base ecosystem. Our immediate focus is on
                      community engagement, brand awareness, and establishing a
                      solid foundation for sustainable growth.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Long Term Goal Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
        style={getBackgroundStyle("/images/bgd.jpg")}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-5">
          <div className="md:flex items-center gap-12 mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div
                initial="initial"
                animate="animate"
                variants={bounceVariants}
                className="relative"
              >
                <ExportedImage
                  src="/images/9.jpg"
                  alt="Based Doge Long Term Goal"
                  width={600}
                  height={500}
                  className="rounded-standard relative z-10 w-full h-auto"
                  style={{
                    border: "3px solid #000",
                  }}
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                whileHover={{
                  scale: 1.01,
                }}
                className="bg-babyBlue/70 backdrop-blur-md p-8 rounded-standard"
                style={{
                  border: "3px solid #000",
                }}
              >
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="text-white text-2xl mb-4 font-bold">
                    Long Term Goal
                  </h4>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative comic-bubble bg-babyBlue/95 p-5 border-3 border-black rounded-standard">
                    <div className="absolute -left-5 top-10 w-10 h-10 bg-babyBlue/95 border-l-3 border-b-3 border-black transform rotate-45"></div>
                    <p className="text-white leading-relaxed font-medium text-lg">
                      To establish Based Doge as the premier meme token on Base
                      Chain through community building, strategic partnerships,
                      and innovative DeFi solutions. We aim to evolve beyond
                      just a meme token into a full ecosystem that provides real
                      utility while staying true to our fun, community-driven
                      roots.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LorisSection;
