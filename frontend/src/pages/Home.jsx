import React from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Journey from '../components/Journey';
import Menu from '../components/Menu';
import Gallery from '../components/Gallery';
import Catering from '../components/Catering';
import Reviews from '../components/Reviews';
import Locations from '../components/Locations';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home({ setCurrentPage, currentPage }) {
  return (
    <div className="relative min-h-screen">
      {/* Navigation bar */}
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />

      {/* Sections */}
      <Hero />
      <Journey />
      <Menu />
      <Gallery />
      <Catering />
      <Reviews />
      <Locations />
      <Contact />

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919819961130?text=Hello%20JSB%20Chaat%2C%20I%20visited%20your%20website%20and%20wanted%20to%20get%20in%20touch."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border border-white/20 group"
      >
        <MessageCircle size={26} className="animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold uppercase tracking-wider font-sans whitespace-nowrap">
          Chat With Us
        </span>
      </a>
    </div>
  );
}
