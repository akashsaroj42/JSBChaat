import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-maroon-dark text-cream-primary pt-16 pb-8 border-t border-gold-primary/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo column */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img src="/logo.png" alt="JSB Logo" className="w-12 h-12 object-contain rounded-full border border-gold-primary/30" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-widest text-gold-primary leading-none">
                  JSB CHAAT
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-light text-cream-dark mt-1">
                  Jai Shankar Bholenath
                </span>
              </div>
            </div>
            <p className="text-xs text-cream-dark/70 font-light leading-relaxed">
              "Serving Authentic Chaat Since 1958. A family legacy started by Late Shri Shankar Saroj and proudly continued by Chandrabhan Saroj."
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-serif text-gold-primary font-bold uppercase tracking-wider text-sm border-b border-gold-primary/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-cream-dark/80 font-light">
              <li>
                <a href="#home" className="hover:text-gold-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-gold-primary transition-colors">Our Journey</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold-primary transition-colors">What We Serve</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold-primary transition-colors">Gallery</a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-gold-primary font-bold uppercase tracking-wider text-sm border-b border-gold-primary/20 pb-2">
              Business Hours
            </h4>
            <ul className="space-y-2 text-xs text-cream-dark/80 font-light">
              <li>Monday – Sunday:</li>
              <li className="font-bold text-gold-primary text-sm mt-0.5">4:00 PM – 11:00 PM</li>
              <li className="mt-2 text-[10px] text-cream-dark/50 italic">
                * Available for catering requests 24/7.
              </li>
            </ul>
          </div>

          {/* Follow Us & Back to Top */}
          <div className="space-y-4">
            <h4 className="font-serif text-gold-primary font-bold uppercase tracking-wider text-sm border-b border-gold-primary/20 pb-2">
              Follow Our Legacy
            </h4>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/jaishankarchaat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-cream-dark hover:text-gold-primary transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-full bg-maroon-primary group-hover:bg-gold-primary group-hover:text-maroon-primary flex items-center justify-center border border-gold-primary/20 transition-all text-gold-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <span className="text-xs font-medium tracking-wide">@jaishankarchaat</span>
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center space-x-2 border border-gold-primary/30 text-gold-primary text-xs uppercase font-bold py-2 px-4 rounded-lg hover:bg-gold-primary/10 active:scale-95 transition-all"
            >
              <ArrowUp size={12} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gold-primary/20 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-cream-dark/50 font-light">
          <p>© {currentYear} JSB Chaat (Jai Shankar Bholenath). All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 font-sans tracking-wide">
            Designed for <strong className="text-gold-primary">6 No Chaat Wala</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
