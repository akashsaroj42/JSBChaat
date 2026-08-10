import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, Send, Calendar, Users, Phone, FileText } from 'lucide-react';
import { API_URL } from '../context/AuthContext';

export default function Catering() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    eventType: 'Birthday Party',
    numberOfGuests: '',
    eventDate: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const eventTypes = [
    'Birthday Party',
    'Wedding & Engagement',
    'Corporate Event',
    'Festival & Community Gathering',
    'Housewarming Ceremony',
    'School/College Event',
    'Exhibition/Trade Show',
    'Family Function',
    'Other'
  ];

  const benefits = [
    'Serving Authentic Taste Since 1958',
    'Traditional Live Chaat Counters',
    'Strict Hygiene & Fresh Ingredients',
    'Professional, Trained Service Staff',
    'Customizable Event Menu Packages',
    'Trusted by Generations of Mumbaikars'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Form validation
    if (!formData.name || !formData.mobileNumber || !formData.numberOfGuests || !formData.eventDate) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/catering/inquiry`, {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        eventType: formData.eventType,
        numberOfGuests: parseInt(formData.numberOfGuests, 10),
        eventDate: formData.eventDate,
        message: formData.message
      });

      // Format WhatsApp message text
      const whatsappNumber = "919819961130";
      const text = `Hello JSB Chaat, I would like to request a catering quote:\n\n*Name:* ${formData.name}\n*Mobile:* ${formData.mobileNumber}\n*Event Type:* ${formData.eventType}\n*Total Guests:* ${formData.numberOfGuests}\n*Event Date:* ${formData.eventDate}\n*Special Instructions:* ${formData.message || 'None'}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');

      setSuccess(true);
      setFormData({
        name: '',
        mobileNumber: '',
        eventType: 'Birthday Party',
        numberOfGuests: '',
        eventDate: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting catering inquiry:', err);
      setError('Something went wrong. Please check your network or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="catering" className="py-24 bg-cream-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif text-sm font-semibold tracking-[0.25em] text-gold-primary uppercase">Event Services</span>
          <h2 className="text-4xl sm:text-5xl font-black text-maroon-primary mt-2 mb-4 font-serif">
            Catering & Events
          </h2>
          <div className="w-24 h-1 gold-gradient mx-auto mb-6" />
          <p className="text-maroon-dark/80 text-base sm:text-lg font-light leading-relaxed">
            Make your special occasions unforgettable with JSB Chaat's legendary live preparation stalls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Benefits and Info (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8 rounded-3xl shadow-sm border border-gold-primary/10">
              <h3 className="text-2xl font-bold text-maroon-primary font-serif mb-6">
                Why Choose JSB Chaat?
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-primary shrink-0 mt-0.5" />
                    <span className="text-maroon-dark text-sm sm:text-base font-light">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Banner block */}
            <div className="maroon-gradient text-cream-primary p-8 rounded-3xl shadow-lg border border-gold-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-primary/10 rounded-full filter blur-xl" />
              <h4 className="text-lg sm:text-xl font-serif text-gold-primary font-semibold mb-2">
                Planning an Event?
              </h4>
              <p className="text-xs sm:text-sm text-cream-dark leading-relaxed mb-6">
                "Let JSB Chaat add the authentic taste of tradition to your celebration. We setup hygienic live food counters that keep your guests happy!"
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:9819961130"
                  className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider bg-gold-primary text-maroon-primary px-4 py-2.5 rounded-lg shadow-md hover:scale-105 transition-all"
                >
                  <Phone size={14} />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919819961130?text=I%20want%20to%20inquire%20about%20catering%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider border border-gold-primary/30 text-gold-primary px-4 py-2.5 rounded-lg hover:bg-gold-primary/10 transition-all"
                >
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Card (Right) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl shadow-lg border border-gold-primary/25 relative">
              <h3 className="text-2xl font-bold text-maroon-primary font-serif mb-6 text-center">
                Request a Catering Quote
              </h3>

              {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-700 rounded-xl text-sm font-semibold flex items-center space-x-2 animate-fadeIn">
                  <CheckCircle2 size={20} />
                  <span>Inquiry submitted successfully! Chandrabhan Saroj will call you shortly.</span>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-700 rounded-xl text-sm font-semibold flex items-center space-x-2">
                  <span>⚠️ {error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-maroon-dark/60">
                      Your Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-maroon-dark/60">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        placeholder="9876543210"
                        className="w-full bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Event Type */}
                  <div className="flex flex-col space-y-1.5 sm:col-span-1">
                    <label className="text-xs uppercase font-bold tracking-wider text-maroon-dark/60">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-3 text-sm outline-none focus:border-gold-primary focus:bg-cream-light transition-all cursor-pointer"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Guests */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-maroon-dark/60 flex items-center space-x-1">
                      <Users size={12} className="text-gold-primary" />
                      <span>Total Guests *</span>
                    </label>
                    <input
                      type="number"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 100"
                      className="w-full bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light transition-all"
                    />
                  </div>

                  {/* Event Date */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-maroon-dark/60 flex items-center space-x-1">
                      <Calendar size={12} className="text-gold-primary" />
                      <span>Event Date *</span>
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-maroon-dark/60 flex items-center space-x-1">
                    <FileText size={12} className="text-gold-primary" />
                    <span>Special Instructions / Requirements</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about the live counter items you need, timings, setup location details, etc..."
                    className="w-full bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full maroon-gradient text-cream-primary font-sans font-bold uppercase tracking-wider py-4 rounded-xl shadow-lg border border-gold-primary/20 hover:scale-[1.01] active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-cream-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} className="text-gold-primary" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
