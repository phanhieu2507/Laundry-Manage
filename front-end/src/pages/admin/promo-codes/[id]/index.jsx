import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, AlertCircle, Tag, Calendar, Users } from 'lucide-react';
import axios from '../../../../component/api/axios';
import AdminNavbar from "../../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../../component/sidebar/AdminSidebar";

const PromoCodeDetail = () => {
  const [promoCode, setPromoCode] = useState(null);
  const [users, setUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);
  const { id } = useParams();

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch promo code (UNCHANGED) =====
  const fetchPromoCode = async () => {
    try {
      const response = await axios.get(`/promo-codes/${id}`);
      setPromoCode(response.data);
    } catch (error) {
      showNotification('error', 'Error fetching promo code details');
    }
  };

  // ===== EXISTING LOGIC: Fetch users (UNCHANGED) =====
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      showNotification('error', 'Error fetching users');
    }
  };

  // ===== EXISTING LOGIC: Fetch assigned users (UNCHANGED) =====
  const fetchAssignedUsers = async () => {
    try {
      const response = await axios.get(`/promo-codes/${id}/assigned-users`);
      setAssignedUsers(response.data);
    } catch (error) {
      showNotification('error', 'Error fetching assigned users');
    }
  };

  useEffect(() => {
    fetchPromoCode();
    fetchUsers();
    fetchAssignedUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ===== EXISTING LOGIC: Handle assign (UNCHANGED) =====
  const handleAssign = () => {
    setIsModalVisible(true);
  };

  // ===== EXISTING LOGIC: Handle OK (UNCHANGED) =====
  const handleOk = async () => {
    if (selectedUsers.length === 0 || !quantity) {
      showNotification('error', 'Please select users and enter quantity');
      return;
    }
    try {
      await axios.post(`/promo-codes/${id}/assign`, {
        userIds: selectedUsers,
        quantity: quantity
      });
      setIsModalVisible(false);
      showNotification('success', 'Promo code assigned successfully');
      fetchAssignedUsers();
      setSelectedUsers([]);
      setQuantity(1);
    } catch (error) {
      showNotification('error', 'Error assigning promo code');
    }
  };

  // ===== EXISTING LOGIC: Handle cancel (UNCHANGED) =====
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUsers([]);
    setQuantity(1);
  };

  // ===== EXISTING LOGIC: Handle select change (UNCHANGED) =====
  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // ===== EXISTING LOGIC: Handle select all (UNCHANGED) =====
  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
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
          </div>
        </div>
      )}

      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Admin Navbar */}
        <AdminNavbar />

        {/* Promo Code Details */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Promo Code Details</h1>

          {/* Promo Code Info Card */}
          {promoCode && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Tag size={20} className="text-blue-600" />
                Promo Code Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold">Code</p>
                  <p className="text-lg text-gray-800 font-medium">{promoCode.code}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold">Description</p>
                  <p className="text-lg text-gray-800">{promoCode.description}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold">Discount Type</p>
                  <span className={`inline-block px-3 py-1 rounded-lg font-semibold ${
                    promoCode.discount_type === 'percentage' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {promoCode.discount_type}
                  </span>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold">Discount Value</p>
                  <p className="text-lg text-gray-800 font-medium">{promoCode.discount_value}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold flex items-center gap-1">
                    <Calendar size={16} />
                    Valid From
                  </p>
                  <p className="text-lg text-gray-800">{promoCode.valid_from}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold flex items-center gap-1">
                    <Calendar size={16} />
                    Valid Until
                  </p>
                  <p className="text-lg text-gray-800">{promoCode.valid_until}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-lg font-semibold ${
                    promoCode.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {promoCode.status}
                  </span>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold">Usage Limit</p>
                  <p className="text-lg text-gray-800">{promoCode.usage_limit}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 font-semibold">Times Used</p>
                  <p className="text-lg text-gray-800 font-medium">{promoCode.times_used}</p>
                </div>
              </div>

              <button
                onClick={handleAssign}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Users size={18} />
                Assign Promo Code
              </button>
            </div>
          )}

          {/* Assigned Users Table */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              Assigned Users
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Assigned On</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assignedUsers.length > 0 ? (
                    assignedUsers.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-800">{item.user.name}</td>
                        <td className="px-6 py-4 text-gray-800">{item.user.phone}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(item.created_at).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            item.is_used ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.is_used ? 'Used' : 'Not Used'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        No users assigned yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Promo Code</h2>
            
            {/* Select All Button */}
            <button
              onClick={handleSelectAll}
              className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all"
            >
              {selectedUsers.length === users.length ? 'Deselect All' : 'Select All'}
            </button>

            {/* User Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Select Users *</label>
              <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto">
                {users.map((user) => (
                  <label key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-800">{user.name} - {user.phone}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodeDetail;
