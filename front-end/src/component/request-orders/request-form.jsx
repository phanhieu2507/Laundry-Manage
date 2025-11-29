import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Check, AlertCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RequestForm = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [serviceList, setServiceList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    service: [],
    detail: ''
  });
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message, description = '') => {
    setNotification({ type, message, description });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch service list (UNCHANGED) =====
  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        const response = await axios.get('/services');
        setServiceList(response.data);
      } catch (error) {
        console.error('Error fetching service list:', error);
      }
    };

    fetchServiceList();
  }, []);

  // ===== VALIDATION =====
  const validate = () => {
    const newErrors = {};
    if (formData.service.length === 0) newErrors.service = 'Please select at least one service!';
    if (!formData.detail) newErrors.detail = 'Please enter the detail!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== EXISTING LOGIC: Handle submit (UNCHANGED) =====
  const onFinish = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const completeData = {
        ...formData,
        user_id: userData.user.id,
        service: formData.service.join(', '),
        status: "Pending"
      };
      const response = await axios.post('/request-orders', completeData);
      console.log('Request created:', response.data);
      setOrderId(response.data.request_order_id);
      setIsModalVisible(true);
      showNotification('success', 'Request Created Successfully', 'Your request has been submitted successfully.');
    } catch (error) {
      console.error('Error creating request:', error);
      showNotification('error', 'Failed to Create Request', 'There was an error submitting your request.');
    }
  };

  // ===== EXISTING LOGIC: Handle cancel (UNCHANGED) =====
  const handleCancel = () => {
    navigate('/user/request-orders');
  };

  // ===== EXISTING LOGIC: Handle OK (UNCHANGED) =====
  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/user/request-orders');
  };

  // ===== TOGGLE SERVICE SELECTION =====
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

      <form onSubmit={onFinish} className="space-y-6">
        {/* Service Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Service *</label>
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
          {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
        </div>

        {/* Detail */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Detail *</label>
          <textarea
            rows="4"
            value={formData.detail}
            onChange={(e) => setFormData({...formData, detail: e.target.value})}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${
              errors.detail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your request here..."
          />
          {errors.detail && <p className="text-red-500 text-sm mt-1">{errors.detail}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Submit Request
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Request Successful</h2>
              <button
                onClick={() => setIsModalVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-700 mb-2">Your request has been successfully submitted.</p>
            <p className="text-gray-700 mb-6">Your order ID is: <span className="font-bold text-blue-600">#{orderId}</span></p>
            <button
              onClick={handleOk}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestForm;
