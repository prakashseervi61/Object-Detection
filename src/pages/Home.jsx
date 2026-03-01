import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Features from '../components/Features'
import SupportedObjects from '../components/SupportedObjects'
import { Upload, Scan, CheckCircle2, CloudOff, Cpu, Brain, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

const ModernStep = ({ number, title, description, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="relative group h-full"
  >
    <div className="bg-surface backdrop-blur-xl border border-transparent rounded-3xl p-10 h-full flex flex-col items-start gap-6 hover:border-primary/20 hover:-translate-y-2 hover:shadow-2xl hover:bg-surface-light transition-all duration-500 shadow-xl shadow-black/20">
      <div className="flex justify-between items-start w-full">
        <div className="w-14 h-14 rounded-xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Icon size={24} />
        </div>
        <span className="text-5xl font-black text-white/5 leading-none">
          {number}
        </span>
      </div>
      
      <div>
        <h4 className="text-xl font-extrabold mb-4 uppercase tracking-widest text-text-main">
          {title}
        </h4>
        <p className="text-text-muted text-[0.95rem] leading-relaxed font-normal">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-6 flex items-center gap-2 text-[0.7rem] font-bold tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        LEARN CORE <ArrowRight size={12} />
      </div>
    </div>
  </motion.div>
)

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      
      {/* MODERN WORKFLOW SECTION */}
      <section className="py-20 px-6 md:py-[120px] relative overflow-hidden">
        {/* Decorative Grid Backdrop */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[length:100px_100px] bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)]" 
        ></div>

        
        <div className="max-w-[1320px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 text-center md:text-left px-4 md:px-0">
            <div className="w-full md:w-1/2">
              <span className="text-primary font-extrabold text-[0.8rem] tracking-[0.3em] uppercase mb-6 block">Architecture</span>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-6 tracking-tighter leading-none">
                HOW IT <span className="gradient-text">WORKS.</span>
              </h2>
            </div>
            <p className="w-full md:w-1/3 text-text-muted text-[1.1rem] leading-relaxed">
              Advanced vision processing architected for speed, security, and sub-millisecond local precision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModernStep 
              number="01" 
              title="Initialization" 
              description="Securely bridges the neural model weights into the browser's high-speed memory buffer." 
              icon={Cpu}
              delay={0}
            />
            <ModernStep 
              number="02" 
              title="Sync Load" 
              description="Processes visual artifacts through a hardware-accelerated local processing sandbox." 
              icon={Upload}
              delay={0.15}
            />
            <ModernStep 
              number="03" 
              title="Deep Scan" 
              description="Executes a sub-pixel diagnostic scan against 80+ pre-trained neural signatures." 
              icon={Scan}
              delay={0.3}
            />
            <ModernStep 
              number="04" 
              title="Secure Logic" 
              description="Finalized detections are rendered instantly with 100% data integrity and zero latency." 
              icon={ShieldCheck}
              delay={0.45}
            />
          </div>
        </div>
      </section>

      <Features />
      <SupportedObjects />

      {/* TECH SPEC GLASS SECTION */}
      <section className="py-20 px-6 md:py-[120px]">
        <div className="max-w-[1320px] mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl shadow-2xl shadow-black border border-white/5 bg-gradient-to-br from-[#0f0f14]/40 to-[#050505]/60" 
          >

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 md:p-20 border-b md:border-b-0 md:border-r border-white/5 relative z-10 bg-black/20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_var(--color-primary-glow)] mb-10">
                  <Zap size={28} color="white" fill="white" />
                </div>
                <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-black mb-8 tracking-tighter leading-none">EDGE <br /> INTELLIGENCE.</h3>
                <p className="text-text-muted text-[1.1rem] leading-relaxed mb-10">
                   Democratizing professional-grade computer vision by moving the compute from the cloud directly to the user's silicon.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-extrabold tracking-widest uppercase">WEBGL 2.0</div>
                  <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-extrabold tracking-widest uppercase">V8 BUFFER</div>
                </div>
              </div>
              
              <div className="p-12 md:p-20 flex flex-col justify-center bg-primary/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none text-primary">
                   <Brain size={400} />
                </div>
                
                <div className="space-y-10 relative z-10 w-full">
                  <div className="flex items-start gap-6">
                    <CheckCircle2 size={24} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-extrabold mb-2 tracking-widest uppercase">MODEL SYNC</h5>
                      <p className="text-text-muted text-[0.9rem] leading-relaxed">Real-time synchronization with COCO-SSD high-recall dataset.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <CheckCircle2 size={24} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-extrabold mb-2 tracking-widest uppercase">SECURE BUFFER</h5>
                      <p className="text-text-muted text-[0.9rem] leading-relaxed">Images never leave client memory. Zero data retransmission.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <CheckCircle2 size={24} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-extrabold mb-2 tracking-widest uppercase">HIGH RECALL</h5>
                      <p className="text-text-muted text-[0.9rem] leading-relaxed">Accurate detection across 80+ object categories with confidence scoring.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center">
         <div className="max-w-[1320px] mx-auto w-full flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_var(--color-primary-glow)]">
                  <Scan size={14} color="white" />
               </div>
               <span className="font-black tracking-widest text-[1.1rem]">AI VISION</span>
            </div>
            <p className="text-text-muted text-[0.85rem]">© 2026 Neural Engine Research Lab. All rights reserved.</p>
         </div>
      </footer>
    </div>
  )
}

export default Home;
