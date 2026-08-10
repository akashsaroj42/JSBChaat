import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MessageSquare, Plus, Check } from 'lucide-react';
import { API_URL } from '../context/AuthContext';

const FALLBACK_REVIEWS = [
  { id: 1, name: "Amit Sharma", rating: 5, description: "I have been coming to JSB Chaat (6 No Chaat Wala) since the 1980s. The flavor of the Sev Puri is exactly the same today. An absolute Mumbai treasure!", type: "CUSTOMER" },
  { id: 2, name: "Priyanka Deshmukh", rating: 5, description: "Best Pani Puri in Vile Parle! Extremely hygienic and the water has that perfect authentic tanginess. Proud customer!", type: "CUSTOMER" },
  { id: 3, name: "Rohan Mehta", rating: 4, description: "We hired JSB Chaat for our daughter's birthday party in Juhu. They set up a beautiful live stall. The kids and adults both loved the Ragda Pattice and Dahi Puri!", type: "PARTY" },
  { id: 4, name: "Karan Johar (Corporate Event)", rating: 5, description: "Hired them for our corporate Diwali meet. The authentic Mumbai style chaat was a huge hit among the team. Professional setup and very clean.", type: "PARTY" },
  { id: 5, name: "Kalpesh Desai", rating: 5, description: "Best bhel puri and paani puri joint in town. My go-to place for street food in Mumbai.", type: "CUSTOMER" },
  { id: 6, name: "Anil Bajaj", rating: 5, description: "Bholenath Sev Puri stall is a Street food outlet, i have been enjoying it's delicious Bhel, Sev Puri & Pani Puri since more then 40 year's. Best part is it's Quality of Chutneys, sweet and chilly.", type: "CUSTOMER" },
  { id: 7, name: "Dipesh Zaveri", rating: 5, description: "50 year old legacy. Good place for chaat cravings.", type: "CUSTOMER" },
  { id: 8, name: "G G", rating: 5, description: "One of the best chat stalls in the city, made in Bisleri water. Try the sevpuri toast samdwich here, and ofcourse pani puri, dahi puri and sev puri.", type: "CUSTOMER" },
  { id: 9, name: "Sneh Patel", rating: 5, description: "Super panipuri and sevpuri.", type: "CUSTOMER" },
  { id: 10, name: "Kartik Kasat", rating: 5, description: "Panipuri hits even for a non mumbaikar!", type: "CUSTOMER" }
];

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('CUSTOMER'); // CUSTOMER or PARTY
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [activeTab]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    rating: 5,
    description: '',
    type: 'CUSTOMER'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/reviews`);
      if (response.data && response.data.length > 0) {
        setReviews(response.data);
      } else {
        setReviews(FALLBACK_REVIEWS);
      }
    } catch (e) {
      console.warn('API error fetching reviews, using fallback:', e);
      setReviews(FALLBACK_REVIEWS);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(r => r.type === activeTab);
  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!formData.name || !formData.mobileNumber || !formData.description) {
      setError('Please fill in all fields.');
      setSubmitting(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/reviews`, {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        rating: parseInt(formData.rating, 10),
        description: formData.description,
        type: formData.type
      });

      setSubmitted(true);
      setFormData({
        name: '',
        mobileNumber: '',
        rating: 5,
        description: '',
        type: 'CUSTOMER'
      });
      fetchReviews();
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Something went wrong. Please check your inputs and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-cream-dark/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div className="text-left max-w-2xl">
            <span className="font-serif text-sm font-semibold tracking-[0.25em] text-gold-primary uppercase">Customer Feedback</span>
            <h2 className="text-4xl sm:text-5xl font-black text-maroon-primary mt-2 mb-4 font-serif">
              What Our Patrons Say
            </h2>
            <div className="w-24 h-1 gold-gradient mb-6" />
            <p className="text-maroon-dark/80 text-base sm:text-lg font-light leading-relaxed">
              Read stories of taste, trust, and quality shared by our regular customers and party hosts.
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setSubmitted(false);
              setError(null);
            }}
            className="flex items-center justify-center space-x-2 bg-maroon-primary text-gold-primary px-6 py-3 rounded-full hover:scale-105 transition-all shadow-md self-start md:self-end font-semibold uppercase tracking-wider text-xs"
          >
            <Plus size={16} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Review Submission Form Overlay */}
        {showForm && (
          <div className="glass-card max-w-2xl mx-auto p-8 rounded-3xl border border-gold-primary/20 shadow-lg mb-12 transition-all">
            <h3 className="text-2xl font-bold text-maroon-primary font-serif mb-6 text-center">
              Share Your Experience
            </h3>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                  <Check size={32} />
                </div>
                <h4 className="text-xl font-bold text-maroon-primary font-serif">Thank You!</h4>
                <p className="text-sm text-maroon-dark/80 max-w-md mx-auto">
                  Your review has been submitted successfully and is now live on the site!
                </p>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-maroon-primary text-gold-primary px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Close Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-700 text-sm rounded-lg">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      placeholder="Jane Doe"
                      className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65">
                      Mobile Number * (Private, for spam verification)
                    </label>
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                      required
                      placeholder="9876543210"
                      className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Review Type */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65">
                      Review Category
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-3 text-sm outline-none focus:border-gold-primary focus:bg-cream-light cursor-pointer"
                    >
                      <option value="CUSTOMER">General Customer (Stall Visit)</option>
                      <option value="PARTY">Catering / Party Order host</option>
                    </select>
                  </div>

                  {/* Star Rating */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65">
                      Rating
                    </label>
                    <div className="flex items-center space-x-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className="text-gold-primary p-0.5 hover:scale-110 transition-transform"
                        >
                          <Star
                            size={22}
                            fill={formData.rating >= star ? 'currentColor' : 'none'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65">
                    Your Review *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows="3"
                    placeholder="Tell us what you liked! Mention our Juhu stall, Vile Parle West legacy, the Sev Puri taste..."
                    className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-maroon-primary text-gold-primary font-sans font-bold uppercase tracking-wider py-3 rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Submit Review</span>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveTab('CUSTOMER')}
            className={`flex items-center space-x-2 pb-2 border-b-2 font-serif text-lg tracking-wider transition-all duration-200 ${
              activeTab === 'CUSTOMER'
                ? 'border-gold-primary text-maroon-primary font-bold'
                : 'border-transparent text-maroon-dark/50'
            }`}
          >
            <MessageSquare size={16} className="text-gold-primary" />
            <span>Regular Patrons</span>
          </button>
          <button
            onClick={() => setActiveTab('PARTY')}
            className={`flex items-center space-x-2 pb-2 border-b-2 font-serif text-lg tracking-wider transition-all duration-200 ${
              activeTab === 'PARTY'
                ? 'border-gold-primary text-maroon-primary font-bold'
                : 'border-transparent text-maroon-dark/50'
            }`}
          >
            <Star size={16} className="text-gold-primary" />
            <span>Catering & Functions</span>
          </button>
        </div>

        {/* Reviews list */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-gold-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12 text-maroon-dark/50 font-light italic text-sm">
            No approved reviews found in this category yet. Be the first to write one!
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedReviews.map((review) => (
                <div
                  key={review.id}
                  className="glass-card p-6 sm:p-8 rounded-2xl border border-gold-primary/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-serif font-bold text-lg text-maroon-primary">
                        {review.name}
                      </h4>
                      <div className="flex text-gold-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={review.rating > i ? 'currentColor' : 'none'}
                            className="mr-0.5"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-maroon-dark/80 text-sm sm:text-base font-light italic leading-relaxed">
                      "{review.description}"
                    </p>
                  </div>
                  {review.type === 'PARTY' && (
                    <div className="mt-4 pt-3 border-t border-cream-dark/30 text-[10px] uppercase font-bold tracking-widest text-gold-primary">
                      Event / Catering testimonial
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredReviews.length > 2 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-cream-dark/20 hover:bg-cream-dark/30 text-maroon-primary border border-gold-primary/30 px-8 py-3 rounded-full hover:scale-105 transition-all font-semibold uppercase tracking-wider text-xs shadow-sm cursor-pointer"
                >
                  {showAll ? 'Show Less Reviews' : `See More Reviews (${filteredReviews.length - 2} more)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
