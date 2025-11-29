// ===== NEW UI: Admin Edit Order (replaces Ant Design components) =====
// Matches Homepage design system with TailwindCSS

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../../component/api/axios";
import AdminNavbar from "../../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../../component/sidebar/AdminSidebar";
import { Check, AlertCircle, Calendar, Tag, Edit } from "lucide-react";

const AdminEditOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [serviceList, setServiceList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    total_amount: "",
    payment_status: "",
    order_date: "",
    service: [],
    detail: "",
    promo_code: ""
  });

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message, description = '') => {
    setNotification({ type, message, description });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch order and service data =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderDetailsResponse, serviceListResponse] = await Promise.all([
          axios.get(`/orders/${orderId}`),
          axios.get("/services")
        ]);

        setServiceList(serviceListResponse.data);
        const orderData = orderDetailsResponse.data;
        setFormData({
          phone: orderData.user.phone,
          total_amount: orderData.total_amount,
          payment_status: orderData.payment_status,
          order_date: orderData.order_date,
          service: orderData.service.split(", "),
          detail: orderData.detail,
          promo_code: orderData.promo_code || ''
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification('error', 'Error Fetching Data', 'There was an issue fetching order and service details.');
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // ===== HANDLE SERVICE TOGGLE =====
  const toggleService = (serviceName) => {
    if (formData.service.includes(serviceName)) {
      setFormData({...formData, service: formData.service.filter(s => s !== serviceName)});
    } else {
      setFormData({...formData, service: [...formData.service, serviceName]});
    }
  };

  // ===== EXISTING LOGIC: Handle submit (UNCHANGED) =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/orders/${orderId}`, {
        ...formData,
        service: formData.service.join(", ")
      });
      showNotification('success', 'Order Updated Successfully');
      setTimeout(() => {
        navigate("/admin/orders");
      }, 1500);
    } catch (error) {
      console.error("Error updating order:", error);
      showNotification('error', 'Error Updating Order', error.message);
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

      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Admin Navbar */}
        <AdminNavbar />

        {/* Edit Order Form */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Order</h1>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Total Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount</label>
                <input
                  type="number"
                  value={formData.total_amount}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Status</label>
                <select
                  value={formData.payment_status}
                  onChange={(e) => setFormData({...formData, payment_status: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>

              {/* Order Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Order Date
                </label>
                <input
                  type="date"
                  value={formData.order_date}
                  onChange={(e) => setFormData({...formData, order_date: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Service Multi-Select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Services</label>
                <div className="flex flex-wrap gap-2">
                  {serviceList.map((service) => (
                    <button
                      key={service.service_id}
                      type="button"
                      onClick={() => toggleService(service.service_name)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        formData.service.includes(service.service_name)
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {service.service_name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detail</label>
                <textarea
                  rows="4"
                  value={formData.detail}
                  onChange={(e) => setFormData({...formData, detail: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  placeholder="Enter order details..."
                />
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="inline mr-2" size={16} />
                  Promo Code
                </label>
                <input
                  type="text"
                  value={formData.promo_code}
                  onChange={(e) => setFormData({...formData, promo_code: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter promo code (optional)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Edit size={18} />
                Update Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditOrder;
