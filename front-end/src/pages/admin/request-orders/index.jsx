// ===== NEW UI: Admin Request Orders (replaces Ant Design components) =====
// Matches Homepage design system with TailwindCSS

import React, { useEffect, useState } from "react";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../component/sidebar/AdminSidebar";
import { 
  Trash2, 
  Check, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const AdminRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const pageSize = 10;

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch requests =====
  const fetchRequests = async () => {
    const params = {
      status: statusFilter,
      time_filter: timeFilter
    };
  
    try {
      const response = await axios.get("/admin/request-orders", { params });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, timeFilter, currentPage]);

  // ===== EXISTING LOGIC: Handle status change =====
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.put(`/admin/request-orders/${requestId}/status/${newStatus}`);
      fetchRequests();
      showNotification('success', 'Status updated successfully');
    } catch (error) {
      console.error("Error updating status:", error);
      showNotification('error', 'Failed to update status');
    }
  };

  // ===== EXISTING LOGIC: Handle delete =====
  const handleDeleteConfirm = async (requestId) => {
    if (window.confirm("Are you sure to delete this request?")) {
      try {
        await axios.delete(`/request-orders/${requestId}`);
        fetchRequests();
        showNotification('success', 'Request deleted successfully');
      } catch (error) {
        console.error("Error deleting request:", error);
        showNotification('error', 'Failed to delete request');
      }
    }
  };

  // ===== EXISTING LOGIC: Format date =====
  function formatDate(dateString) {
    return dayjs(dateString).format("YYYY-MM-DD HH:mm");
  }

  // ===== EXISTING LOGIC: Get status color =====
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ===== PAGINATION =====
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / pageSize);

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Requests</h1>
              <p className="text-gray-600">Manage all service requests from customers</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Customer Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Detail</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Submitted On</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentRequests.length > 0 ? (
                    currentRequests.map((request) => (
                      <tr 
                        key={request.request_order_id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          #{request.request_order_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {request.user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {request.service}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                          {request.detail}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.request_order_id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(request.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {formatDate(request.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteConfirm(request.request_order_id)}
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
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        No requests found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
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
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminRequestList;
