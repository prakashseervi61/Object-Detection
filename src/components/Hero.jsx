import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowUpRight, Target, Zap as ZapIcon, Maximize, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-6 max-w-[1320px] mx-auto w-full text-center relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-primary/10 blur-[10rem] -z-10 rounded-full animate-float [animation-delay:2s]"></div>
      <div className="absolute top-1/2 right-1/4 w-[20rem] h-[20rem] bg-accent/10 blur-[8rem] -z-10 rounded-full animate-float"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-8">
          <span className="bg-primary/10 text-primary px-5 py-2.5 rounded-full text-xs font-extrabold tracking-[0.15em] uppercase border border-primary/15 flex items-center gap-3 shadow-[0_0_40px_rgba(255,51,102,0.05)] animate-float">
            <Sparkles size={14} className="fill-primary text-primary" /> Vision Core v1
          </span>
        </div>

        <h1 className="gradient-text lg:px-40 text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.95] mb-10 tracking-tighter drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          DECODING <br /> REALITY <br /> <span className="text-text-main opacity-90">VIA AI</span>
        </h1>

        <p className="text-text-muted text-[clamp(1rem,3vw,1.25rem)] max-w-2xl mx-auto mb-16 leading-relaxed font-normal tracking-tight">
          Experience hardware-accelerated computer vision that operates entirely on your device. 
          Identify 80+ patterns with near-zero latency and total data integrity.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <Link 
            to="/detect" 
            className="bg-gradient-to-br from-primary to-secondary text-white px-12 py-4 text-base rounded-2xl font-bold shadow-[0_8px_16px_var(--color-primary-glow)] transition-all hover:scale-105 hover:shadow-[0_12px_24px_var(--color-primary-glow)] hover:brightness-110 flex items-center gap-3 w-max"
          >
             BOOT ANALYZER <Play size={18} className="fill-white" />
          </Link>
          <Link 
            to="/docs" 
            className="bg-white/5 text-white border border-border px-12 py-4 rounded-2xl font-bold transition-all hover:bg-white/10 hover:border-white/20 flex items-center gap-3 w-max"
          >
            DOCS CORE <ArrowUpRight size={18} className="opacity-60" />
          </Link>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap justify-center gap-x-20 gap-y-16 mt-48 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 max-w-5xl mx-auto">
           <div className="flex items-center gap-3"><Target size={16} /><span className="font-extrabold text-[10px] tracking-[0.15em]">ACCURACY 98.4%</span></div>
           <div className="flex items-center gap-3"><ZapIcon size={16} /><span className="font-extrabold text-[10px] tracking-[0.15em]">WEBGL 2.0 READY</span></div>
           <div className="flex items-center gap-3"><Maximize size={16} /><span className="font-extrabold text-[10px] tracking-[0.15em]">EDGE PRIVACY</span></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero;
