import React from 'react'
import { motion } from 'framer-motion'
import { Scan, Github, Zap, Command, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `text-xs font-extrabold tracking-[0.1em] uppercase relative transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-muted hover:text-white'}`;
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border/50 px-6 md:px-12 py-4 bg-[#050505]/70 flex flex-wrap justify-between items-center gap-y-4 transition-all duration-300">
      <Link to="/" className="flex items-center min-w-fit no-underline text-white">
        <span className="text-xl font-black tracking-widest">AI VISION</span>
      </Link>
      
      <div className="flex gap-8 md:gap-12 items-center justify-center order-3 md:order-2 w-full md:w-auto mt-1 md:mt-0">
        <Link to="/" className={getLinkClasses('/')}>
          Home
          {location.pathname === '/' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"></span>
          )}
        </Link>
        <div className="w-1 h-1 rounded-full bg-white/10"></div>
        <Link to="/detect" className={getLinkClasses('/detect')}>
          Detector
          {location.pathname === '/detect' && (
             <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"></span>
          )}
        </Link>
        <div className="w-1 h-1 rounded-full bg-white/10"></div>
        <Link to="/docs" className={getLinkClasses('/docs')}>
          Docs
          {location.pathname === '/docs' && (
             <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"></span>
          )}
        </Link>
      </div>

      <div className="flex gap-4 items-center min-w-fit order-2 md:order-3">
        <a href="https://github.com/prakashseervi61/Object-Detection" target="_blank" rel="noreferrer" className="text-text-muted/50 transition-colors hover:text-white hidden sm:block">
          <Github size={18} />
        </a>
        <Link 
          to="/detect" 
          className="bg-gradient-to-br from-primary to-secondary text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-[0_8px_16px_var(--color-primary-glow)] transition-all hover:scale-105 hover:shadow-[0_12px_24px_var(--color-primary-glow)] hover:brightness-110 flex items-center gap-2"
        >
          LAUNCH ENGINE
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;
