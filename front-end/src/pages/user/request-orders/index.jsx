import React, { useEffect, useState } from 'react';
import axios from '../../../component/api/axios';
import UserNavbar from '../../../component/navbar/user-nav';
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import UserSidebar from '../../../component/sidebar/user-side';
const UserRequestList = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);
  

  function formatDate(dateString) {
    return dayjs(dateString).format("YYYY-MM-DD HH:mm");
  } 
  // ===== EXISTING LOGIC: Get status color (MODIFIED for TailwindCSS) =====
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }; 

  const fetchUserRequests = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const response = await axios.get(`/user/${userData.user.id}/request-orders`);
      const data = response.data;
      // Áp dụng bộ lọc dựa trên statusFilter
      if (statusFilter !== "all") {
        const filteredData = data.filter(request => request.status.toLowerCase() === statusFilter);
        setUserRequests(filteredData);
      } else {
        setUserRequests(data);
      }
    } catch (error) {
      console.error('Error fetching user requests:', error);
    }
  };
  

  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <UserNavbar />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Requests</h1>
            
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <button
                onClick={() => navigate(`/user/request-orders/create`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                Add New Request Order
              </button>
              
              <div className="flex items-center gap-2">
                <label htmlFor="statusFilter" className="text-sm font-semibold text-gray-700">
                  Filter by Status:
                </label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Request Number</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Detail</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Submitted On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userRequests.length > 0 ? (
                    userRequests.map((request) => (
                      <tr key={request.request_order_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-800">#{request.request_order_id}</td>
                        <td className="px-6 py-4 text-gray-800">{request.service}</td>
                        <td className="px-6 py-4 text-gray-600">{request.detail}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{formatDate(request.created_at)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No requests found
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

export default UserRequestList;
