// src/components/ServiceList.jsx

import React, { useState, useEffect } from 'react';
import { Card, Pagination } from 'antd';
import axios from '../../../component/api/axios.js';
import UserNavbar from '../../../component/navbar/user-nav.jsx';
const UserService = () => {
  const [services, setServices] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/services', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setServices(response.data);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <UserNavbar />
      <div className="pt-8">
      <div class="text-3xl font-bold text-center mt-8 mb-8 text-gray-800">
      Laundry's Service
      </div>


      <div className="h-full min-h-[670px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12 shadow-lg border rounded-2xl px-24 m-2">
        {currentServices.map((service) => (
          <Card
            key={service.service_id}
            title={service.service_name}
            className="border-2 border-indigo-300 rounded-3xl h-full max-h-[290px]"
          >
            <p>
              <strong>Service ID:</strong> {service.service_id}
            </p>
            <p>
              <strong>Duration:</strong> {service.duration} minutes
            </p>
            <p>
              <strong>Description:</strong> {service.description}
            </p>
            <p>
              <strong>Is Available:</strong>{" "}
              {service.is_available ? "Yes" : "No"}
            </p>
            <p>
              <strong>Price Per Unit:</strong> $
              {service.price_per_unit || "N/A"}
            </p>
            <p>
              <strong>Unit Type:</strong> {service.unit_type || "N/A"}
            </p>
          </Card>
        ))}
      </div>

      <Pagination
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        pageSize={servicesPerPage}
        total={services.length}
        className="mt-8" // Thêm một chút margin-top để tạo khoảng cách
      />
      </div>
    </div>
  );
};

export default UserService;
