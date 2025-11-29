import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
    {/* Header */}
    <header className="bg-white shadow-lg px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <img src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png" alt="Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-blue-600 tracking-tight">Laundry E-Commerce</span>
      </div>
      <nav className="flex gap-8 text-lg font-semibold">
        <Link to="/" className="hover:text-blue-500 transition">Home</Link>
        <Link to="/services" className="hover:text-blue-500 transition">Services</Link>
        <Link to="/events" className="hover:text-blue-500 transition">Events</Link>
        <Link to="/news" className="hover:text-blue-500 transition">News</Link>
        <Link to="/about" className="hover:text-blue-500 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link>
      </nav>
    </header>
    {/* Main Content */}
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
      {children}
    </main>
    {/* Footer */}
    <footer className="bg-white border-t mt-12 py-8 px-4 text-center text-gray-500 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-blue-600">Laundry E-Commerce</span> &copy; 2025. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">Instagram</a>
          <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Zalo</a>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-400">Contact: info@laundry.com | Hotline: 0865 928 222</div>
    </footer>
  </div>
);

export default MainLayout;
