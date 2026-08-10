import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Navigation, ExternalLink } from 'lucide-react';

export default function Locations() {
  const [activeBranch, setActiveBranch] = useState('JUHU'); // JUHU or SANTACRUZ

  const branches = {
    JUHU: {
      name: 'Main Juhu Branch (Since 1958)',
      address: 'JSB Chaat, Juhu J6, 59, NS Mankikar Road, Presidency Society, JVPD Scheme, Vile Parle West, Mumbai, Maharashtra 400049',
      landmark: 'Near Jamnabai Narsee International School',
      phone: '+919819961130',
      whatsapp: 'https://wa.me/919819961130?text=Hello%20JSB%20Chaat%2C%20I%20am%20inquiring%20about%20the%20Juhu%20branch',
      directions: 'https://www.google.com/maps?q=Jai+Shankar+Bholenath+Sev+Puri,+6,+59,+NS+Mankikar+Rd,+Presidency+Society,+JVPD+Scheme,+Vile+Parle+West,+Mumbai,+Maharashtra+400049',
      mapEmbed: 'https://maps.google.com/maps?q=Jai+Shankar+Bholenath+Sev+Puri,+6,+59,+NS+Mankikar+Rd,+Presidency+Society,+JVPD+Scheme,+Vile+Parle+West,+Mumbai,+Maharashtra+400049&t=&z=17&ie=UTF8&iwloc=&output=embed'
    },
    SANTACRUZ: {
      name: 'Santacruz Branch (Started in 2025)',
      address: 'Jai Shankar Bholenath Sev Puri, JK Mehta Rd, near Rn Podar School Cbse, Tagore Nagar, Santacruz (West), Mumbai, Maharashtra 400054',
      landmark: 'Near RN Podar School CBSE',
      phone: '+919819961130',
      whatsapp: 'https://wa.me/919819961130?text=Hello%20JSB%20Chaat%2C%20I%20am%20inquiring%20about%20the%20Santacruz%20branch',
      directions: 'https://www.google.com/maps?q=Jai+Shankar+Bholenath+Sev+Puri,+JK+Mehta+Rd,+near+Rn+Podar+School+Cbse,+Tagore+Nagar,+Santacruz+(West),+Mumbai,+Maharashtra+400054',
      mapEmbed: 'https://maps.google.com/maps?q=Jai+Shankar+Bholenath+Sev+Puri,+JK+Mehta+Rd,+near+Rn+Podar+School+Cbse,+Tagore+Nagar,+Santacruz+(West),+Mumbai,+Maharashtra+400054&t=&z=17&ie=UTF8&iwloc=&output=embed'
    }
  };

  const current = branches[activeBranch];

  return (
    <section id="locations" className="py-24 bg-cream-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif text-sm font-semibold tracking-[0.25em] text-gold-primary uppercase">Find Us</span>
          <h2 className="text-4xl sm:text-5xl font-black text-maroon-primary mt-2 mb-4 font-serif">
            Our Locations
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto mb-6" />
          <p className="text-maroon-dark/80 text-base sm:text-lg font-light leading-relaxed">
            Visit our traditional stall in Juhu JVPD or check out our brand new branch in Santacruz West.
          </p>
        </div>

        {/* Branch Selection Buttons */}
        <div className="flex justify-center space-x-4 mb-10">
          <button
            onClick={() => setActiveBranch('JUHU')}
            className={`px-6 py-3 rounded-xl font-serif text-sm sm:text-base font-semibold uppercase tracking-wider transition-all duration-300 border ${
              activeBranch === 'JUHU'
                ? 'bg-maroon-primary text-gold-primary shadow-md border-gold-primary/30 scale-105'
                : 'bg-cream-dark/50 text-maroon-primary hover:bg-cream-dark/80 border-transparent'
            }`}
          >
            Juhu Branch (Main)
          </button>
          <button
            onClick={() => setActiveBranch('SANTACRUZ')}
            className={`px-6 py-3 rounded-xl font-serif text-sm sm:text-base font-semibold uppercase tracking-wider transition-all duration-300 border ${
              activeBranch === 'SANTACRUZ'
                ? 'bg-maroon-primary text-gold-primary shadow-md border-gold-primary/30 scale-105'
                : 'bg-cream-dark/50 text-maroon-primary hover:bg-cream-dark/80 border-transparent'
            }`}
          >
            Santacruz Branch
          </button>
        </div>

        {/* Location Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Card Info (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="glass-card p-8 rounded-3xl border border-gold-primary/10 shadow-sm space-y-6 flex-grow flex flex-col justify-center">
              <div>
                <span className="text-gold-primary text-xs uppercase font-bold tracking-widest">
                  {activeBranch === 'JUHU' ? 'LEGACY BRANCH SINCE 1958' : 'MODERN EXPANSION STARTED IN 2025'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-maroon-primary font-serif mt-1 mb-4">
                  {current.name}
                </h3>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3 text-maroon-dark">
                <MapPin className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base font-light leading-relaxed">
                  <p className="font-semibold">{current.landmark}</p>
                  <p className="opacity-90">{current.address}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-center space-x-3 text-maroon-dark">
                <Phone className="w-5 h-5 text-gold-primary shrink-0" />
                <span className="text-sm sm:text-base font-light">
                  Owner: <strong>Chandrabhan Saroj</strong> ({current.phone})
                </span>
              </div>

              <div className="w-full h-[1px] bg-cream-dark/40" />

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={current.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 bg-maroon-primary text-gold-primary font-sans font-bold text-xs uppercase tracking-wider py-3 px-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all text-center"
                >
                  <Navigation size={12} />
                  <span>Directions</span>
                </a>
                <a
                  href={`tel:${current.phone}`}
                  className="flex items-center justify-center space-x-1.5 border border-maroon-primary text-maroon-primary font-sans font-bold text-xs uppercase tracking-wider py-3 px-2 rounded-xl hover:bg-maroon-primary/5 active:scale-95 transition-all text-center"
                >
                  <Phone size={12} />
                  <span>Call Stall</span>
                </a>
                <a
                  href={current.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 border border-green-600 text-green-700 font-sans font-bold text-xs uppercase tracking-wider py-3 px-2 rounded-xl hover:bg-green-500/5 active:scale-95 transition-all text-center"
                >
                  <MessageCircle size={12} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map Embed (Right) */}
          <div className="lg:col-span-7 h-[350px] lg:h-auto min-h-[350px] rounded-3xl overflow-hidden shadow-lg border border-gold-primary/20 relative">
            <iframe
              title={current.name}
              src={current.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
