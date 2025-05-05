/* eslint-disable react/no-unescaped-entities */
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";
const ParticlesBg = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  const customInit = async (engine: Engine): Promise<void> => {
    // this adds the preset to tsParticles, you can safely use the
    await loadStarsPreset(engine);
  };
  return (
    <Particles
      className="absolute top-0 right-0 bottom-0 left-0"
      id="tsparticles"
      init={customInit}
      // loaded={particlesLoaded}
      options={{
        preset: "stars",
        fullScreen: false,
      }}
    />
  );
};
export default ParticlesBg;
