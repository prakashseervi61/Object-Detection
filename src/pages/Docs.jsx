import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Cpu, Code, Zap, ArrowRight, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocSection = ({ title, icon: Icon, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(255,51,102,0.1)]">
        <Icon size={20} />
      </div>
      <h2 className="text-2xl font-black tracking-tight">{title}</h2>
    </div>
    <div className="bg-surface/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm prose prose-invert max-w-none text-text-muted">
      {children}
    </div>
  </motion.div>
);

const Docs = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-[900px] mx-auto w-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase mb-6 text-primary">
          <BookOpen size={14} /> Documentation
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter loading-none">
          DOCS <span className="gradient-text">CORE.</span>
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
          Technical specifications and architecture details for the AI Vision Engine deployment.
        </p>
      </motion.div>

      {/* Content */}
      <div className="space-y-4">
        
        <DocSection title="Architecture Overview" icon={Cpu}>
          <p className="mb-4 text-base leading-relaxed">
            AI Vision operates using a <strong>Web-Native Edge Architecture</strong>. Unlike traditional cloud-based computer vision APIs, this engine downloads a quantized neural network payload directly into the browser's memory buffer upon initialization (specifically the <code>COCO-SSD</code> topology).
          </p>
          <p className="text-base leading-relaxed">
            By utilizing the <code>@tensorflow/tfjs</code> library, the system hijacks the local GPU via WebGL 2.0 to perform highly parallelized matrix multiplications. This allows sub-millisecond inference speeds after the initial tensor conversion, entirely bypassing network latency.
          </p>
        </DocSection>

        <DocSection title="Security & Privacy Boundary" icon={Shield}>
          <p className="mb-4 text-base leading-relaxed">
            Security is guaranteed by the inherent sandbox of the modern browser. Because inference happens locally, the following architectural guarantees apply:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-primary">
            <li><strong>Zero Data Exfiltration:</strong> Images uploaded to the buffer are never serialized or transmitted across any network boundary.</li>
            <li><strong>No Cloud Storage:</strong> The engine does not utilize cloud buckets (like S3) for temporary processing paths.</li>
            <li><strong>Offline Capability:</strong> Once the neural weights are cached, the engine can theoretically perform detections without an active internet connection.</li>
          </ul>
        </DocSection>

        <DocSection title="The COCO-SSD Model" icon={Brain}>
          <p className="mb-4 text-base leading-relaxed">
            The core intelligence is powered by <code>COCO-SSD</code> (Common Objects in Context - Single Shot MultiBox Detector). This model provides an optimal balance between low memory footprint (crucial for browser clients) and high recall accuracy.
          </p>
          <div className="bg-[#050505] p-5 rounded-xl border border-white/10 my-6 font-mono text-sm text-emerald-400">
            {`// Internal Model Flow
const start_inference = (image_matrix) => {
  1. Flatten image to RGB tensor [1, width, height, 3]
  2. Normalize tensor bounds
  3. Feed-forward through MobileNetV2 feature extractor
  4. Output bounding box array [x, y, w, h] + confidence[0-1]
}`}
          </div>
          <p className="text-base leading-relaxed text-yellow-500/80">
            Note: As a photographic-trained model, COCO-SSD expects realistic lighting, textures, and shading. Vector graphics, cartoons, or highly stylized illustrations will yield extreme confidence drops or zero detections.
          </p>
        </DocSection>

        <DocSection title="Performance Tuning" icon={Zap}>
          <p className="text-base leading-relaxed mb-4">
            If you are integrating this engine into your own specific pipeline, consider these optimization points:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-primary">
            <li><strong>Image Downsampling:</strong> Passing native 4K matrices into the <code>detect()</code> method forces the GPU to downsample on the fly. Pre-scaling images to roughly 640x640 can drastically reduce memory spikes.</li>
            <li><strong>Thresholding:</strong> The default confidence threshold is set to <code>0.60</code>. For noisier environments, raising this to <code>0.75</code> cuts out false positives.</li>
          </ul>
        </DocSection>

      </div>

      {/* Interactive Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 flex flex-col items-center justify-center p-12 bg-primary/5 rounded-3xl border border-primary/20 text-center"
      >
        <Code size={40} className="text-primary mb-6 animate-pulse" />
        <h3 className="text-2xl font-black mb-4">Ready to test the engine?</h3>
        <p className="text-text-muted mb-8 max-w-md mx-auto">
          Boot the local diagnostic sandbox to see real-time bounding box construction.
        </p>
        <Link 
          to="/detect" 
          className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,51,102,0.3)] transition-all flex items-center gap-2"
        >
          Initialize Sandbox <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Docs;
