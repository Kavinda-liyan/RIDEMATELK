import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const HeaderCard = ({ items, interval = 3500, description, duration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(slideTimer);
  }, [items, interval]);

  const currentItem = items[currentIndex];

  return (
    <>
      <div className="card bg-rmlk-dark-light h-full shadow-md rounded-sm overflow-hidden hover:scale-105 duration-300 group">
        <div className="h-[150px] overflow-hidden">
          <div className="h-full flex flex-col items-center justify-center overflow-hidden ">
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                key={currentItem.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: duration,
                  ease: "easeInOut",
                  translateX: 0,
                }}
                className="flex flex-col items-center overflow-hidden"
              >
                <div className="image-container h-36px flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full transition-all duration-500 max-sm-rmlk:w-full object-cover group-hover:scale-110 "
                    src={currentItem.img}
                    alt={currentItem.name}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="h-fit max-sm-rmlk:h-full flex items-center justify-center p-[8px] bg-rmlk-dark-lighter">
          <p className="text-white text-[12px] h-fit max-sm-rmlk:h-full flex item-center justify-center tracking-widest text-center ">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderCard;
