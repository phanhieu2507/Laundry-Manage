import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from '../../../component/api/axios';
import UserNavbar from '../../../component/navbar/user-nav';
import UserSidebar from '../../../component/sidebar/user-side';

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // ===== EXISTING LOGIC: Fetch orders (UNCHANGED) =====
  const fetchOrders = async () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const response = await axios.get(`/user/${userData.user.id}/orders`);
    setOrders(response.data);
  };

  // ===== EXISTING LOGIC: Handle payment (UNCHANGED) =====
  const handlePay = (order) => {
    const amount = order.total_amount;
    const description = `ORDnumber-${order.order_id}`;
    const uri = `https://vietqr.co/api/generate/vcb/1029094446/VIETQR.CO/${amount}/${description}`;
   
    setCurrentOrder({
      ...order,
      qrCodeUrl: uri
    });
    setIsModalVisible(true);
  };

  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <UserNavbar />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h1>
          
          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order Number</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Payment Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Detail</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-800">#{order.order_id}</td>
                        <td className="px-6 py-4 text-gray-800 font-medium">${order.total_amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            order.payment_status === 'paid' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.payment_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{order.order_date}</td>
                        <td className="px-6 py-4 text-gray-800">{order.service}</td>
                        <td className="px-6 py-4 text-gray-600">{order.detail}</td>
                        <td className="px-6 py-4">
                          {order.payment_status === 'unpaid' && (
                            <button
                              onClick={() => handlePay(order)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                              Pay Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Payment QR Modal */}
      {isModalVisible && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Scan to Pay</h2>
              <button
                onClick={() => setIsModalVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Please scan the QR code to complete your payment</p>
            <div className="flex justify-center">
              <img 
                src={currentOrder.qrCodeUrl} 
                alt="QR Code" 
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderList;
