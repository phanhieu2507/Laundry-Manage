import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from '../../../component/api/axios';
import UserNavbar from '../../../component/navbar/user-nav';
import UserSidebar from '../../../component/sidebar/user-side'; // Đảm bảo đã import UserSidebar

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
      title: 'Order Number',
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
    <div className="flex">
      <UserNavbar /> {/* Thêm sidebar vào bên trái */}
      <div className="flex-grow ml-64 p-4"> {/* Đảm bảo đủ không gian cho nội dung */}
        <UserSidebar />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-center mb-6 pt-8">Your Orders</h2>
          <Table columns={columns} dataSource={orders} rowKey="order_id" />
        </div>
      </div>
    </div>
  );
};

export default UserOrderList;
