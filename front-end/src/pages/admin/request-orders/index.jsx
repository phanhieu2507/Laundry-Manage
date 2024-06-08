import React, { useEffect, useState } from "react";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/admin-nav";
import AdminSidebar from "../../../component/sidebar/admin-side";
import { Modal, Button, Form, Input, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

const AdminRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  function formatDate(dateString) {
    return dayjs(dateString).format("YYYY-MM-DD HH:mm");
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500 bg-yellow-200";
      case "Processing":
        return "text-blue-500 bg-blue-200";
      case "Completed":
        return "text-green-500 bg-green-200";
      default:
        return "text-gray-500 bg-gray-200";
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get("/admin/request-orders", {
        params: { status: statusFilter },
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.put(`/admin/request-orders/${requestId}/status/${newStatus}`);
      await fetchRequests();
      // Cập nhật local state hoặc fetch lại danh sách requests nếu cần
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleDeleteConfirm = async (requestId) => {
    await axios.delete(`/request-orders/${requestId}`);
    fetchRequests();
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 ml-64">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-20">
            <h2 className="text-2xl font-semibold text-gray-800">
              Customer Requests
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <label
                htmlFor="statusFilter"
                className="text-sm font-medium text-gray-700"
              >
                Filter by Status:
              </label>
              <select
                id="statusFilter"
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-1 pl-3 pr-10 py-2 w-full md:w-auto text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                style={{ padding: '0.375rem 1.5rem', borderRadius: '0.375rem' }}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Table section */}
          <div className="flex flex-col mt-8 border-2 rounded-md overflow-hidden">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Table header */}
                    <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Detail
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Table body rows */}
                      {requests.map((request) => (
                        <tr
                          key={request.request_order_id}
                          className={`${getStatusColor(
                            request.status
                          )} hover:bg-gray-50`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.request_order_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.user_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.service}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.detail}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <select
                              value={request.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  request.request_order_id,
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(request.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Popconfirm
                              title="Are you sure to delete this request?"
                              onConfirm={() =>
                                handleDeleteConfirm(
                                  request.request_order_id
                                )
                              }
                              okText="Yes"
                              cancelText="No"
                            >
                            <Button icon={<DeleteOutlined />} className="bg-red-500 hover:bg-red-600 text-white rounded-lg w-24">
                              Delete
                            </Button>
                            </Popconfirm>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRequestList;
