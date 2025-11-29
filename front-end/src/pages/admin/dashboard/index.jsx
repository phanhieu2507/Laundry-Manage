// ===== NEW UI: Admin Dashboard (replaces Ant Design components) =====
// Matches Homepage design system with TailwindCSS

import React, { useState, useEffect } from "react";
import axios from "../../../component/api/axios";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Calendar,
  Coins,
  CircleDollarSign,
  Tag,
  Star
} from "lucide-react";
import AdminNavbar from "../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../component/sidebar/AdminSidebar";
import StoreStats from "../../../component/storestat";

function Dashboard() {

    const [topPromoCodes, setTopPromoCodes] = useState([]);

  const [stats, setStats] = useState({
    totalServices: 0,
    totalCustomers: 0,
    totalOrdersThisMonth: 0,
    totalEarningsThisMonth: 0,
  });

  const [promoStats, setPromoStats] = useState({
    totalPromoCodesIssued: 0,
    totalRevenueFromPromoCodes: 0,
    totalDiscountFromPromoCodes: 0,
  });

  const [topUsers, setTopUsers] = useState([]);

  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    axios
      .get("/dashboard/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the stats data!", error);
      });

    axios
      .get("/dashboard/top-users")
      .then((response) => {
        setTopUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the top users data!", error);
      });
    axios
      .get("/dashboard/top-services")
      .then((response) => {
        setTopServices(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the top services data!",
          error
        );
      });
    axios
      .get("/dashboard/statistics/general")
      .then((response) => {
        setPromoStats(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the promo code statistics!",
          error
        );
      });
      axios.get("/dashboard/statistics/detailed")
    .then(response => {
      setTopPromoCodes(response.data.promo_code_details);
    })
    .catch(error => {
      console.error("There was an error fetching the top promo codes data!", error);
    });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-grow p-8 mt-16 ml-64">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
          
          {/* Stats Cards - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Services Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalServices}</h2>
              <p className="text-gray-600 font-medium">Total Services</p>
            </div>

            {/* Total Customers Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalCustomers}</h2>
              <p className="text-gray-600 font-medium">Total Customers</p>
            </div>

            {/* Total Orders This Month Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-100 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalOrdersThisMonth}</h2>
              <p className="text-gray-600 font-medium">Orders This Month</p>
            </div>

            {/* Total Earnings This Month Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-100 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">${stats.totalEarningsThisMonth}</h2>
              <p className="text-gray-600 font-medium">Earnings This Month</p>
            </div>
          </div>

          {/* StoreStats and Top Users */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Store Stats - 2/3 width */}
            <div className="lg:col-span-2">
              <StoreStats />
            </div>

            {/* Top Users - 1/3 width */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                Top Users by Orders
              </h2>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {topUsers.map((user, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition border border-gray-200">
                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">Orders: <span className="font-bold text-blue-600">{user.orders_count}</span></span>
                      <span className="text-xs font-bold text-green-600">${user.orders[0]?.total_spent || "0.00"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <ShoppingCart className="w-5 h-5 text-blue-600 mr-2" />
              Top Services
            </h2>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {topServices.map((service, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{service.service_name}</h3>
                      <p className="text-sm text-gray-600">Total Orders: <span className="font-bold text-blue-600">{service.total_orders}</span></p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(service.average_rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-gray-700">{service.average_rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Codes Section */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Promo Codes</h1>
          
          {/* Promo Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Promo Codes Issued */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{promoStats.totalPromoCodesIssued}</h2>
              <p className="text-gray-600 font-medium">Total Promo Codes Issued</p>
            </div>

            {/* Total Revenue from Promo Codes */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CircleDollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">${promoStats.totalRevenueFromPromoCodes}</h2>
              <p className="text-gray-600 font-medium">Revenue from Promo Codes</p>
            </div>

            {/* Total Discount from Promo Codes */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-100 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Coins className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">${promoStats.totalDiscountFromPromoCodes}</h2>
              <p className="text-gray-600 font-medium">Total Discount Given</p>
            </div>
          </div>

          {/* Top Promo Codes */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 text-blue-600 mr-2" />
              Top Promo Codes
            </h2>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {topPromoCodes.map((promo, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg">{promo.code}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      Usage: <span className="font-bold text-blue-600">{promo.times_used}</span> / {promo.usage_limit}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Revenue: <span className="font-bold text-green-600">${promo.total_revenue || 0}</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        Discount: <span className="font-bold text-orange-600">${promo.total_discount || 0}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
