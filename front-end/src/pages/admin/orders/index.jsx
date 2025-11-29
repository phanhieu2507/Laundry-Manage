// ===== NEW UI: Admin Orders (replaces Ant Design components) =====
// Matches Homepage design system with TailwindCSS

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../component/sidebar/AdminSidebar";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch orders =====
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/orders")
      .then((response) => {
        setOrders(response.data)
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  // ===== EXISTING LOGIC: Handle Delete =====
  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure to delete this order?")) {
      axios
        .delete(`/api/orders/${orderId}`)
        .then(() => {
          setOrders(orders.filter((order) => order.id !== orderId));
          showNotification('success', 'Order deleted successfully');
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
          showNotification('error', 'Error deleting order');
        });
    }
  };

  // ===== EXISTING LOGIC: Filter orders =====
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchText.toLowerCase();
    return (
      order.user.name.toLowerCase().includes(searchLower) ||
      order.service.toLowerCase().includes(searchLower) ||
      order.total_amount.toString().includes(searchText) ||
      order.payment_status.toLowerCase().includes(searchLower) ||
      order.promo_code?.toLowerCase().includes(searchLower) ||
      order.detail.toLowerCase().includes(searchLower)
    );
  });

  // ===== PAGINATION =====
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order List</h1>
            <p className="text-gray-600">Manage all customer orders</p>
          </div>

          {/* Search and Add Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search orders by user, service, status..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>
            
            <Link 
              to="/admin/orders/create" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition ml-4"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Order</span>
            </Link>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Total Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Promo Code</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Payment Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Order Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Detail</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                      <tr 
                        key={order.id} 
                        className={`hover:bg-gray-50 transition ${
                          order.payment_status === "unpaid" ? "bg-yellow-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">#{order.order_id}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{order.user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{order.service}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">${order.total_amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{order.promo_code || "-"}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.payment_status === "paid" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.payment_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{order.order_date}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{order.detail}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Link 
                              to={`${order.order_id}/edit`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold flex items-center space-x-1 transition"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </Link>
                            <button
                              onClick={() => handleDelete(order.id)}
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
                        No orders found
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

export default AdminOrderList;
