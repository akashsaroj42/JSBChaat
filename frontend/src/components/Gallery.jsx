import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { API_URL } from '../context/AuthContext';

const isVideoUrl = (url) => {
  if (!url) return false;
  try {
    const cleanUrl = url.split('?')[0].toLowerCase();
    return cleanUrl.endsWith('.mp4') || 
           cleanUrl.endsWith('.webm') || 
           cleanUrl.endsWith('.ogg') || 
           cleanUrl.endsWith('.mov');
  } catch (e) {
    return false;
  }
};

const FALLBACK_GALLERY = [
  { id: 1, imageUrl: "/images/kartik_aaryan.jpg", caption: "Kartik Aaryan enjoying our pani puri at Juhu branch", category: "Customer" },
  { id: 2, imageUrl: "/images/stall_queue.jpg", caption: "Our legendary Juhu street stall (6 No Chaat Wala)", category: "Stall" },
  { id: 3, imageUrl: "/images/catering_setup.jpg", caption: "Elegant indoor catering counter display", category: "Event" },
  { id: 4, imageUrl: "/images/catering_chef1.jpg", caption: "Our master chef preparing delicious live chaat", category: "Event" },
  { id: 5, imageUrl: "/images/catering_chef2.jpg", caption: "Serving authentic street flavors at a private catering event", category: "Event" },
  { id: 6, imageUrl: "/images/live_stall_video.mp4", caption: "Our live street food stall video", category: "Stall" },
  { id: 7, imageUrl: "/images/live_stall_video_2.mp4", caption: "Authentic live chaat preparation video", category: "Food" }
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/gallery`);
      if (response.data && response.data.length > 0) {
        setImages(response.data);
      } else {
        setImages(FALLBACK_GALLERY);
      }
    } catch (e) {
      console.warn('API error fetching gallery, using fallback:', e);
      setImages(FALLBACK_GALLERY);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Food', 'Stall', 'Customer', 'Event'];

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-cream-dark/20 border-y border-gold-primary/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif text-sm font-semibold tracking-[0.25em] text-gold-primary uppercase">Moments in Time</span>
          <h2 className="text-4xl sm:text-5xl font-black text-maroon-primary mt-2 mb-4 font-serif">
            Our Gallery
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto mb-6" />
          <p className="text-maroon-dark/80 text-base sm:text-lg font-light leading-relaxed">
            Take a visual tour of our signature street food preparation, busy local stalls, and happy families celebrating.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-maroon-primary text-gold-primary shadow-md border border-gold-primary/20 scale-105'
                  : 'bg-cream-dark/50 text-maroon-primary hover:bg-cream-dark/80 border border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Columns */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gold-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid glass-card rounded-2xl overflow-hidden shadow-sm group hover:shadow-lg transition-all duration-300 relative border border-gold-primary/10 cursor-pointer"
                onClick={() => setLightboxImg(img)}
              >
                <div className="relative overflow-hidden bg-cream-dark/30">
                  {isVideoUrl(img.imageUrl) ? (
                    <div className="relative w-full aspect-square overflow-hidden bg-cream-dark/30">
                      <video
                        src={img.imageUrl}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onMouseEnter={(e) => e.target.play().catch(() => {})}
                        onMouseLeave={(e) => e.target.pause()}
                      />
                      <div className="absolute top-4 right-4 bg-maroon-primary/85 text-gold-primary p-2 rounded-full border border-gold-primary/30 z-10 shadow-lg">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={img.imageUrl}
                      alt={img.caption}
                      loading="lazy"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-maroon-primary/70 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-opacity duration-300">
                    <span className="text-gold-primary text-[10px] uppercase font-bold tracking-widest mb-1">
                      {img.category}
                    </span>
                    <h4 className="text-cream-light font-serif font-semibold text-lg mb-2 flex items-center justify-between">
                      <span>{img.caption || 'Authentic JSB Chaat'}</span>
                      <ZoomIn size={18} className="text-gold-primary" />
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-maroon-dark/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 text-gold-primary hover:text-cream-light p-2 bg-maroon-primary/50 rounded-full transition-colors duration-200"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-4xl w-full flex flex-col items-center bg-maroon-primary/80 p-4 border border-gold-primary/20 rounded-3xl"
            >
              {isVideoUrl(lightboxImg.imageUrl) ? (
                <video
                  src={lightboxImg.imageUrl}
                  controls
                  autoPlay
                  className="max-h-[70vh] object-contain rounded-2xl w-full"
                />
              ) : (
                <img
                  src={lightboxImg.imageUrl}
                  alt={lightboxImg.caption}
                  className="max-h-[70vh] object-contain rounded-2xl w-full"
                />
              )}
              <div className="text-center mt-4">
                <span className="text-gold-primary text-xs uppercase font-bold tracking-widest">
                  {lightboxImg.category}
                </span>
                <p className="text-cream-light font-serif text-lg sm:text-xl font-semibold mt-1">
                  {lightboxImg.caption || 'Authentic JSB Chaat'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
