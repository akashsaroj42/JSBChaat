import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../context/AuthContext';

const FALLBACK_MENU = [
  { id: 1, name: "Pani Puri", description: "Crispy hollow puris filled with spiced potatoes, chickpeas, and filled with a refreshing mint-coriander and sweet tamarind water.", price: 80.0, imageUrl: "/images/pani_puri.jpg", category: "Puri" },
  { id: 2, name: "Sukha Puri", description: "A dry preparation of crispy puris filled with potatoes, spiced powder, coriander, and fine sev.", price: 70.0, imageUrl: "/images/sukha_puri.jpg", category: "Puri" },
  { id: 3, name: "Sev Puri", description: "Crispy flat puris topped with potatoes, onions, tomatoes, sweet & spicy chutneys, and a mountain of fine sev.", price: 90.0, imageUrl: "/images/sev_puri.png", category: "Puri" },
  { id: 4, name: "Dahi Puri", description: "Puffed round puris stuffed with seasoned potatoes, sweet yogurt (dahi), sweet & spicy chutneys, topped with fine sev.", price: 100.0, imageUrl: "/images/dahi_puri.jpg", category: "Puri" },
  { id: 5, name: "Sukha Bhel", description: "A dry mixture of puffed rice, sev, potatoes, onions, roasted peanuts, and spices.", price: 70.0, imageUrl: "/images/sukha_bhel.jpg", category: "Bhel" },
  { id: 6, name: "Gila Bhel", description: "Puffed rice tossed with potatoes, onions, fresh coriander, and a rich mix of sweet, tangy, and spicy chutneys.", price: 80.0, imageUrl: "/images/gila_bhel.jpg", category: "Bhel" },
  { id: 7, name: "Ragda Pattice", description: "Golden-fried potato patties served with a warm, spicy white pea gravy (ragda), chutneys, onions, and sev.", price: 110.0, imageUrl: "/images/ragda_pattice.jpg", category: "Ragda" },
  { id: 8, name: "Dahi Papdi", description: "Crispy papdis topped with boiled potatoes, chickpeas, sweet yogurt, chutneys, and fine sev.", price: 100.0, imageUrl: "/images/dahi_papdi.jpg", category: "Specialty" }
];

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/menu`);
      if (response.data && response.data.length > 0) {
        setMenuItems(response.data);
      } else {
        setMenuItems(FALLBACK_MENU);
      }
    } catch (error) {
      console.warn('API error fetching menu, using fallback:', error);
      setMenuItems(FALLBACK_MENU);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Puri', 'Bhel', 'Ragda', 'Specialty'];

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <section id="menu" className="py-24 bg-cream-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif text-sm font-semibold tracking-[0.25em] text-gold-primary uppercase">Our Offerings</span>
          <h2 className="text-4xl sm:text-5xl font-black text-maroon-primary mt-2 mb-4 font-serif">
            What We Serve
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto mb-6" />
          <p className="text-maroon-dark/80 text-base sm:text-lg font-light leading-relaxed">
            Freshly prepared, hygiene-assured, and bursting with the secret spices passed down from Shri Shankar Saroj.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-sans text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-maroon-primary text-gold-primary shadow-md scale-105 border border-gold-primary/20'
                  : 'bg-cream-dark/45 text-maroon-primary hover:bg-cream-dark/80 border border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Showcase */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gold-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl overflow-hidden shadow-md flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative border border-gold-primary/10"
                >
                  {/* Food Image */}
                  <div className="h-48 w-full overflow-hidden bg-cream-dark/50 relative">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80"}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-maroon-primary/95 text-gold-primary font-bold text-sm px-3.5 py-1 rounded-full border border-gold-primary/30">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Food Details */}
                  <div className="p-6 flex-grow flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gold-primary font-bold mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-maroon-primary font-serif mb-2 group-hover:text-gold-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-maroon-dark/70 text-xs sm:text-sm font-light leading-relaxed flex-grow">
                      {item.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-cream-dark/30 flex justify-between items-center">
                      <span className="inline-flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider font-sans">
                          100% Veg
                        </span>
                      </span>
                      <a
                        href={`https://wa.me/919819961130?text=I%20would%20like%20to%20order%20${encodeURIComponent(item.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-maroon-primary hover:text-gold-primary transition-colors duration-200 uppercase tracking-widest border-b border-maroon-primary hover:border-gold-primary pb-0.5"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
