import React from "react";
import { motion } from "framer-motion";

const Mycomp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      }}
    >
      <div className="text-xs text-blue-500 font-bold">My Component</div>
      <div className="text-2xl font-bold">
        <h1 className="text-2xl ">hello</h1>
      </div>
      {/* write a code prime using javascript*/}
      <div className="font-"></div>
    </motion.div>
  );
};
export default Mycomp;
