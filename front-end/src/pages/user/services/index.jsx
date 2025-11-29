import React, { useState, useEffect } from 'react';
import axios from '../../../component/api/axios.js';
import { useNavigate } from 'react-router-dom';
import { WashingMachine, Sparkles, Shirt, Loader2, Clock, DollarSign, Package } from 'lucide-react';
import UserNavbar from '../../../component/navbar/user-nav';
import UserSidebar from '../../../component/sidebar/user-side';

const UserService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const servicesPerPage = 6;

  useEffect(() => {
    setLoading(true);
    axios.get('/services')
      .then(response => setServices(response.data))
      .finally(() => setLoading(false));
  }, []);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  // Chọn icon theo loại dịch vụ (ví dụ: washing, dry, shirt...)
  const getServiceIcon = (service) => {
    if (service.service_name?.toLowerCase().includes('giặt') || service.service_name?.toLowerCase().includes('wash')) {
      return <WashingMachine className="w-12 h-12 text-blue-600" />;
    }
    if (service.service_name?.toLowerCase().includes('ủi') || service.service_name?.toLowerCase().includes('iron')) {
      return <Shirt className="w-12 h-12 text-blue-600" />;
    }
    return <Sparkles className="w-12 h-12 text-blue-600" />;
  };

  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <UserNavbar />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Services</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
            </div>
          ) : (
            <>
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentServices.map((service) => (
                  <div
                    key={service.service_id}
                    onClick={() => navigate(`/services/${service.service_id}`)}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden group"
                  >
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                      <img
                        src={service.image_url}
                        alt={service.service_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Availability Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          service.is_available 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {service.is_available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          {getServiceIcon(service)}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 flex-1">
                          {service.service_name}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Service Details */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700 font-medium">{service.duration}m</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700 font-medium">${service.price_per_unit}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-700 font-medium">{service.unit_type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {services.length > servicesPerPage && (
                <div className="flex justify-center">
                  <nav className="inline-flex gap-2">
                    {Array.from({ length: Math.ceil(services.length / servicesPerPage) }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserService;
