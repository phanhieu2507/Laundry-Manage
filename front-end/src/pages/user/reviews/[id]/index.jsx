import React, { useState, useEffect } from "react";
import { Star, Upload as UploadIcon, X, Edit, ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import axios from "../../../../component/api/axios";
import Image from "../../../../component/image";
import UserNavbar from "../../../../component/navbar/user-nav";
import UserSidebar from "../../../../component/sidebar/user-side";

const UserReviews = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [completedReviews, setCompletedReviews] = useState([]);
  const [ratingsCount, setRatingsCount] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [fileList, setFileList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});

  // ===== NOTIFICATION HELPER =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ===== EXISTING LOGIC: Fetch review stats (UNCHANGED) =====
  useEffect(() => {
    fetchReviewStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchReviewStats = async () => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    try {
      const { data } = await axios.get(`/reviews/${user.user.id}/stats`);
      setPendingReviews(data.pendingReviews);
      setCompletedReviews(data.completedReviews);
      setRatingsCount(data.ratingsCount);
      setTotalReviews(data.totalReviews);
    } catch (error) {
      showNotification("error", "Error fetching review data");
    }
  };

  // ===== EXISTING LOGIC: Show modal (UNCHANGED) =====
  const showReviewModal = (review) => {
    setSelectedReview(review);
    setRating(review.rating || 0);
    setReview(review.review || "");
    setIsModalVisible(true);
  };

  // ===== EXISTING LOGIC: Handle OK (UNCHANGED) =====
  const handleOk = async () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("review", review);

    fileList.forEach((file) => {
      formData.append("images[]", file);
    });

    try {
      const response = await axios.post(
        `/reviews/${selectedReview.review_id}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        showNotification("success", "Review submitted successfully!");
        fetchReviewStats();
        setIsModalVisible(false);
        setRating(0);
        setReview("");
        setFileList([]);
      }
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || "Network error");
      showNotification("error", "Failed to submit review. Please try again.");
    }
  };

  // ===== EXISTING LOGIC: Handle cancel (UNCHANGED) =====
  const handleCancel = () => {
    setIsModalVisible(false);
    setRating(0);
    setReview("");
    setFileList([]);
  };

  // ===== NEW: Handle file upload =====
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileList([...fileList, ...files].slice(0, 5));
  };

  const removeFile = (index) => {
    setFileList(fileList.filter((_, i) => i !== index));
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

  // ===== CUSTOM STAR RATING COMPONENT =====
  const StarRating = ({ rating, editable = false, onChange }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => editable && onChange && onChange(star)}
            className={`${editable ? 'cursor-pointer' : 'cursor-default'}`}
            disabled={!editable}
          >
            <Star
              size={24}
              className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-start gap-3 max-w-md ${
          notification.type === 'success' ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
        }`}>
          {notification.type === 'success' ? (
            <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          ) : (
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          )}
          <div className="flex-1">
            <h4 className={`font-semibold ${notification.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
              {notification.message}
            </h4>
          </div>
        </div>
      )}

      <UserSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <UserNavbar />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          {/* Review Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Reviews</h3>
              <p className="text-4xl font-bold text-blue-600">{totalReviews}</p>
            </div>

            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3 mb-2">
                  <div className="flex gap-1">
                    {[...Array(star)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">{ratingsCount[star] || 0}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Reviews */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Completed Reviews</h2>
            <div className="space-y-4">
              {completedReviews.length > 0 ? (
                completedReviews.map((item) => {
                  const currentIndex = imageIndexes[item.review_id] || 0;
                  return (
                    <div key={item.review_id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {item.images.length > 0 && (
                              <img
                                src={item.images[0].image_path}
                                alt="review"
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">{item.service.service_name}</h3>
                              <StarRating rating={item.rating} />
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(item.updated_at).toLocaleDateString('en-GB')}
                              </p>
                            </div>
                          </div>
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
                        <button
                          onClick={() => showReviewModal(item)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 py-8">No completed reviews yet</p>
              )}
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Reviews</h2>
            <div className="space-y-4">
              {pendingReviews.length > 0 ? (
                pendingReviews.map((review) => (
                  <div key={review.review_id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{review.service.service_name}</h3>
                        <p className="text-gray-600">{review.review || 'No review text yet'}</p>
                      </div>
                      <button
                        onClick={() => showReviewModal(review)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        Rate
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No pending reviews</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isModalVisible && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Submit Review</h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating *</label>
              <StarRating rating={rating} editable onChange={setRating} />
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review *</label>
              <textarea
                rows="4"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                placeholder="Share your experience..."
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Images (Max 5)</label>
              <div className="grid grid-cols-5 gap-2">
                {fileList.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {fileList.length < 5 && (
                  <label className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                    <UploadIcon size={24} className="text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
