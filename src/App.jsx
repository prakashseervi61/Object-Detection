import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detector from './pages/Detector';
import Docs from './pages/Docs';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="container-full flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detect" element={<Detector />} />
              <Route path="/docs" element={<Docs />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
