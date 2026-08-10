import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, API_URL } from '../context/AuthContext';
import {
  LayoutDashboard, BookOpen, Image as ImageIcon, MessageSquare,
  ClipboardList, Plus, Trash2, Check, X, ShieldAlert, Sparkles, ToggleLeft, ToggleRight
} from 'lucide-react';

export default function AdminDashboard({ setCurrentPage }) {
  const { token, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, menu, gallery, reviews, catering

  // Metrics states
  const [stats, setStats] = useState({
    totalMenuItems: 0,
    totalInquiries: 0,
    totalReviews: 0,
    pendingReviews: 0,
    approvedReviews: 0,
    averageRating: 0
  });

  // Data lists states
  const [menuItems, setMenuItems] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Forms / Modal states
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuFormData, setMenuFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Puri',
    available: true,
    imageFile: null
  });

  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    caption: '',
    category: 'Food',
    imageFile: null
  });

  // Alert states
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      setCurrentPage('login');
    } else {
      fetchAnalytics();
      fetchTabContent(activeTab);
    }
  }, [token, activeTab]);

  const displayMessage = (type, text) => {
    if (type === 'success') {
      setSuccessMsg(text);
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg(text);
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/analytics`);
      setStats(res.data);
    } catch (e) {
      console.error('Failed to load analytics', e);
    }
  };

  const fetchTabContent = async (tab) => {
    setLoading(true);
    try {
      if (tab === 'menu') {
        const res = await axios.get(`${API_URL}/menu/all`);
        setMenuItems(res.data);
      } else if (tab === 'gallery') {
        const res = await axios.get(`${API_URL}/gallery`);
        setGalleryImages(res.data);
      } else if (tab === 'reviews') {
        const res = await axios.get(`${API_URL}/admin/reviews`);
        setReviews(res.data);
      } else if (tab === 'catering') {
        const res = await axios.get(`${API_URL}/admin/catering`);
        setInquiries(res.data);
      }
    } catch (e) {
      console.error(`Error loading data for ${tab}:`, e);
      displayMessage('error', `Failed to load data for ${tab}.`);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // MENU OPERATIONS
  // ----------------------------------------------------
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    if (!menuFormData.name || !menuFormData.price) {
      displayMessage('error', 'Name and price are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', menuFormData.name);
    formData.append('description', menuFormData.description);
    formData.append('price', parseFloat(menuFormData.price));
    formData.append('category', menuFormData.category);
    formData.append('available', menuFormData.available);
    if (menuFormData.imageFile) {
      formData.append('image', menuFormData.imageFile);
    }

    try {
      if (editingMenuItem) {
        // Edit Mode
        if (!menuFormData.imageFile) {
          formData.append('imageUrl', editingMenuItem.imageUrl);
        }
        await axios.put(`${API_URL}/admin/menu/${editingMenuItem.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        displayMessage('success', 'Menu item updated successfully.');
      } else {
        // Add Mode
        await axios.post(`${API_URL}/admin/menu`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        displayMessage('success', 'New menu item created.');
      }
      setShowMenuForm(false);
      setEditingMenuItem(null);
      setMenuFormData({ name: '', description: '', price: '', category: 'Puri', available: true, imageFile: null });
      fetchTabContent('menu');
      fetchAnalytics();
    } catch (err) {
      console.error('Menu submit failed:', err);
      displayMessage('error', 'Failed to save menu item.');
    }
  };

  const handleToggleAvailability = async (item) => {
    try {
      const formData = new FormData();
      formData.append('name', item.name);
      formData.append('description', item.description);
      formData.append('price', item.price);
      formData.append('category', item.category);
      formData.append('available', !item.available);
      formData.append('imageUrl', item.imageUrl || '');

      await axios.put(`${API_URL}/admin/menu/${item.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      displayMessage('success', `Availability toggled to ${!item.available ? 'Available' : 'Unavailable'}.`);
      fetchTabContent('menu');
    } catch (e) {
      console.error(e);
      displayMessage('error', 'Failed to toggle availability.');
    }
  };

  const deleteMenuItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await axios.delete(`${API_URL}/admin/menu/${id}`);
      displayMessage('success', 'Menu item deleted.');
      fetchTabContent('menu');
      fetchAnalytics();
    } catch (e) {
      displayMessage('error', 'Failed to delete menu item.');
    }
  };

  // ----------------------------------------------------
  // GALLERY OPERATIONS
  // ----------------------------------------------------
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryFormData.imageFile) {
      displayMessage('error', 'Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', galleryFormData.caption);
    formData.append('category', galleryFormData.category);
    formData.append('image', galleryFormData.imageFile);

    try {
      await axios.post(`${API_URL}/admin/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      displayMessage('success', 'Gallery image uploaded.');
      setShowGalleryForm(false);
      setGalleryFormData({ caption: '', category: 'Food', imageFile: null });
      fetchTabContent('gallery');
    } catch (e) {
      displayMessage('error', 'Gallery upload failed.');
    }
  };

  const deleteGalleryImage = async (id) => {
    if (!window.confirm('Delete this image from gallery?')) return;
    try {
      await axios.delete(`${API_URL}/admin/gallery/${id}`);
      displayMessage('success', 'Gallery image removed.');
      fetchTabContent('gallery');
    } catch (e) {
      displayMessage('error', 'Failed to delete gallery image.');
    }
  };

  // ----------------------------------------------------
  // REVIEWS OPERATIONS
  // ----------------------------------------------------
  const handleApproveReview = async (id, approve) => {
    try {
      await axios.put(`${API_URL}/admin/reviews/${id}/approve?approved=${approve}`);
      displayMessage('success', approve ? 'Review Approved!' : 'Review Hidden.');
      fetchTabContent('reviews');
      fetchAnalytics();
    } catch (e) {
      displayMessage('error', 'Failed to process review approval.');
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      await axios.delete(`${API_URL}/admin/reviews/${id}`);
      displayMessage('success', 'Review deleted.');
      fetchTabContent('reviews');
      fetchAnalytics();
    } catch (e) {
      displayMessage('error', 'Failed to delete review.');
    }
  };

  // ----------------------------------------------------
  // CATERING OPERATIONS
  // ----------------------------------------------------
  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this catering inquiry from database?')) return;
    try {
      await axios.delete(`${API_URL}/admin/catering/${id}`);
      displayMessage('success', 'Inquiry deleted.');
      fetchTabContent('catering');
      fetchAnalytics();
    } catch (e) {
      displayMessage('error', 'Failed to delete inquiry.');
    }
  };

  return (
    <div className="min-h-screen bg-cream-primary text-maroon-dark flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 md:h-screen md:sticky md:top-0 bg-maroon-primary text-cream-primary flex flex-col justify-between shrink-0 shadow-lg border-r border-gold-primary/20">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <img src="/logo.png" alt="JSB Logo" className="w-8 h-8 object-contain rounded-full border border-gold-primary/30" />
            <span className="font-serif font-black tracking-widest text-lg text-gold-primary">JSB CONTROL</span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-gold-primary text-maroon-primary shadow-md'
                  : 'text-cream-dark hover:bg-maroon-light'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                activeTab === 'menu'
                  ? 'bg-gold-primary text-maroon-primary shadow-md'
                  : 'text-cream-dark hover:bg-maroon-light'
              }`}
            >
              <BookOpen size={16} />
              <span>Menu Items</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                activeTab === 'gallery'
                  ? 'bg-gold-primary text-maroon-primary shadow-md'
                  : 'text-cream-dark hover:bg-maroon-light'
              }`}
            >
              <ImageIcon size={16} />
              <span>Gallery</span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                activeTab === 'reviews'
                  ? 'bg-gold-primary text-maroon-primary shadow-md'
                  : 'text-cream-dark hover:bg-maroon-light'
              }`}
            >
              <MessageSquare size={16} />
              <span>Moderation</span>
              {stats.pendingReviews > 0 && (
                <span className="ml-auto bg-gold-dark text-cream-light text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {stats.pendingReviews}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('catering')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                activeTab === 'catering'
                  ? 'bg-gold-primary text-maroon-primary shadow-md'
                  : 'text-cream-dark hover:bg-maroon-light'
              }`}
            >
              <ClipboardList size={16} />
              <span>Catering Quotes</span>
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-cream-dark/10">
          <button
            onClick={() => {
              logout();
              setCurrentPage('home');
            }}
            className="w-full border border-gold-primary/30 text-gold-primary hover:bg-gold-primary hover:text-maroon-primary font-sans font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all duration-200"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 max-w-7xl mx-auto w-full">
        {/* Flash messages */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-700 rounded-xl text-sm font-semibold flex items-center space-x-2 animate-fadeIn">
            <Check size={18} />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-700 rounded-xl text-sm font-semibold flex items-center space-x-2">
            <ShieldAlert size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* OVERVIEW PANEL */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black font-serif text-maroon-primary">Overview Dashboard</h1>
                <p className="text-xs text-maroon-dark/60 uppercase tracking-widest mt-1">
                  Owner: Chandrabhan Saroj
                </p>
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-gold-primary/20 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-maroon-dark/50">Total Dishes</p>
                <p className="text-4xl font-serif font-black text-maroon-primary mt-2">{stats.totalMenuItems}</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-gold-primary/20 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-maroon-dark/50">Catering Inquiries</p>
                <p className="text-4xl font-serif font-black text-maroon-primary mt-2">{stats.totalInquiries}</p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-gold-primary/20 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-maroon-dark/50">Reviews Approved / Total</p>
                <p className="text-4xl font-serif font-black text-maroon-primary mt-2">
                  {stats.approvedReviews} / {stats.totalReviews}
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-gold-primary/20 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-maroon-dark/50">Average Rating</p>
                <p className="text-4xl font-serif font-black text-gold-primary mt-2">⭐ {stats.averageRating}</p>
              </div>
            </div>

            {/* Welcome banner */}
            <div className="maroon-gradient text-cream-primary p-8 rounded-3xl border border-gold-primary/20 relative overflow-hidden shadow-lg">
              <div className="relative z-10 space-y-3">
                <h2 className="text-2xl font-serif font-bold text-gold-primary">Welcome, Shri Chandrabhan Saroj!</h2>
                <p className="text-sm font-light text-cream-dark max-w-2xl leading-relaxed">
                  Use this admin dashboard to oversee your online presence. You can immediately review party catering quote inquiries, approve public customer reviews, manage available dishes in Juhu/Santacruz, and update the photos displayed on your website gallery.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold-primary/10 rounded-full filter blur-2xl" />
            </div>
          </div>
        )}

        {/* MENU MANAGER TAB */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black font-serif text-maroon-primary">Manage Menu</h1>
                <p className="text-xs text-maroon-dark/50">Add, edit, or toggle availability of chaat dishes</p>
              </div>
              <button
                onClick={() => {
                  setEditingMenuItem(null);
                  setMenuFormData({ name: '', description: '', price: '', category: 'Puri', available: true, imageFile: null });
                  setShowMenuForm(true);
                }}
                className="flex items-center space-x-1.5 bg-maroon-primary text-gold-primary font-sans font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <Plus size={14} />
                <span>Add Dish</span>
              </button>
            </div>

            {/* Menu Form Modal */}
            {showMenuForm && (
              <div className="glass-card p-6 rounded-2xl border-2 border-gold-primary/30 max-w-xl">
                <h3 className="text-xl font-bold font-serif text-maroon-primary mb-4">
                  {editingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                <form onSubmit={handleMenuSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/60">Dish Name</label>
                      <input
                        type="text"
                        value={menuFormData.name}
                        onChange={(e) => setMenuFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-3 text-sm"
                        placeholder="e.g. Cheese Sev Puri"
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/60">Price (INR)</label>
                      <input
                        type="number"
                        value={menuFormData.price}
                        onChange={(e) => setMenuFormData(prev => ({ ...prev, price: e.target.value }))}
                        className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-3 text-sm"
                        placeholder="e.g. 110"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/60">Category</label>
                      <select
                        value={menuFormData.category}
                        onChange={(e) => setMenuFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-2 text-sm cursor-pointer"
                      >
                        <option value="Puri">Puri</option>
                        <option value="Bhel">Bhel</option>
                        <option value="Ragda">Ragda</option>
                        <option value="Specialty">Specialty</option>
                      </select>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/60">Photo File (Upload)</label>
                      <input
                        type="file"
                        onChange={(e) => setMenuFormData(prev => ({ ...prev, imageFile: e.target.files[0] }))}
                        className="text-xs py-2"
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/60">Description</label>
                    <textarea
                      value={menuFormData.description}
                      onChange={(e) => setMenuFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows="2"
                      className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-3 text-sm resize-none"
                      placeholder="Ingredients, toppings, etc..."
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="text-xs font-bold text-maroon-dark flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={menuFormData.available}
                        onChange={(e) => setMenuFormData(prev => ({ ...prev, available: e.target.checked }))}
                      />
                      <span>Available in Stall menu</span>
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="bg-maroon-primary text-gold-primary font-sans font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-lg shadow-sm"
                    >
                      Save Item
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenuForm(false);
                        setEditingMenuItem(null);
                      }}
                      className="border border-maroon-primary/30 text-maroon-primary font-sans font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Dishes grid */}
            {loading ? (
              <div className="text-center py-10">
                <div className="w-10 h-10 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl overflow-hidden shadow-sm border border-gold-primary/10 flex flex-col justify-between"
                  >
                    <div className="flex p-4 gap-4 items-center">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=120&auto=format&fit=crop&q=80'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-cream-dark/50 shrink-0"
                      />
                      <div className="flex-grow">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-gold-primary">{item.category}</span>
                        <h3 className="font-serif font-bold text-base text-maroon-primary">{item.name}</h3>
                        <p className="text-xs text-maroon-dark/80 font-bold mt-0.5">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 text-xs text-maroon-dark/70 line-clamp-2">
                      {item.description}
                    </div>

                    <div className="bg-cream-dark/25 p-3 flex justify-between items-center border-t border-gold-primary/10 text-xs">
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px]"
                      >
                        {item.available ? (
                          <>
                            <ToggleRight className="text-green-600 w-5 h-5" />
                            <span className="text-green-700">Available</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="text-maroon-dark/30 w-5 h-5" />
                            <span className="text-maroon-dark/55">Unavailable</span>
                          </>
                        )}
                      </button>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingMenuItem(item);
                            setMenuFormData({
                              name: item.name,
                              description: item.description,
                              price: item.price.toString(),
                              category: item.category,
                              available: item.available,
                              imageFile: null
                            });
                            setShowMenuForm(true);
                          }}
                          className="text-gold-primary hover:text-gold-dark font-bold uppercase text-[10px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* GALLERY MANAGER TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black font-serif text-maroon-primary">Manage Gallery</h1>
                <p className="text-xs text-maroon-dark/50">Upload or remove images from the website gallery</p>
              </div>
              <button
                onClick={() => setShowGalleryForm(true)}
                className="flex items-center space-x-1.5 bg-maroon-primary text-gold-primary font-sans font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                <Plus size={14} />
                <span>Upload Photo</span>
              </button>
            </div>

            {/* Gallery Upload Form */}
            {showGalleryForm && (
              <div className="glass-card p-6 rounded-2xl border-2 border-gold-primary/30 max-w-xl">
                <h3 className="text-xl font-bold font-serif text-maroon-primary mb-4">
                  Upload Gallery Image
                </h3>
                <form onSubmit={handleGallerySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/60">Category</label>
                      <select
                        value={galleryFormData.category}
                        onChange={(e) => setGalleryFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-2 text-sm cursor-pointer"
                      >
                        <option value="Food">Food</option>
                        <option value="Stall">Stall</option>
                        <option value="Customer">Customer</option>
                        <option value="Event">Event</option>
                      </select>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/60">Select Image File</label>
                      <input
                        type="file"
                        onChange={(e) => setGalleryFormData(prev => ({ ...prev, imageFile: e.target.files[0] }))}
                        className="text-xs py-2"
                        accept="image/*"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/60">Caption</label>
                    <input
                      type="text"
                      value={galleryFormData.caption}
                      onChange={(e) => setGalleryFormData(prev => ({ ...prev, caption: e.target.value }))}
                      className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-2.5 px-3 text-sm"
                      placeholder="e.g. Serving hot Ragda Puri"
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="bg-maroon-primary text-gold-primary font-sans font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-lg shadow-sm"
                    >
                      Upload Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowGalleryForm(false)}
                      className="border border-maroon-primary/30 text-maroon-primary font-sans font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Gallery images grid */}
            {loading ? (
              <div className="text-center py-10">
                <div className="w-10 h-10 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="glass-card rounded-2xl overflow-hidden shadow-sm border border-gold-primary/10 flex flex-col justify-between group relative"
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.caption}
                      className="w-full h-36 object-cover bg-cream-dark/50"
                    />
                    <div className="p-3">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-gold-primary">{img.category}</span>
                      <p className="text-xs text-maroon-dark truncate mt-0.5">{img.caption || 'Authentic JSB Chaat'}</p>
                    </div>
                    <button
                      onClick={() => deleteGalleryImage(img.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REVIEW MODERATION TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-serif text-maroon-primary">Review Moderation</h1>
              <p className="text-xs text-maroon-dark/50">Approve or reject customer review testimonials</p>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="w-10 h-10 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 text-maroon-dark/50 italic font-light text-sm">
                No reviews found in the database.
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className={`glass-card p-6 rounded-2xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      !rev.approved ? 'border-gold-primary border-l-4' : 'border-gold-primary/15'
                    }`}
                  >
                    <div className="space-y-2 flex-grow max-w-3xl">
                      <div className="flex items-center space-x-3">
                        <span className="font-serif font-bold text-base text-maroon-primary">{rev.name}</span>
                        <span className="text-[10px] text-maroon-dark/50 font-bold uppercase">
                          ({rev.mobileNumber})
                        </span>
                        <span className="bg-cream-dark text-maroon-primary text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          {rev.type}
                        </span>
                        {!rev.approved && (
                          <span className="bg-gold-primary/20 text-gold-dark border border-gold-primary/30 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                            Pending Approval
                          </span>
                        )}
                      </div>
                      <div className="flex text-gold-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={rev.rating > i ? 'currentColor' : 'none'}
                            className="mr-0.5"
                          />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-maroon-dark/85 font-light leading-relaxed italic">
                        "{rev.description}"
                      </p>
                    </div>

                    <div className="flex space-x-2 shrink-0 self-end sm:self-center">
                      {!rev.approved ? (
                        <button
                          onClick={() => handleApproveReview(rev.id, true)}
                          className="flex items-center space-x-1 bg-green-600 text-white font-sans font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg hover:bg-green-700"
                        >
                          <Check size={12} />
                          <span>Approve</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApproveReview(rev.id, false)}
                          className="flex items-center space-x-1 border border-maroon-primary/20 text-maroon-primary font-sans font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg hover:bg-maroon-primary/5"
                        >
                          <X size={12} />
                          <span>Hide</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(rev.id)}
                        className="border border-red-200 text-red-600 hover:bg-red-50 p-2 rounded-lg"
                        title="Delete Permanently"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CATERING INQUIRIES TAB */}
        {activeTab === 'catering' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-serif text-maroon-primary">Catering Inquiries</h1>
              <p className="text-xs text-maroon-dark/50">Manage catering requests and event live counter quotes</p>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="w-10 h-10 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-12 text-maroon-dark/50 italic font-light text-sm">
                No catering inquiries found in database.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-gold-primary/10 shadow-sm">
                <table className="min-w-full bg-cream-primary text-sm text-left">
                  <thead className="bg-maroon-primary text-gold-primary font-serif uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-6 py-4">Client Details</th>
                      <th className="px-6 py-4">Event Type</th>
                      <th className="px-6 py-4">Guests</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-dark/50 text-xs">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-cream-dark/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-maroon-primary">
                          <p>{inq.name}</p>
                          <a
                            href={`tel:${inq.mobileNumber}`}
                            className="text-[10px] text-gold-dark hover:underline flex items-center space-x-1 mt-0.5"
                          >
                            <span>📞 {inq.mobileNumber}</span>
                          </a>
                        </td>
                        <td className="px-6 py-4 font-semibold">{inq.eventType}</td>
                        <td className="px-6 py-4 font-bold">{inq.numberOfGuests}</td>
                        <td className="px-6 py-4 text-maroon-dark/80">
                          {inq.eventDate ? new Date(inq.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                        </td>
                        <td className="px-6 py-4 text-maroon-dark/70 max-w-xs truncate" title={inq.message}>
                          {inq.message}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <a
                              href={`https://wa.me/91${inq.mobileNumber}?text=Hello%20${encodeURIComponent(inq.name)}%2C%20this%20is%20Chandrabhan%20Saroj%20from%20JSB%20Chaat%20regarding%20your%20catering%20inquiry...`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                            >
                              WhatsApp
                            </a>
                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Simple Star Icon component since Lucide star is customized above
function Star({ size, fill, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
