import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, User, Mail, Phone, MapPin, Lock, AlertCircle, CheckCircle } from "lucide-react";
import axios from "../../component/api/axios";

const Register = () => {
  const navigate = useNavigate();
  
  // ===== STATE MANAGEMENT (UNCHANGED LOGIC) =====
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  // ===== UI HELPER: Show notification =====
  const showNotification = (type, message, description) => {
    setNotification({ type, message, description });
    setTimeout(() => setNotification(null), 5000);
  };

  // ===== UI HELPER: Form validation =====
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Please input your full name!';
    }
    
    if (!formData.email) {
      newErrors.email = 'Please input your email!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email!';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Please input your phone number!';
    }
    
    if (!formData.password) {
      newErrors.password = 'Please input your password!';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters!';
    }
    
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Please confirm your password!';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'The two passwords that you entered do not match!';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== UI HELPER: Handle input change =====
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ===== EXISTING LOGIC: Register submission (UNCHANGED) =====
  const onFinish = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await axios.post("/register", formData);
      
      showNotification(
        'success',
        'Registration Successful',
        'You have successfully registered!'
      );
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error('Registration Failed:', error);
      showNotification(
        'error',
        'Registration Failed',
        error.response?.data?.message || 'An error occurred during registration'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
      {/* ===== NEW UI: Notification Toast ===== */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className={`rounded-xl shadow-2xl p-6 max-w-md border-2 ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-500' 
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`rounded-full p-2 ${
                notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {notification.type === 'success' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-lg mb-1 ${
                  notification.type === 'success' ? 'text-green-900' : 'text-red-900'
                }`}>
                  {notification.message}
                </h4>
                {notification.description && (
                  <p className={notification.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                    {notification.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== NEW UI: Register Card ===== */}
      <div className="w-full max-w-2xl">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <Link to="/homepage" className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              PureLaundry
            </span>
          </Link>
        </div>

        {/* Register Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account 👋
            </h1>
            <p className="text-gray-600">
              Join us for premium laundry services
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onFinish} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.name
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-200 focus:border-blue-600'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email & Phone - Two columns */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.email
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-blue-600'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+81 90-1234-5678"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-blue-600'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Address (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password & Confirm Password - Two columns */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.password
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-blue-600'
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                      errors.password_confirmation
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-blue-600'
                    }`}
                  />
                </div>
                {errors.password_confirmation && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition transform ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'REGISTER'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Login here!
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link 
            to="/homepage" 
            className="text-gray-600 hover:text-blue-600 transition font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
