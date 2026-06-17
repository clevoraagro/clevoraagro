'use client';

import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, width = '100%', yOffset = 50 }) {
  return (
    <motion.div
      style={{ width }}
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
