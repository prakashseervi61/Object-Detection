import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Cpu, ExternalLink, Activity, Target, Smartphone, Globe, Lock, Brain, Layers, BarChart } from 'lucide-react'

const BentoItem = ({ icon: Icon, title, description, badge, className }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`relative overflow-hidden bg-surface border border-border rounded-3xl backdrop-blur-xl p-8 flex flex-col justify-end transition-all duration-500 hover:border-primary hover:-translate-y-2 hover:scale-[1.02] hover:bg-surface-light hover:shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(255,51,102,0.15)] hover:z-10 group ${className}`}
  >
    {badge && (
      <span className="absolute top-6 right-6 bg-primary/10 text-primary text-[0.65rem] font-extrabold px-2.5 py-1 rounded-lg border border-primary/20 tracking-wider">
        {badge}
      </span>
    )}
    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
      <Icon size={24} />
    </div>
    <h3 className="text-[1.1rem] font-extrabold mb-3 tracking-tight uppercase">{title}</h3>
    <p className="text-text-muted text-[0.85rem] leading-relaxed relative z-10">{description}</p>
    
    {/* Decorative corner accent */}
    <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-tl from-primary/5 to-transparent"></div>
  </motion.div>
)

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 max-w-[1320px] mx-auto w-full relative">
      <div>
        <div className="text-center mb-20">
          <span className="text-primary font-extrabold text-[0.8rem] tracking-[0.3em] uppercase mb-4 block">Capability Pack</span>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-black mb-6 tracking-tight">
            NEXT-GEN <span className="gradient-text">SYSTEMS.</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-[1.1rem] leading-relaxed">
            Deployed with performance-first architectures and privacy-preserving principles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px] gap-6 mt-16">
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-2 lg:row-span-1 lg:h-auto"
            icon={Zap} 
            title="Hardware Acceleration" 
            description="High-speed model inference using direct WebGL kernels for near-zero latency processing." 
            badge="ULTRA FAST"
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-2 lg:h-auto"
            icon={Brain} 
            title="Neural Engine" 
            description="Powered by COCO-SSD, identifying 80+ patterns in milliseconds with peak accuracy." 
            badge="v1"
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-1 lg:h-auto"
            icon={Lock} 
            title="End-to-End Privacy" 
            description="No data transmission. Secure local analysis via edge compute signatures." 
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-1 lg:h-auto"
            icon={Globe} 
            title="Universal" 
            description="Zero-install web native architecture." 
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-1 lg:h-auto"
            icon={Smartphone} 
            title="Mobile Ready" 
            description="Full touch-responsive neural support." 
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-2 lg:h-auto"
            icon={Layers} 
            title="Multi-Layer" 
            description="Concurrent detection of overlapping visual artifacts and spatial patterns." 
            badge="ADVANCED"
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-1 lg:h-auto"
            icon={Target} 
            title="Precision" 
            description="High recall rates across diverse conditions." 
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-1 lg:h-auto"
            icon={Activity} 
            title="Real-time" 
            description="Live diagnostic rendering engine." 
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-1 lg:h-auto"
            icon={BarChart} 
            title="Analytics" 
            description="Instant confidence scoring logic." 
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-2 lg:row-span-1 lg:h-auto"
            icon={Shield} 
            title="Edge Intelligence" 
            description="Advanced computer vision democratized for the consumer web, providing industry-leading visual diagnostics at zero cost." 
            badge="SECURITY"
          />
          <BentoItem 
            className="col-span-1 h-[300px] lg:col-span-1 lg:row-span-1 lg:h-auto"
            icon={ExternalLink} 
            title="Export" 
            description="Seamless data hook integration." 
          />
        </div>
      </div>
    </section>
  )
}

export default Features;
