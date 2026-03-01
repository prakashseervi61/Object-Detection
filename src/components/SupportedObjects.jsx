import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, ChevronDown, ChevronUp } from 'lucide-react';

const COCO_CLASSES = [
  "person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch", "potted plant", "bed", "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"
];

const SupportedObjects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-20 px-6 max-w-[1320px] mx-auto w-full relative">
      <div className="text-center mb-16">
        <span className="text-primary font-extrabold text-[0.8rem] tracking-[0.3em] uppercase mb-4 block">Knowledge Base</span>
        <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-black mb-6 tracking-tight">
          DETECTABLE <span className="gradient-text">OBJECTS.</span>
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto text-[1.1rem] leading-relaxed">
          The neural engine is trained on the COCO dataset, capable of identifying 80 distinct real-world object classes in real-time.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
        {COCO_CLASSES.map((item, index) => {
          // Hide items past index 11 on mobile devices if `showAll` is false.
          // The `md:flex` class ensures they are always perfectly visible on desktop screens.
          const isHiddenOnMobile = !showAll && index >= 12;

          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 12) * 0.05 }}
              className={`items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors cursor-default ${isHiddenOnMobile ? 'hidden md:flex' : 'flex'}`}
            >
              <Box size={14} className="opacity-50" />
              <span className="text-[0.85rem] font-bold uppercase tracking-wider">{item}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile only View More/Less Toggle */}
      <div className="mt-10 flex justify-center md:hidden">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-white/5 border border-white/10 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors hover:bg-white/10 hover:border-white/20 flex items-center gap-2"
        >
          {showAll ? (
            <>View Less <ChevronUp size={16} /></>
          ) : (
            <>View All Objects <ChevronDown size={16} /></>
          )}
        </button>
      </div>
    </section>
  );
};

export default SupportedObjects;
