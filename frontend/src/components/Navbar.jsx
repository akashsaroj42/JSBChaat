import React, { useState, useEffect } from 'react';
import { Menu, X, Key, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ setCurrentPage, currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Journey', href: '#journey' },
    { name: 'What We Serve', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Catering & Events', href: '#catering' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Locations', href: '#locations' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href, e) => {
    e.preventDefault();
    setIsOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-maroon-primary/95 text-cream-primary shadow-lg border-b border-gold-primary/30 py-3'
          : 'bg-maroon-primary text-cream-primary py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img src="/logo.png" alt="JSB Logo" className="w-10 h-10 object-contain rounded-full border border-gold-primary/30" />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-gold-primary leading-none">
                JSB CHAAT
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-light text-cream-dark mt-1">
                Jai Shankar Bholenath
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className="text-cream-dark hover:text-gold-primary transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Call-to-action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <button
                  onClick={() => setCurrentPage(currentPage === 'admin' ? 'home' : 'admin')}
                  className="flex items-center space-x-1 text-xs border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-maroon-primary px-3 py-1.5 rounded transition-all duration-200 font-semibold"
                >
                  <LayoutDashboard size={14} />
                  <span>{currentPage === 'admin' ? 'View Site' : 'Dashboard'}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setCurrentPage('home');
                  }}
                  className="flex items-center space-x-1 text-xs text-cream-dark hover:text-red-400 py-1.5 transition-colors duration-200"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                title="Admin Login"
                className="text-cream-dark hover:text-gold-primary transition-colors duration-200 p-2"
              >
                <Key size={18} />
              </button>
            )}
            <a
              href="https://wa.me/919819961130"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient text-maroon-dark font-sans font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Order on WhatsApp
            </a>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            {token && (
              <button
                onClick={() => setCurrentPage(currentPage === 'admin' ? 'home' : 'admin')}
                className="text-gold-primary p-1"
              >
                <LayoutDashboard size={18} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream-dark hover:text-gold-primary p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-maroon-dark/95 border-b border-gold-primary/20 py-4 px-4 transition-all duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className="text-cream-dark hover:text-gold-primary transition-colors py-2 text-sm font-medium tracking-wide border-b border-cream-dark/5"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-3">
              <a
                href="https://wa.me/919819961130"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient text-maroon-dark text-center font-sans font-bold text-xs uppercase tracking-wider py-2.5 rounded shadow-md"
              >
                Order on WhatsApp
              </a>
              {!token ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setCurrentPage('login');
                  }}
                  className="flex items-center justify-center space-x-2 border border-gold-primary/30 text-cream-dark text-xs py-2 rounded"
                >
                  <Key size={14} />
                  <span>Admin Login</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    setCurrentPage('home');
                  }}
                  className="flex items-center justify-center space-x-2 border border-red-500/30 text-red-400 text-xs py-2 rounded"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
