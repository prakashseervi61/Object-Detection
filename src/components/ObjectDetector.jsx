import React, { useState, useEffect, useRef, useMemo } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, Scan, Loader2, Sparkles, Image as ImageIcon, 
  RotateCcw, SlidersHorizontal, Eye, EyeOff, Activity, Box, Camera
} from 'lucide-react'

// Color palette for consistent class coloring
const CLASS_COLORS = [
  '#ff3366', // Primary Red-Pink
  '#00ffa3', // Emerald
  '#00b8ff', // Cyan
  '#ff9933', // Orange
  '#b142f5', // Purple
  '#ffff00', // Yellow
  '#ff00b3', // Magenta
  '#00ff22', // Neon Green
];

const getColorForClass = (className) => {
  let hash = 0;
  for (let i = 0; i < className.length; i++) {
    hash = className.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CLASS_COLORS[Math.abs(hash) % CLASS_COLORS.length];
};

const ObjectDetector = () => {
  const [model, setModel] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [rawPredictions, setRawPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [hasScanned, setHasScanned] = useState(false)
  
  // New State Requirements
  const [inferenceTime, setInferenceTime] = useState(null)
  const [threshold, setThreshold] = useState(0.5)
  const [showScores, setShowScores] = useState(true)

  const imageRef = useRef(null)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Initializing TensorFlow backend...");
        await tf.setBackend('webgl');
        await tf.ready();
        console.log("TF.js Backend currently active:", tf.getBackend());
        
        console.log("Loading COCO-SSD model...");
        const loadedModel = await cocoSsd.load();
        
        console.log("Model successfully loaded into memory.");
        setModel(loadedModel);
        setIsLoading(false);
      } catch (error) {
        console.error("CRITICAL ERROR: Failed to load TensorFlow model or backend:", error);
      }
    }
    loadModel();
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImageSrc(event.target.result)
        setRawPredictions([])
        setInferenceTime(null)
        setHasScanned(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageLoad = (e) => {
    setImageDimensions({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    })
  }

  const detectObjects = async () => {
    console.log("detectObjects triggered. Checking preconditions...");
    if (!model) {
      console.warn("Detection aborted: Model is not loaded.");
      return;
    }
    if (!imageRef.current) {
      console.warn("Detection aborted: imageRef.current is null.");
      return;
    }
    
    // Ensure we have dimensions even if onLoad didn't fire
    const natWidth = imageRef.current.naturalWidth;
    const natHeight = imageRef.current.naturalHeight;
    console.log(`Image natural dimensions: ${natWidth}x${natHeight}`);
    
    if (!natWidth) {
      console.error("Detection aborted: Image naturalWidth is 0. Image not fully loaded into DOM yet.");
      return;
    }

    if (imageDimensions.width === 0) {
      console.log("Updating imageDimensions state fallback...");
      setImageDimensions({ width: natWidth, height: natHeight });
    }

    setIsAnalyzing(true);
    console.log("Starting detection process...");
    
    // Smooth artificial delay to show loader
    await new Promise(r => setTimeout(r, 600));
    
    try {
      // Create a pure off-screen image to ensure CSS layout resizing doesn't skew the AI coordinate matrix
      const scanImage = new Image();
      scanImage.crossOrigin = "anonymous";
      scanImage.src = imageSrc;
      
      await new Promise((resolve, reject) => {
        scanImage.onload = resolve;
        scanImage.onerror = reject;
      });

      console.log(`Scanning pure image at intrinsic resolution: ${scanImage.width}x${scanImage.height}`);
      
      const start = performance.now();
      const results = await model.detect(scanImage);
      const end = performance.now();
      
      console.log("TF.js Detection Success!");
      console.log("Raw Predictions Array:", results);
      console.log(`Inference took: ${(end - start).toFixed(1)}ms`);
      
      setInferenceTime((end - start).toFixed(1));
      setRawPredictions(results);
      setHasScanned(true);
    } catch (err) {
      console.error("CRITICAL RUNTIME ERROR during model.detect():", err);
    } finally {
      setIsAnalyzing(false);
    }
  }

  // Filter predictions based on user threshold slider
  const filteredPredictions = useMemo(() => {
    return rawPredictions.filter(p => p.score >= threshold);
  }, [rawPredictions, threshold]);

  return (
    <div className="bg-surface backdrop-blur-xl border border-border rounded-3xl p-6 md:p-12 shadow-2xl transition-all duration-400">
      {isLoading ? (
        <div className="flex flex-col items-center py-24 gap-6">
          <div className="relative">
             <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
             <Loader2 className="animate-spin relative z-10 text-primary" size={64} />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-extrabold mb-2">Synchronizing Neural Core</h3>
            <p className="text-text-muted">Loading COCO-SSD weights into browser engine...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 w-full">
          {!imageSrc ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <motion.div 
                whileHover={{ scale: 0.995, y: -2 }}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-3xl p-10 md:p-16 text-center cursor-pointer transition-all duration-400 hover:border-primary hover:bg-primary/5 hover:shadow-[inset_0_0_40px_rgba(255,51,102,0.05)]"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_var(--color-primary-glow)]">
                    <Upload size={32} color="white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold mb-3">Upload File</h3>
                <p className="text-text-muted text-sm md:text-base">Browse your local storage</p>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                  ref={fileInputRef}
                  accept="image/*"
                />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 0.995, y: -2 }}
                onClick={() => cameraInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-3xl p-10 md:p-16 text-center cursor-pointer transition-all duration-400 hover:border-emerald-500 hover:bg-emerald-500/5 hover:shadow-[inset_0_0_40px_rgba(16,185,129,0.05)]"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <Camera size={32} color="white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold mb-3">Capture Photo</h3>
                <p className="text-text-muted text-sm md:text-base">Use your device camera</p>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                  ref={cameraInputRef}
                  accept="image/*"
                  capture="environment"
                />
              </motion.div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 w-full">
              
              {/* Header Status Bar */}
              <div className="bg-white/5 border border-border rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center">
                    <ImageIcon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[0.95rem]">Image Buffer Loaded</p>
                    <p className="text-text-muted text-xs">Awaiting neural pass</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => setShowScores(!showScores)} 
                    className="flex-1 md:flex-none justify-center bg-white/5 text-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-white/10 flex items-center gap-2"
                  >
                    {showScores ? <><EyeOff size={14} /> Hide Scores</> : <><Eye size={14} /> Show Scores</>}
                  </button>
                  <button 
                    onClick={() => {
                      setImageSrc(null);
                      setRawPredictions([]);
                      setInferenceTime(null);
                      setHasScanned(false);
                    }} 
                    className="flex-1 md:flex-none justify-center bg-white/5 text-rose-400 border border-border px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-rose-500/10 hover:border-rose-500/30 flex items-center gap-2"
                  >
                    <RotateCcw size={14} /> Clear
                  </button>
                </div>
              </div>

              {/* Main Image & Overlay Container */}
              <div className="w-full flex justify-center bg-[#050505] rounded-2xl overflow-hidden border border-border mt-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2">
                
                {/* The Relative Anchor Wrapper */}
                <div className="relative inline-block max-w-full">
                  
                  {/* Source Image */}
                  <img 
                    ref={imageRef} 
                    src={imageSrc} 
                    onLoad={handleImageLoad}
                    crossOrigin="anonymous"
                    className="block w-auto h-auto max-w-full max-h-[70vh] rounded-xl"
                    alt="Source"
                  />
                  
                  {/* Analyzing Overlay */}
                  <AnimatePresence>
                    {isAnalyzing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex border border-primary flex-col items-center justify-center"
                      >
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 border-[3px] border-transparent border-t-primary border-r-primary rounded-full"
                        />
                        <p className="mt-6 font-extrabold tracking-widest text-primary uppercase text-sm">Processing Neural Net...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bounding Box Overlays */}
                  {!isAnalyzing && rawPredictions.length > 0 && filteredPredictions.map((p, i) => {
                    const [x, y, w, h] = p.bbox;
                    const color = getColorForClass(p.class);
                    
                    // Use state width or fallback directly to HTML node if React event loop skipped onLoad
                    const naturalW = imageDimensions.width || imageRef.current?.naturalWidth || 1;
                    const naturalH = imageDimensions.height || imageRef.current?.naturalHeight || 1;
                    
                    // TensorFlow coco-ssd uses natural image dimensions for bounding boxes.
                    // Because we are in a container perfectly matching the rendered image, CSS percentages work flawlessly.
                    const leftPct = (x / naturalW) * 100;
                    const topPct = (y / naturalH) * 100;
                    const widthPct = (w / naturalW) * 100;
                    const heightPct = (h / naturalH) * 100;

                  return (
                    <div
                      key={`bbox-${i}-${p.class}`}
                      style={{ 
                        position: 'absolute', 
                        left: `${leftPct}%`, 
                        top: `${topPct}%`, 
                        width: `${widthPct}%`, 
                        height: `${heightPct}%`,
                        border: `2px solid ${color}`,
                        boxShadow: `0 0 15px ${color}40, inset 0 0 15px ${color}20`,
                        transition: 'opacity 0.3s ease-in-out'
                      }}
                      className="pointer-events-auto z-10 hover:z-50 cursor-pointer group"
                    >
                      {/* Class Label Badge */}
                      <div 
                        style={{ backgroundColor: color + 'cc' }} // cc = 80% opacity Hex
                        className="absolute -top-[20px] -left-[2px] px-1.5 py-0.5 flex items-center gap-1 shadow-sm whitespace-nowrap rounded-t-md opacity-90 group-hover:opacity-100 group-hover:scale-110 origin-bottom-left transition-all"
                      >
                        <span className="text-[9px] sm:text-[10px] font-black text-[#050505] uppercase tracking-wide">
                          {p.class}
                        </span>
                        {showScores && (
                          <span className="text-[8px] sm:text-[9px] font-bold text-[#050505] bg-white/40 px-1 rounded-sm">
                            {Math.round(p.score * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                  {/* Empty State / No Objects Found Message */}
                  {!isAnalyzing && hasScanned && rawPredictions.length === 0 && imageDimensions.width > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-20 pointer-events-none">
                      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 max-w-sm">
                        <p className="text-white font-bold text-sm">No objects detected</p>
                        <p className="text-white/60 text-xs mt-1">COCO-SSD requires clear, photographic subjects. Illustrations or cartoons may not be recognized.</p>
                      </div>
                    </div>
                  )}

                  {!isAnalyzing && hasScanned && rawPredictions.length > 0 && filteredPredictions.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-20 pointer-events-none">
                      <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 max-w-sm">
                        <p className="text-white font-bold text-sm">0 objects above threshold</p>
                        <p className="text-white/60 text-xs mt-1">Try lowering the confidence threshold below {Math.round(threshold * 100)}%.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            {/* Controls and Stats */}
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-[#0a0a0f] p-5 rounded-2xl border border-white/5">
                
                <button 
                  onClick={detectObjects}
                  disabled={isAnalyzing}
                  className="bg-primary text-white px-8 py-4 rounded-xl text-[0.95rem] font-bold shadow-[0_0_20px_var(--color-primary-glow)] transition-all hover:-translate-y-1 hover:brightness-110 flex items-center justify-center gap-2 w-full lg:w-auto flex-shrink-0"
                >
                  {isAnalyzing ? "Scanning..." : "Run Detection"} <Sparkles size={18} />
                </button>

                <div className="flex flex-wrap lg:flex-nowrap w-full gap-6 lg:gap-8 items-center justify-end">
                  
                  {/* Threshold Slider */}
                  <div className="flex flex-col gap-2 w-full lg:w-48">
                    <div className="flex justify-between items-center text-xs text-text-muted font-bold tracking-wider uppercase">
                      <span className="flex items-center gap-1"><SlidersHorizontal size={12} /> Threshold</span>
                      <span>{Math.round(threshold * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="1" step="0.01" 
                      value={threshold} 
                      onChange={(e) => setThreshold(parseFloat(e.target.value))}
                      className="w-full accent-primary h-1 bg-white/10 rounded-full appearance-none outline-none cursor-pointer"
                    />
                  </div>

                  {/* Summary Stats */}
                  <div className="flex gap-4 border-l border-white/10 pl-6 lg:pl-8 py-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase flex items-center gap-1"><Box size={10} /> Objects</span>
                      <span className="text-xl font-black text-white">{filteredPredictions.length}</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-4">
                      <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase flex items-center gap-1"><Activity size={10} /> Speed</span>
                      <span className="text-xl font-black text-white">
                        {inferenceTime ? `${inferenceTime}ms` : '--'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

export default ObjectDetector;
