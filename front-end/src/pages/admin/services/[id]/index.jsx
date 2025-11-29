import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../component/api/axios";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "../../../../component/image";
import AdminNavbar from "../../../../component/navbar/AdminNavbar";
import AdminSidebar from "../../../../component/sidebar/AdminSidebar";
import UserNavbar from "../../../../component/navbar/user-nav";
import UserSidebar from "../../../../component/sidebar/user-side";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [imageIndexes, setImageIndexes] = useState({});
  const role = JSON.parse(sessionStorage.getItem('userData')).user.role;

  // ===== EXISTING LOGIC: Fetch service details (UNCHANGED) =====
  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`/services/${serviceId}`);
      setService(response.data);
    } catch (error) {
      console.error("Failed to fetch service details:", error);
    }
  };

  // ===== EXISTING LOGIC: Fetch reviews (UNCHANGED) =====
  const fetchServiceReviews = async () => {
    try {
      const response = await axios.get(`/reviews/service/${serviceId}`);
      setReviews(response.data);
      setFilteredReviews(response.data);
      calculateAverageRating(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  // ===== EXISTING LOGIC: Calculate average rating (UNCHANGED) =====
  const calculateAverageRating = (reviews) => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = reviews.length ? total / reviews.length : 0;
    setAverageRating(average);
  };

  // ===== EXISTING LOGIC: Handle star filter (UNCHANGED) =====
  const handleFilter = (star) => {
    if (star === 0) {
      setFilteredReviews(reviews);
      setActiveFilter(0);
    } else if (star === activeFilter) {
      setFilteredReviews(reviews);
      setActiveFilter(0);
    } else {
      setFilteredReviews(reviews.filter((review) => review.rating === star));
      setActiveFilter(star);
    }
  };

  // ===== NEW: Image carousel navigation =====
  const nextImage = (reviewId, totalImages) => {
    setImageIndexes(prev => ({
      ...prev,
      [reviewId]: ((prev[reviewId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (reviewId, totalImages) => {
    setImageIndexes(prev => ({
      ...prev,
      [reviewId]: ((prev[reviewId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  useEffect(() => {
    fetchServiceDetails();
    fetchServiceReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  // ===== CUSTOM STAR RATING COMPONENT =====
  const StarRating = ({ rating, size = 20 }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Render Navbar/Sidebar based on role */}
      {role === 'admin' ? (
        <>
          <AdminSidebar />
          <div className="flex-1 flex flex-col ml-64">
            <AdminNavbar />
            <div className="flex-1 overflow-auto bg-gray-100 p-6">
              {/* Service Details Section */}
              {service && (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Service Image */}
                    <div className="flex items-center justify-center">
                      <Image
                        className="h-96 w-96 object-cover rounded-xl shadow-md"
                        src={service.image_url || "fallbackImageUrl.jpg"}
                        alt="Service"
                      />
                    </div>

                    {/* Service Info */}
                    <div className="flex flex-col justify-center space-y-4">
                      <h1 className="text-3xl font-bold text-gray-800">{service.service_name}</h1>
                      <StarRating rating={Math.round(averageRating)} size={24} />
                      <p className="text-gray-700"><span className="font-semibold">Duration:</span> {service.duration} minutes</p>
                      <p className="text-gray-700"><span className="font-semibold">Price per unit:</span> ${service.price_per_unit}</p>
                      <p className="text-gray-700"><span className="font-semibold">Unit type:</span> {service.unit_type}</p>
                      <p className="text-gray-700"><span className="font-semibold">Description:</span> {service.description}</p>
                      <span className={`inline-block px-4 py-2 rounded-lg font-semibold w-fit ${
                        service.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {service.is_available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews from Users</h2>

                {/* Average Rating Display */}
                <div className="flex items-center gap-8 mb-6 pb-6 border-b">
                  <div className="flex flex-col items-center">
                    <StarRating rating={Math.round(averageRating)} size={40} />
                    <p className="text-5xl font-bold text-yellow-400 mt-2">{averageRating.toFixed(1)}/5</p>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleFilter(0)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        activeFilter === 0 ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {[5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleFilter(star)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          activeFilter === star ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {star} Stars
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((item) => {
                      const currentIndex = imageIndexes[item.review_id] || 0;
                      return (
                        <div key={item.review_id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start gap-4">
                            {/* User Avatar */}
                            <img
                              src={item.user_avatar || "defaultAvatar.jpg"}
                              alt={item.user.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />

                            {/* Review Content */}
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800">{item.user.name}</h3>
                              <StarRating rating={item.rating} size={18} />
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(item.updated_at).toLocaleDateString('en-GB')}
                              </p>
                              <p className="text-gray-700 mt-2">{item.review}</p>

                              {/* Image Carousel */}
                              {item.images && item.images.length > 0 && (
                                <div className="relative mt-4 w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                                  <Image
                                    className="w-full h-full object-cover"
                                    alt="review"
                                    src={item.images[currentIndex].image_path}
                                  />
                                  {item.images.length > 1 && (
                                    <>
                                      <button
                                        onClick={() => prevImage(item.review_id, item.images.length)}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                                      >
                                        <ChevronLeft size={20} />
                                      </button>
                                      <button
                                        onClick={() => nextImage(item.review_id, item.images.length)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                                      >
                                        <ChevronRight size={20} />
                                      </button>
                                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                        {item.images.map((_, idx) => (
                                          <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full ${
                                              idx === currentIndex ? 'bg-white' : 'bg-white/50'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500 py-8">No reviews found for this filter.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <UserSidebar />
          <div className="flex-1 flex flex-col ml-64">
            <UserNavbar />
            <div className="flex-1 overflow-auto bg-gray-100 p-6">
              {/* Service Details Section */}
              {service && (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Service Image */}
                    <div className="flex items-center justify-center">
                      <Image
                        className="h-96 w-96 object-cover rounded-xl shadow-md"
                        src={service.image_url || "fallbackImageUrl.jpg"}
                        alt="Service"
                      />
                    </div>

                    {/* Service Info */}
                    <div className="flex flex-col justify-center space-y-4">
                      <h1 className="text-3xl font-bold text-gray-800">{service.service_name}</h1>
                      <StarRating rating={Math.round(averageRating)} size={24} />
                      <p className="text-gray-700"><span className="font-semibold">Duration:</span> {service.duration} minutes</p>
                      <p className="text-gray-700"><span className="font-semibold">Price per unit:</span> ${service.price_per_unit}</p>
                      <p className="text-gray-700"><span className="font-semibold">Unit type:</span> {service.unit_type}</p>
                      <p className="text-gray-700"><span className="font-semibold">Description:</span> {service.description}</p>
                      <span className={`inline-block px-4 py-2 rounded-lg font-semibold w-fit ${
                        service.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {service.is_available ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews from Users</h2>

                {/* Average Rating Display */}
                <div className="flex items-center gap-8 mb-6 pb-6 border-b">
                  <div className="flex flex-col items-center">
                    <StarRating rating={Math.round(averageRating)} size={40} />
                    <p className="text-5xl font-bold text-yellow-400 mt-2">{averageRating.toFixed(1)}/5</p>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleFilter(0)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        activeFilter === 0 ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    {[5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleFilter(star)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          activeFilter === star ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {star} Stars
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((item) => {
                      const currentIndex = imageIndexes[item.review_id] || 0;
                      return (
                        <div key={item.review_id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start gap-4">
                            {/* User Avatar */}
                            <img
                              src={item.user_avatar || "defaultAvatar.jpg"}
                              alt={item.user.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />

                            {/* Review Content */}
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800">{item.user.name}</h3>
                              <StarRating rating={item.rating} size={18} />
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(item.updated_at).toLocaleDateString('en-GB')}
                              </p>
                              <p className="text-gray-700 mt-2">{item.review}</p>

                              {/* Image Carousel */}
                              {item.images && item.images.length > 0 && (
                                <div className="relative mt-4 w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                                  <Image
                                    className="w-full h-full object-cover"
                                    alt="review"
                                    src={item.images[currentIndex].image_path}
                                  />
                                  {item.images.length > 1 && (
                                    <>
                                      <button
                                        onClick={() => prevImage(item.review_id, item.images.length)}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                                      >
                                        <ChevronLeft size={20} />
                                      </button>
                                      <button
                                        onClick={() => nextImage(item.review_id, item.images.length)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                                      >
                                        <ChevronRight size={20} />
                                      </button>
                                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                        {item.images.map((_, idx) => (
                                          <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full ${
                                              idx === currentIndex ? 'bg-white' : 'bg-white/50'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500 py-8">No reviews found for this filter.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceDetail;
