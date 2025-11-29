// ===== NEW UI: Admin Create Order (replaces Ant Design components) =====
// Matches Homepage design system with TailwindCSS

import React, { useState, useEffect } from "react";
import axios from "../../../../component/api/axios";
import AdminNavbar from "../../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../../component/sidebar/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { Check, AlertCircle, Calendar, Tag, ShoppingCart } from "lucide-react";

const AdminCreateOrder = () => {
  const [formData, setFormData] = useState({
    phone: "",
    total_amount: "",
    payment_status: "",
    order_date: "",
    service: [],
    detail: "",
    promo_code: ""
  });
  const [serviceList, setServiceList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message, description = '') => {
    setNotification({ type, message, description });
    setTimeout(() => setNotification(null), 4000);
  };

  // ===== EXISTING LOGIC: Fetch service list =====
  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        const response = await axios.get("/services");
        setServiceList(response.data.map(service => ({
          ...service,
          value: service.service_name
        })));
      } catch (error) {
        console.error("Error fetching service list:", error);
      }
    };
    fetchServiceList();
  }, []);

  // ===== EXISTING LOGIC: Check promo code =====
  const checkPromoCode = async (phone, promoCode) => {
    try {
      const response = await axios.post('/promo-codes/apply', { code: promoCode, phone: phone });
      return response.data;
    } catch (error) {
      showNotification('error', 'Promo Code Error', error.response ? error.response.data.message : "There was an error applying the promo code.");
      return null;
    }
  };
  
  // ===== FORM VALIDATION =====
  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.total_amount || formData.total_amount <= 0) {
      newErrors.total_amount = "Total amount must be greater than 0";
    }
    if (!formData.payment_status) newErrors.payment_status = "Payment status is required";
    if (!formData.order_date) newErrors.order_date = "Order date is required";
    if (formData.service.length === 0) newErrors.service = "At least one service is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== EXISTING LOGIC: Handle submit (UNCHANGED) =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const promoResponse = await checkPromoCode(formData.phone, formData.promo_code);
    if (!promoResponse && formData.promo_code) {
      return;
    }
  
    try {
      const dataToSend = {
        ...formData,
        service: formData.service.join(", "),
        discount: promoResponse?.discount_value,
        discount_type: promoResponse?.discount_type
      };
      await axios.post("/orders", dataToSend);
      showNotification('success', 'Order Created Successfully', `Discount applied: ${promoResponse?.discount_value || 0} if applicable.`);
      setTimeout(() => {
        navigate('/admin/orders');
      }, 1500);
    } catch (error) {
      showNotification('error', 'Error Creating Order', error.response ? error.response.data.message : error.message);
    }
  };

  // ===== HANDLE SERVICE SELECTION =====
  const toggleService = (serviceName) => {
    if (formData.service.includes(serviceName)) {
      setFormData({...formData, service: formData.service.filter(s => s !== serviceName)});
    } else {
      setFormData({...formData, service: [...formData.service, serviceName]});
    }
  };  

  return (
    <>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50">
          <div className={`rounded-xl shadow-2xl p-4 max-w-md ${
            notification.type === 'success' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
          }`}>
            <div className="flex items-start space-x-3">
              {notification.type === 'success' ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              )}
              <div>
                <p className={`font-semibold ${notification.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                  {notification.message}
                </p>
                {notification.description && (
                  <p className={`text-sm mt-1 ${notification.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                    {notification.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminNavbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-grow ml-64 p-8 mt-16 flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
                <span>Create Order</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone *
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter customer phone"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Total Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Total Amount *
                  </label>
                  <input
                    type="number"
                    value={formData.total_amount}
                    onChange={(e) => setFormData({...formData, total_amount: parseFloat(e.target.value) || ''})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                      errors.total_amount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter total amount"
                    min="0"
                    step="0.01"
                  />
                  {errors.total_amount && <p className="text-red-500 text-sm mt-1">{errors.total_amount}</p>}
                </div>

                {/* Payment Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Payment Status *
                  </label>
                  <select
                    value={formData.payment_status}
                    onChange={(e) => setFormData({...formData, payment_status: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                      errors.payment_status ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select payment status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </select>
                  {errors.payment_status && <p className="text-red-500 text-sm mt-1">{errors.payment_status}</p>}
                </div>

                {/* Order Date */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Order Date *</span>
                  </label>
                  <input
                    type="date"
                    value={formData.order_date}
                    onChange={(e) => setFormData({...formData, order_date: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                      errors.order_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.order_date && <p className="text-red-500 text-sm mt-1">{errors.order_date}</p>}
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Services * (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {serviceList.map((service) => (
                      <button
                        key={service.service_id}
                        type="button"
                        onClick={() => toggleService(service.service_name)}
                        className={`px-4 py-3 rounded-xl border-2 font-semibold transition ${
                          formData.service.includes(service.service_name)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                        }`}
                      >
                        {service.service_name}
                      </button>
                    ))}
                  </div>
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                </div>

                {/* Detail */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Detail
                  </label>
                  <textarea
                    value={formData.detail}
                    onChange={(e) => setFormData({...formData, detail: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                    placeholder="Enter order details"
                    rows="4"
                  />
                </div>

                {/* Promo Code */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <Tag className="w-4 h-4" />
                    <span>Promo Code</span>
                  </label>
                  <input
                    type="text"
                    value={formData.promo_code}
                    onChange={(e) => setFormData({...formData, promo_code: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                    placeholder="Enter promo code (optional)"
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    Create Order
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/orders')}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCreateOrder;
