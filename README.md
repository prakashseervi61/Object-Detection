# 🤖 AI Vision: Edge Object Detection Engine

AI Vision is a high-performance, privacy-first object detection platform built with **React 19**, **Vite**, and **TensorFlow.js**. It identifies over 80 categories of objects in real-time, directly in the consumer's web browser using hardware-accelerated neural networks.

## 🚀 Key Features

*   **Sub-100ms Inference**: Leveraging WebGL graphics acceleration for near-instant detection.
*   **Total Privacy**: No images are ever uploaded to a server. All AI processing happens locally on the user's hardware.
*   **Bounding Box Visualization**: Real-time canvas rendering of detected objects with confidence scores.
*   **Responsive Modern UI**: Built with a custom glassmorphism design system and fluid animations via Framer Motion.

## 🛠️ Technical Stack

| Category | Technology |
| :--- | :--- |
| **Core** | React 19, Vite 6 |
| **AI Engine** | TensorFlow.js |
| **Model** | COCO-SSD (Pre-trained) |
| **Animations** | Framer Motion |
| **Icons** | Lucide-React |
| **Styling** | Custom Vanilla CSS Design System |

## 🧠 How It Works

1.  **Model Loading**: On startup, the `coco-ssd` model weights are fetched and loaded into the browser's memory using `tf.ready()`.
2.  **Image Processing**: When an image is uploaded, it is rendered to an invisible `<img>` buffer.
3.  **Tensor Inference**: The AI model scans the image pixels, identifying patterns that match its training data.
4.  **Canvas Drawing**: Resulting coordinates (bounding boxes) are mapped back to the visible canvas and drawn with persistent stroke styles and labels.

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI modules
│   ├── ObjectDetector   # Core AI Logic & UI
│   ├── Navbar           # Navigation & Branding
│   └── Hero             # Marketing entry point
├── pages/               # High-level page layouts
│   ├── Home             # Landing Page
│   └── Detector         # Functional UI
├── App.jsx              # Routing & Root State
└── index.css            # Global CSS Design Tokens
```

## ⚡ Getting Started

1.  Clone the repository.
2.  Run `npm install`.
3.  Execute `npm run dev` to start the local simulation.

---
*Built for the future of decentralized Edge AI.*
