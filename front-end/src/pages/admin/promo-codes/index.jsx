// ===== NEW UI: Admin Promo Codes (replaces Ant Design components) =====
// Matches Homepage design system with TailwindCSS

import React, { useEffect, useState } from 'react';
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../component/sidebar/AdminSidebar";
import { 
  Plus,
  Edit, 
  Trash2, 
  Check, 
  AlertCircle,
  X,
  Calendar,
  Tag as TagIcon
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const PromoCodeList = () => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPromoCode, setCurrentPromoCode] = useState(null);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    // ===== FORM STATE =====
    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discount_type: 'fixed',
        discount_value: 0,
        valid_from: '',
        valid_until: '',
        status: 'active',
        usage_limit: 0
    });

    const [errors, setErrors] = useState({});

    // ===== NOTIFICATION HELPER =====
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    // ===== EXISTING LOGIC: Fetch promo codes =====
    useEffect(() => {
        fetchPromoCodes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPromoCodes = async () => {
        try {
            const { data } = await axios.get('/promo-codes');
            setPromoCodes(data);
        } catch (error) {
            showNotification('error', 'Error fetching promo codes');
        }
    };

    // ===== EXISTING LOGIC: Handle Add =====
    const handleAdd = () => {
        setFormData({
            code: '',
            description: '',
            discount_type: 'fixed',
            discount_value: 0,
            valid_from: '',
            valid_until: '',
            status: 'active',
            usage_limit: 0
        });
        setCurrentPromoCode(null);
        setErrors({});
        setIsModalVisible(true);
    };

    // ===== EXISTING LOGIC: Handle Edit =====
    const handleEdit = (promoCode) => {
        setCurrentPromoCode(promoCode);
        setFormData({
            code: promoCode.code,
            description: promoCode.description,
            discount_type: promoCode.discount_type,
            discount_value: promoCode.discount_value,
            valid_from: promoCode.valid_from,
            valid_until: promoCode.valid_until,
            status: promoCode.status,
            usage_limit: promoCode.usage_limit
        });
        setErrors({});
        setIsModalVisible(true);
    };

    // ===== EXISTING LOGIC: Handle Delete =====
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete this promo code?")) {
            try {
                await axios.delete(`/promo-codes/${id}`);
                fetchPromoCodes();
                showNotification('success', 'Promo code deleted successfully');
            } catch (error) {
                showNotification('error', 'Error deleting promo code');
            }
        }
    };

    // ===== FORM VALIDATION =====
    const validateForm = () => {
        const newErrors = {};
        if (!formData.code.trim()) newErrors.code = "Code is required";
        if (!formData.discount_value || formData.discount_value <= 0) {
            newErrors.discount_value = "Discount value must be greater than 0";
        }
        if (!formData.valid_from) newErrors.valid_from = "Valid from date is required";
        if (!formData.valid_until) newErrors.valid_until = "Valid until date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ===== EXISTING LOGIC: Handle Submit (UNCHANGED) =====
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (currentPromoCode) {
                await axios.put(`/promo-codes/${currentPromoCode.id}`, formData);
                showNotification('success', 'Promo code updated successfully');
            } else {
                await axios.post('/promo-codes', formData);
                showNotification('success', 'Promo code added successfully');
            }
            fetchPromoCodes();
            setIsModalVisible(false);
        } catch (error) {
            showNotification('error', `Error ${currentPromoCode ? 'updating' : 'adding'} promo code`);
        }
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Promo Codes</h1>
                        <p className="text-gray-600">Manage promotional codes and discounts</p>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition mb-6"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Promo Code</span>
                    </button>

                    {/* Promo Codes Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Code</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Description</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Discount Type</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Discount Value</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Valid From</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Valid Until</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Usage</th>
                                        <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {promoCodes.length > 0 ? (
                                        promoCodes.map((promo) => (
                                            <tr 
                                                key={promo.id} 
                                                className="hover:bg-gray-50 transition cursor-pointer"
                                                onClick={() => navigate(`${promo.id}`)}
                                            >
                                                <td className="px-6 py-4 text-sm font-bold text-blue-600">
                                                    <div className="flex items-center space-x-2">
                                                        <TagIcon className="w-4 h-4" />
                                                        <span>{promo.code}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">{promo.description}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        promo.discount_type === 'percentage' 
                                                            ? 'bg-purple-100 text-purple-800' 
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {promo.discount_type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-green-600">
                                                    {promo.discount_type === 'percentage' ? `${promo.discount_value}%` : `$${promo.discount_value}`}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">{promo.valid_from}</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">{promo.valid_until}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        promo.status === 'active' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {promo.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {promo.times_used || 0} / {promo.usage_limit || '∞'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            onClick={() => handleEdit(promo)}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold flex items-center space-x-1 transition"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(promo.id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold flex items-center space-x-1 transition"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
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

            {/* Modal */}
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {currentPromoCode ? 'Edit Promo Code' : 'Add Promo Code'}
                            </h2>
                            <button
                                onClick={() => setIsModalVisible(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Code */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Code *
                                </label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                                        errors.code ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., SUMMER2024"
                                />
                                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
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
                                    placeholder="Describe this promo code"
                                    rows="3"
                                />
                            </div>

                            {/* Discount Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Discount Type *
                                </label>
                                <select
                                    value={formData.discount_type}
                                    onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                                >
                                    <option value="fixed">Fixed Amount</option>
                                    <option value="percentage">Percentage</option>
                                </select>
                            </div>

                            {/* Discount Value */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Discount Value *
                                </label>
                                <input
                                    type="number"
                                    value={formData.discount_value}
                                    onChange={(e) => setFormData({ ...formData, discount_value: parseFloat(e.target.value) || 0 })}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                                        errors.discount_value ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter discount value"
                                    min="0"
                                    step="0.01"
                                />
                                {errors.discount_value && <p className="text-red-500 text-sm mt-1">{errors.discount_value}</p>}
                            </div>

                            {/* Valid From */}
                            <div>
                                <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Valid From *</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.valid_from}
                                    onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                                        errors.valid_from ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.valid_from && <p className="text-red-500 text-sm mt-1">{errors.valid_from}</p>}
                            </div>

                            {/* Valid Until */}
                            <div>
                                <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Valid Until *</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.valid_until}
                                    onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-600 ${
                                        errors.valid_until ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.valid_until && <p className="text-red-500 text-sm mt-1">{errors.valid_until}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Status *
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Usage Limit */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Usage Limit
                                </label>
                                <input
                                    type="number"
                                    value={formData.usage_limit}
                                    onChange={(e) => setFormData({ ...formData, usage_limit: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                                    placeholder="Leave 0 for unlimited"
                                    min="0"
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalVisible(false)}
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                                >
                                    {currentPromoCode ? 'Update' : 'Add'} Promo Code
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PromoCodeList;
