// ===== NEW UI: Admin Services (replaces Ant Design components) =====
// Matches Homepage design system with TailwindCSS

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Upload as UploadIcon,
  X,
  Check,
  AlertCircle
} from "lucide-react";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../component/sidebar/AdminSidebar";
import Image from "../../../component/image";

const AdminService = () => {
  const [services, setServices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const servicesPerPage = 6;
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // ===== FORM STATE =====
  const [formData, setFormData] = useState({
    service_id: null,
    service_name: "",
    duration: 0,
    description: "",
    is_available: true,
    price_per_unit: 0,
    unit_type: "",
    image: null
  });

  // ===== FORM ERRORS =====
  const [errors, setErrors] = useState({});

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch services =====
  const fetchData = async () => {
    const response = await axios.get("/services");
    setServices(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===== EXISTING LOGIC: Handle Add =====
  const handleAdd = () => {
    setFormData({
      service_id: null,
      service_name: "",
      duration: 0,
      description: "",
      is_available: true,
      price_per_unit: 0,
      unit_type: "",
      image: null
    });
    setImagePreview(null);
    setErrors({});
    setVisible(true);
  };

  // ===== EXISTING LOGIC: Handle Edit =====
  const handleEdit = (record) => {
    setFormData({
      service_id: record.service_id,
      service_name: record.service_name,
      duration: record.duration,
      description: record.description,
      is_available: record.is_available,
      price_per_unit: record.price_per_unit,
      unit_type: record.unit_type,
      image: null
    });
    setImagePreview(record.image_url);
    setErrors({});
    setVisible(true);
  };

  // ===== EXISTING LOGIC: Handle Delete =====
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await axios.delete(`/services/${id}`);
      showNotification('success', 'Service deleted successfully');
      fetchData();
    }
  };

  // ===== FORM VALIDATION =====
  const validateForm = () => {
    const newErrors = {};
    if (!formData.service_name.trim()) {
      newErrors.service_name = "Service name is required";
    }
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }
    if (!formData.price_per_unit || formData.price_per_unit <= 0) {
      newErrors.price_per_unit = "Price must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== HANDLE FILE UPLOAD =====
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ===== EXISTING LOGIC: Handle Submit (UNCHANGED) =====
  const handleOk = async () => {
    if (!validateForm()) return;

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData[key]) {
          submitData.append('image', formData[key]);
        } else if (key !== 'image') {
          if (key === 'is_available') {
            submitData.append(key, formData[key] ? '1' : '0');
          } else if (key === 'duration' || key === 'price_per_unit') {
            submitData.append(key, Number(formData[key]));
          } else if (formData[key] !== null) {
            submitData.append(key, formData[key]);
          }
        }
      });

      if (formData.service_id) {
        await axios.put(`/services/${formData.service_id}`, submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showNotification('success', 'Service updated successfully');
      } else {
        await axios.post('/services', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showNotification('success', 'Service added successfully');
      }
      setVisible(false);
      fetchData();
    } catch (error) {
      console.error("Submission failed:", error);
      showNotification('error', 'Failed to save service');
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50">
          <div className={`rounded-xl shadow-2xl p-4 flex items-center space-x-3 ${
            notification.type === 'success' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
          }`}>
            {notification.type === 'success' ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600" />
            )}
            <p className={`font-semibold ${notification.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
              {notification.message}
            </p>
          </div>
        </div>
      )}

      <AdminNavbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-grow ml-64 p-8 mt-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Laundry Services</h1>
            <p className="text-gray-600">Manage all your laundry services</p>
          </div>

          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition mb-8"
          >
            <Plus className="w-5 h-5" />
            <span>Add Service</span>
          </button>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentServices.map((service) => (
              <div
                key={service.service_id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image 
                    src={service.image_url} 
                    alt="Service Image" 
                    className="object-cover w-full h-full"
                  />
                  {service.is_available ? (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Available
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Unavailable
                    </div>
                  )}
                </div>

                {/* Service Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.service_name}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Duration:</span> {service.duration} minutes
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Price:</span> ${service.price_per_unit || "N/A"} / {service.unit_type || "unit"}
                    </p>
                    <p className="text-gray-600 line-clamp-2">
                      <span className="font-semibold text-gray-900">Description:</span> {service.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(service.service_id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              Previous
            </button>
            
            {[...Array(Math.ceil(services.length / servicesPerPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(services.length / servicesPerPage)))}
              disabled={currentPage === Math.ceil(services.length / servicesPerPage)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === Math.ceil(services.length / servicesPerPage)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {formData.service_id ? 'Edit Service' : 'Add Service'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={formData.service_name}
                  onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                    errors.service_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter service name"
                />
                {errors.service_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.service_name}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter duration"
                  min="0"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                  placeholder="Enter description"
                  rows="3"
                />
              </div>

              {/* Price Per Unit */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price Per Unit *
                </label>
                <input
                  type="number"
                  value={formData.price_per_unit}
                  onChange={(e) => setFormData({ ...formData, price_per_unit: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                    errors.price_per_unit ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
                {errors.price_per_unit && (
                  <p className="text-red-500 text-sm mt-1">{errors.price_per_unit}</p>
                )}
              </div>

              {/* Unit Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Unit Type
                </label>
                <input
                  type="text"
                  value={formData.unit_type}
                  onChange={(e) => setFormData({ ...formData, unit_type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                  placeholder="e.g., kg, item, load"
                />
              </div>

              {/* Is Available */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="is_available"
                  checked={formData.is_available}
                  onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="is_available" className="text-sm font-semibold text-gray-900">
                  Service Available
                </label>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Service Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData({ ...formData, image: null });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">Click to upload image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                {formData.service_id ? 'Update Service' : 'Add Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminService;
