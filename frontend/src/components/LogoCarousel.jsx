import { useLayoutEffect, useRef, memo } from "react";
import { motion, useAnimation } from "framer-motion";

import audi from "../assets/logo/audi.svg";
import bmw from "../assets/logo/bmw.svg";
import ford from "../assets/logo/ford.svg";
import honda from "../assets/logo/honda.svg";
import toyota from "../assets/logo/toyota.svg";
import byd from "../assets/logo/byd.svg";
import dfsk from "../assets/logo/dfsk.svg";
import chery from "../assets/logo/chery.svg";
import fiat from "../assets/logo/fiat.svg";
import hyundai from "../assets/logo/hyundai.svg";
import jac from "../assets/logo/jac.svg";
import jeep from "../assets/logo/jeep.svg";
import nissan from "../assets/logo/nissan.svg";

const logos = [
  audi,
  bmw,
  honda,
  toyota,
  ford,
  byd,
  dfsk,
  chery,
  fiat,
  hyundai,
  jac,
  jeep,
  nissan,
];

const LogoCarousel = memo(() => {
  const controls = useAnimation();
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    requestAnimationFrame(() => {
      const width = trackRef.current.scrollWidth / 2;

      if (width === 0) return;

      controls.start({
        x: [0, -width],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        },
      });
    });
  }, [controls]);

  return (
    <section className="relative w-full bg-rmlk-dark-lighter overflow-hidden">
      {/* Viewport */}
      <div className="relative h-[80px] w-full overflow-hidden flex items-center">
        {/* Moving Track */}
        <motion.div
          ref={trackRef}
          animate={controls}
          className="absolute left-0 flex w-max items-center gap-[24px] will-change-transform"
        >
          {[...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex-shrink-0">
              <img
                src={logo}
                alt={`logo-${idx}`}
                className="w-[50px] object-contain select-none"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default LogoCarousel;
