import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Clock, User, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Mock contact submission - waits 1s and redirects to WhatsApp or shows success
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      const whatsappText = `Hello JSB Chaat, my name is ${formData.name}. ${formData.message}`;
      const whatsappUrl = `https://wa.me/919819961130?text=${encodeURIComponent(whatsappText)}`;
      
      // Auto open whatsapp in new tab
      window.open(whatsappUrl, '_blank');
      
      setFormData({
        name: '',
        phone: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-cream-dark/20 border-t border-gold-primary/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif text-sm font-semibold tracking-[0.25em] text-gold-primary uppercase">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-black text-maroon-primary mt-2 mb-4 font-serif">
            Contact JSB Chaat
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto mb-6" />
          <p className="text-maroon-dark/80 text-base sm:text-lg font-light leading-relaxed">
            Have questions about our menus, location timings, or custom orders? Drop us a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Contact Cards (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-gold-primary/10 shadow-sm flex flex-col justify-center flex-grow space-y-6">
              <h3 className="text-2xl font-bold text-maroon-primary font-serif mb-2">
                Connect Directly
              </h3>

              {/* Owner Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center border border-gold-primary/25">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-maroon-dark/50">Owner</p>
                  <p className="font-serif font-bold text-lg text-maroon-primary">Chandrabhan Saroj</p>
                </div>
              </div>

              {/* Phone Info */}
              <a href="tel:9819961130" className="flex items-center space-x-4 hover:translate-x-1 transition-transform group">
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center border border-gold-primary/25 group-hover:bg-gold-primary group-hover:text-maroon-primary transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-maroon-dark/50">Mobile (Click to Call)</p>
                  <p className="font-sans font-bold text-lg text-maroon-primary">+91 9819961130</p>
                </div>
              </a>

              {/* WhatsApp Chat */}
              <a
                href="https://wa.me/919819961130?text=Hello%20JSB%20Chaat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 hover:translate-x-1 transition-transform group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center border border-green-500/25 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-green-700/60">WhatsApp (Direct Chat)</p>
                  <p className="font-sans font-bold text-lg text-green-700">Chat with Chandrabhan</p>
                </div>
              </a>

              {/* Timing info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center border border-gold-primary/25">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-maroon-dark/50">Stall Timings</p>
                  <p className="font-sans font-medium text-sm sm:text-base text-maroon-primary">
                    Every Day: 4:00 PM – 11:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-gold-primary/20 shadow-md">
              <h3 className="text-2xl font-bold text-maroon-primary font-serif mb-6 text-center">
                Send a Message
              </h3>

              {submitted ? (
                <div className="p-6 bg-green-500/10 border border-green-500/30 text-green-800 rounded-2xl text-center space-y-3">
                  <CheckCircle size={32} className="mx-auto text-green-600" />
                  <h4 className="font-bold text-lg">Inquiry Started!</h4>
                  <p className="text-sm">
                    Opening WhatsApp to complete your message to Chandrabhan Saroj. You can chat directly now.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-maroon-primary text-gold-primary text-xs uppercase font-bold tracking-wider px-5 py-2.5 rounded-full mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      placeholder="John Doe"
                      className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="9876543210"
                      className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows="4"
                      placeholder="Write your query here..."
                      className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-maroon-primary text-gold-primary font-sans font-bold uppercase tracking-wider py-4 rounded-xl shadow-md flex items-center justify-center space-x-2 border border-gold-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} className="text-gold-primary" />
                        <span>Send to WhatsApp</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
