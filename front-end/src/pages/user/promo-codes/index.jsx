import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import axios from '../../../../component/api/axios';
import UserNavbar from "../../../../component/navbar/user-nav";
import UserSidebar from "../../../../component/sidebar/user-side";

const UserPromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [notification, setNotification] = useState(null);

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch promo codes (UNCHANGED) =====
  useEffect(() => {
    fetchUserPromoCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserPromoCodes = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const userId = userData.user.id;
      const { data } = await axios.get(`/users/${userId}/promo-codes`);
      setPromoCodes(data);
    } catch (error) {
      showNotification('error', 'Error fetching promo codes');
    }
  };

  // ===== EXISTING LOGIC: Get status tag (MODIFIED to return JSX) =====
  const getStatusTag = (promoCode) => {
    const now = new Date();
    const validUntil = new Date(promoCode.valid_until);
    
    if (promoCode.times_used >= promoCode.usage_limit) {
      return <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-red-100 text-red-700">Used Up</span>;
    } else if (validUntil < now) {
      return <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-orange-100 text-orange-700">Expired</span>;
    } else {
      return <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-green-100 text-green-700">Active</span>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-start gap-3 max-w-md bg-red-50 border-2 border-red-500">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <h4 className="font-semibold text-red-900">{notification.message}</h4>
          </div>
        </div>
      )}

      <UserSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <UserNavbar />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Promo Codes</h1>
          
          {/* Promo Codes Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount Value</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Valid From</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Valid Until</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Usage Limit</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Times Used</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {promoCodes.length > 0 ? (
                    promoCodes.map((promoCode) => (
                      <tr key={promoCode.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-800 font-medium">{promoCode.code}</td>
                        <td className="px-6 py-4 text-gray-800">{promoCode.description}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            promoCode.discount_type === 'percentage' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {promoCode.discount_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-800 font-medium">{promoCode.discount_value}</td>
                        <td className="px-6 py-4 text-gray-600">{promoCode.valid_from}</td>
                        <td className="px-6 py-4 text-gray-600">{promoCode.valid_until}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            promoCode.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {promoCode.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-800">{promoCode.usage_limit}</td>
                        <td className="px-6 py-4 text-gray-800">{promoCode.times_used}</td>
                        <td className="px-6 py-4">{getStatusTag(promoCode)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="px-6 py-8 text-center text-gray-500">
                        No promo codes found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPromoCodes;
