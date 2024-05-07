import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/admin-nav";
import { Table, Button, Popconfirm, Typography, Space } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleDelete = (orderId) => {
    axios
      .delete(`/api/orders/${orderId}`)
      .then(() => {
        setOrders(orders.filter((order) => order.id !== orderId));
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  const columns = [
    { title: "Order ID", dataIndex: "order_id", key: "order_id" },
    { title: "User", dataIndex: ["user", "name"], key: "user" },
    { title: "Service", dataIndex: "service", key: "service" },
    { title: "Total Amount", dataIndex: "total_amount", key: "total_amount" },
    { title: "Payment Status", dataIndex: "payment_status", key: "payment_status" },
    { title: "Order Date", dataIndex: "order_date", key: "order_date" },
    { title: "Detail", dataIndex: "detail", key: "detail" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Link to={`${record.order_id}/edit`} className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 inline-flex items-center justify-center w-24 h-8">
            <EditOutlined style={{ marginRight: 8 }} />
            Edit
          </Link>
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-lg inline-flex items-center justify-center w-24 h-8">
              <DeleteOutlined style={{ marginRight: 8 }} />
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
      
    },
  ];

  return (
    <div>
      <AdminNavbar/>
      <div className="container mx-auto p-4">
        <Title level={2} className="text-center mb-4">Order List</Title>
        <Table dataSource={orders} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default AdminOrderList;
