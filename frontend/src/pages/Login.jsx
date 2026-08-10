import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Key, User, Lock, ArrowLeft } from 'lucide-react';

export default function Login({ setCurrentPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, token } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (token) {
      setCurrentPage('admin');
    }
  }, [token, setCurrentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields.');
      setSubmitting(false);
      return;
    }

    const result = await login(username, password);
    setSubmitting(false);

    if (result.success) {
      setCurrentPage('admin');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-maroon-dark relative px-4 overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gold-primary/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-maroon-primary/20 rounded-full filter blur-3xl" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-cream-primary p-8 rounded-3xl border border-gold-primary/30 shadow-2xl relative z-10">
        {/* Back Link */}
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center space-x-1.5 text-xs text-maroon-primary hover:text-gold-primary transition-colors duration-200 mb-6 font-semibold uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          <span>Back to Site</span>
        </button>

        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full gold-gradient text-maroon-primary flex items-center justify-center mx-auto mb-3 border border-gold-primary/30 shadow-md">
            <Key size={20} />
          </div>
          <h2 className="text-2xl font-black text-maroon-primary font-serif uppercase tracking-wider">
            Admin Portal
          </h2>
          <p className="text-[10px] text-maroon-dark/60 uppercase tracking-widest mt-1">
            JSB Chaat (Jai Shankar Bholenath)
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-semibold rounded-xl text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65 flex items-center space-x-1">
              <User size={12} className="text-gold-primary" />
              <span>Username</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin"
              className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light text-maroon-dark"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-maroon-dark/65 flex items-center space-x-1">
              <Lock size={12} className="text-gold-primary" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="bg-cream-dark/20 border border-gold-primary/20 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold-primary focus:bg-cream-light text-maroon-dark"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-maroon-primary hover:bg-maroon-light text-gold-primary font-sans font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg border border-gold-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <p className="mt-8 text-[10px] text-center text-maroon-dark/50 italic leading-relaxed">
          Authorized personnel access only.<br />
          Default credentials are set on initial database seeding.
        </p>
      </div>
    </div>
  );
}
