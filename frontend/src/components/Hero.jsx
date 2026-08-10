import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, BookOpen } from 'lucide-react';

const carouselImages = [
  "/images/kartik_aaryan.jpg",
  "/images/stall_queue.jpg",
  "/images/catering_setup.jpg",
  "/images/catering_chef1.jpg",
  "/images/catering_chef2.jpg"
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Image Carousel with Parallax Blur Overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence>
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${carouselImages[currentIdx]})` }}
          />
        </AnimatePresence>
        {/* Dark Maroon Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 via-maroon-dark/30 to-maroon-dark/65" />
      </div>

      {/* Decorative Gold Elements */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 flex justify-between pointer-events-none opacity-30 select-none">
        <div className="w-16 h-16 border-t-2 border-l-2 border-gold-primary" />
        <div className="w-16 h-16 border-t-2 border-r-2 border-gold-primary" />
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 flex justify-between pointer-events-none opacity-30 select-none">
        <div className="w-16 h-16 border-b-2 border-l-2 border-gold-primary" />
        <div className="w-16 h-16 border-b-2 border-r-2 border-gold-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 border border-gold-primary/40 bg-gold-primary/10 rounded-full px-4 py-1 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-gold-primary animate-ping" />
          <span className="text-gold-primary text-xs sm:text-sm font-semibold tracking-widest uppercase font-sans">
            Mumbai's Beloved Chaat Since 1958
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-cream-light font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-wide leading-none select-none mb-3"
        >
          JSB CHAAT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gold-primary font-serif text-lg sm:text-2xl md:text-3xl font-medium tracking-widest uppercase mb-6"
        >
          The Original 6 No Chaat Wala
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-48 h-0.5 gold-gradient mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-cream-dark text-base sm:text-lg md:text-xl font-light font-sans max-w-2xl mx-auto leading-relaxed mb-10"
        >
          "A family legacy started by Late Shri Shankar Saroj and proudly continued by the next generation with authentic flavors that define Mumbai street food culture."
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => scrollToSection('#menu')}
            className="w-full sm:w-auto gold-gradient text-maroon-dark font-sans font-bold uppercase tracking-wider px-8 py-4 rounded-lg shadow-lg hover:shadow-gold-primary/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <BookOpen size={18} />
            <span>View Menu</span>
          </button>

          <a
            href="https://wa.me/919819961130"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-maroon-primary font-sans font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <MessageSquare size={18} />
            <span>Order on WhatsApp</span>
          </a>

          <button
            onClick={() => scrollToSection('#contact')}
            className="w-full sm:w-auto text-cream-dark hover:text-gold-primary font-sans font-semibold text-sm tracking-wider uppercase underline underline-offset-4 py-2 transition-colors duration-200"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-[10px] text-cream-dark/60 tracking-[0.3em] uppercase mb-2">Scroll Down</span>
        <div className="w-6 h-10 border border-gold-primary/50 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="w-1.5 h-1.5 rounded-full bg-gold-primary"
          />
        </div>
      </div>
    </section>
  );
}
