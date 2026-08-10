import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, login, admin

  return (
    <AuthProvider>
      <div className="min-h-screen bg-cream-primary antialiased selection:bg-gold-primary selection:text-maroon-dark">
        {currentPage === 'home' && (
          <Home setCurrentPage={setCurrentPage} currentPage={currentPage} />
        )}
        {currentPage === 'login' && (
          <Login setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'admin' && (
          <AdminDashboard setCurrentPage={setCurrentPage} />
        )}
      </div>
    </AuthProvider>
  );
}
