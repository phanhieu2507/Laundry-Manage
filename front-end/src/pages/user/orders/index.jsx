import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from '../../../component/api/axios';
import UserNavbar from '../../../component/navbar/user-nav';

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.get(`/user/${userData.id}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const columns = [
    {
      title: 'Order NumBer',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar/>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6 pt-8">Your Orders</h2>
        <Table columns={columns} dataSource={orders} rowKey="order_id" />
      </div>
    </div>
  );
};

export default UserOrderList;
