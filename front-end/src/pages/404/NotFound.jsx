import React from "react";
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">Sorry, the page you visited does not exist.</p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <Home size={20} />
        Back Home
      </Link>
    </div>
  </div>
);

export default NotFound;