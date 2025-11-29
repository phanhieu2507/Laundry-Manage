// ===== NEW UI: Admin Users (replaces Ant Design components) =====
// Matches Homepage design system with TailwindCSS

import React, { useState, useEffect } from "react";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../component/sidebar/AdminSidebar";
import { 
  Edit, 
  Trash2, 
  Search,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch users =====
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  // ===== EXISTING LOGIC: Filter users =====
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  // ===== HANDLE DELETE =====
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure to delete this user?")) {
      // Replace with actual delete logic
      console.log("Delete user", userId);
      showNotification('success', 'User deleted successfully');
    }
  };

  // ===== PAGINATION =====
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User List</h1>
            <p className="text-gray-600">Manage all registered users</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or phone"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Address</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Phone</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">#{user.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{user.address || "-"}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{user.phone}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => console.log("Edit user", user.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold flex items-center space-x-1 transition"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
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
                        No users found
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

export default AdminUserList;
