import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";

const PopupModal = ({ children, action, actionName, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center duration-300 fixed"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-rmlk-dark-lighter rounded-md shadow-md w-[90%] max-w-[520px] flex flex-col"
        >
          <div className="flex flex-col items-center justify-end">
            <button
              onClick={onClose}
              className="flex items-center cursor-pointer p-[8px] self-end text-white"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="p-[8px] items-center justify-center">{children}</div>
          <div className="p-[8px] flex gap-[8px] justify-end">
            <button
              className="px-[8px] py-[4px] text-[12px] bg-blue-600 rounded-md shadow-md  font-rmlk-secondary text-white hover:cursor-pointer hover:bg-blue-500 duration-200"
              onClick={action}
            >
              {actionName}
            </button>
            <button
              onClick={onClose}
              className="px-[8px] py-[4px] text-[12px] border-[1.5px] border-white rounded-md shadow-md font-rmlk-secondary text-white hover:cursor-pointer hover:bg-rmlk-dark/20 duration-200"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupModal;
