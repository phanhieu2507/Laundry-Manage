import React, { useState, useEffect } from 'react';
import axios from '../../../component/api/axios';
import { Check, AlertCircle, User, Lock, Mail, Phone, Home } from 'lucide-react';
import UserNavbar from '../../../component/navbar/user-nav';
import UserSidebar from '../../../component/sidebar/user-side';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    confirm: ''
  });
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message, description = '') => {
    setNotification({ type, message, description });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch user data (UNCHANGED) =====
  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = storedUserData.user?.id;

    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/users/${userId}`);
          setFormData(prev => ({
            ...prev,
            name: response.data.name || '',
            email: response.data.email || '',
            address: response.data.address || '',
            phone: response.data.phone || ''
          }));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  // ===== VALIDATION =====
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Please input your full name!';
    if (!formData.oldPassword) newErrors.oldPassword = 'Please input your old password!';
    if (!formData.newPassword) newErrors.newPassword = 'Please enter a new password!';
    if (!formData.confirm) newErrors.confirm = 'Please confirm your new password!';
    if (formData.newPassword && formData.confirm && formData.newPassword !== formData.confirm) {
      newErrors.confirm = 'The two passwords that you entered do not match!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== EXISTING LOGIC: Handle submit (UNCHANGED) =====
  const onFinish = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { oldPassword, newPassword } = formData;
    try {
      await axios.post('/users/change-password', {
        userId: JSON.parse(sessionStorage.getItem('userData')).user.id,
        oldPassword,
        newPassword
      });
      setFormData(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirm: ''
      }));
      showNotification('success', 'Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      showNotification('error', 'Failed to update password', 'Your old password may be incorrect or the server could be unreachable.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-start gap-3 max-w-md ${
          notification.type === 'success' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
        }`}>
          {notification.type === 'success' ? (
            <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          ) : (
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          )}
          <div className="flex-1">
            <h4 className={`font-semibold ${notification.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
              {notification.message}
            </h4>
            {notification.description && (
              <p className={`text-sm mt-1 ${notification.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {notification.description}
              </p>
            )}
          </div>
        </div>
      )}

      <UserSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <UserNavbar />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Profile</h1>
            
            <form onSubmit={onFinish} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline mr-2" size={16} />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email (Disabled) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline mr-2" size={16} />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Home className="inline mr-2" size={16} />
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline mr-2" size={16} />
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
                
                {/* Old Password */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="inline mr-2" size={16} />
                    Old Password *
                  </label>
                  <input
                    type="password"
                    value={formData.oldPassword}
                    onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.oldPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="inline mr-2" size={16} />
                    New Password *
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.newPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="inline mr-2" size={16} />
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    value={formData.confirm}
                    onChange={(e) => setFormData({...formData, confirm: e.target.value})}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      errors.confirm ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
