import { motion } from "framer-motion";
import CountUp from "react-countup";

const DashboardPillers = ({ phillerName, phillerData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-rmlk-dark-light w-full p-[8px] my-[4px] rounded-md shadow-md border-b-2 border-rmlk-red"
    >
      <div className="flex items-center">
        <div className="h-[8px] w-[8px] bg-rmlk-red mr-[8px] rounded-full"></div>
        <h4 className="text-white ">{phillerName}</h4>
      </div>
      <h2 className="text-center text-[48px] py-[8px] font-semibold text-white">
        <CountUp
          start={0}
          end={phillerData}
          duration={2}
          decimals={0}
          prefix=""
          suffix=""
        />
      </h2>
    </motion.div>
  );
};

export default DashboardPillers;
