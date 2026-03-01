import React from 'react'
import { motion } from 'framer-motion'
import ObjectDetector from '../components/ObjectDetector'
import { Scan } from 'lucide-react'

const Detector = () => {
  return (
    <div className="w-full">
      <section className="pt-40 pb-20 px-6 max-w-[1040px] mx-auto w-full">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_var(--color-primary-glow)] animate-float">
                <Scan className="text-white" size={32} />
             </div>
          </div>
          <h1 className="gradient-text text-5xl font-black mb-4 tracking-tighter">Visual Analysis</h1>
          <p className="text-text-muted text-lg">Identify objects in high-resolution with sub-millisecond precision.</p>
        </motion.div>
        
        <ObjectDetector />
      </section>
    </div>
  )
}

export default Detector;
