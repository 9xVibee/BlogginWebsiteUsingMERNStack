import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper = ({
  keyVal,
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 0.8 },
  classname,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyVal}
        initial={initial}
        animate={animate}
        transition={transition}
        className={classname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
