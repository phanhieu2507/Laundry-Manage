// ===== NEW UI: Admin Navbar (replaces Ant Design Navbar) =====
// Matches Homepage design system with TailwindCSS

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Bell, LogOut, ChevronDown } from 'lucide-react';
import axios from '../api/axios';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // ===== EXISTING LOGIC: Get user info from sessionStorage =====
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
  const userName = userData?.user?.name || 'Admin';

  // ===== UI HELPER: Show notification =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Handle logout (UNCHANGED) =====
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      sessionStorage.removeItem('userData');
      sessionStorage.clear();
      
      showNotification('success', 'Successfully logged out');
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Error during logout:', error);
      showNotification('error', 'Logout failed. Please try again.');
    }
  };

  return (
    <>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50">
          <div className={`rounded-xl shadow-2xl p-4 ${
            notification.type === 'success' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
          }`}>
            <p className={`font-semibold ${notification.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
              {notification.message}
            </p>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className="bg-white fixed top-0 left-0 right-0 z-40 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo & Brand */}
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              PureLaundry Admin
            </span>
          </Link>

          {/* Right Side - Notification & Profile */}
          <div className="flex items-center space-x-6">
            {/* Notification Bell */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-xl transition"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-900">{userName}</span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                    <Link
                      to="/admin/profile"
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900 font-medium">Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition text-left"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="text-red-600 font-medium">Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminNavbar;
