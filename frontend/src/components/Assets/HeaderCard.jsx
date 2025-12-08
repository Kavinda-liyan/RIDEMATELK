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
      <div className="card bg-rmlk-dark-light h-full shadow-md rounded-xs overflow-hidden">
        <div className="h-[70%] p-[8px]">
          <div className="h-full flex flex-col items-center justify-center overflow-hidden ">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.name}
                initial={{ opacity: 0, scale: 0.95,x:-50 }}
                animate={{ opacity: 1, scale: 1,x:0 }}
                exit={{ opacity: 0, scale: 0.95,x:50 }}
                transition={{ duration: duration, ease: "easeInOut" }}
                className="flex flex-col items-center overflow-hidden"
              >
                <div className="text-container text-white/70 font-rmlk-secondary  h-[36px] font-light">
                  <p className="text-[12px] py-[4px]">{currentItem.name}</p>
                </div>
                <div className="image-container h-36px flex items-center justify-center">
                  <img
                    className="h-[80px] transition-all duration-500 py-2 max-sm-rmlk:h-[50px]"
                    src={currentItem.img}
                    alt={currentItem.name}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="h-[30%] flex items-center justify-center p-[8px] bg-rmlk-dark-lighter">
          <p className="text-white text-[12px] h-fit flex item-center justify-center tracking-widest text-center ">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderCard;
