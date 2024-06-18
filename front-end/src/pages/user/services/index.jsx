import React, { useState, useEffect } from 'react';
import { Card, Pagination } from 'antd';
import axios from '../../../component/api/axios.js';
import UserNavbar from '../../../component/navbar/user-nav.jsx';
import UserSidebar from '../../../component/sidebar/user-side.jsx';

const UserService = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/services', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setServices(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  return (
    <div className="flex">
      <UserSidebar/>
      <div className="flex-grow ml-64 p-4">
        <UserNavbar />
        <div className="pt-8">
          <div className="text-2xl font-semibold text-left mt-8 mb-8 text-gray-800">
            Our Service
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-12 shadow-lg border rounded-2xl px-24 m-2">
            {currentServices.map((service) => (
              <Card
                key={service.service_id}
                title={service.service_name}
                className="border-indigo-300 rounded-xl h-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="p-4">
                  <p><strong>Service ID:</strong> {service.service_id}</p>
                  <p><strong>Duration:</strong> {service.duration} minutes</p>
                  <p><strong>Description:</strong> {service.description}</p>
                  <p><strong>Is Available:</strong> {service.is_available ? "Yes" : "No"}</p>
                  <p><strong>Price Per Unit:</strong> ${service.price_per_unit || "N/A"}</p>
                  <p><strong>Unit Type:</strong> {service.unit_type || "N/A"}</p>
                </div>
              </Card>
            ))}
          </div>

          <Pagination
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
            pageSize={servicesPerPage}
            total={services.length}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default UserService;
