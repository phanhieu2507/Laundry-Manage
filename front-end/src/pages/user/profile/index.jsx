import React, { useState, useEffect } from 'react';
import axios from '../../../component/api/axios';
import UserNavbar from '../../../component/navbar/user-nav';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Lấy id từ localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const userId = storedUserData?.id;

    if (userId) {
      // Gọi API để lấy thông tin người dùng dựa trên userId
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/users/${userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <div>
        <UserNavbar/>
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your's Profile</h2>
      {userData ? (
        <div className="bg-white p-4 rounded-md shadow-md">
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {userData.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Address:</span> {userData.address || 'N/A'}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone:</span> {userData.phone || 'N/A'}
          </p>
          {/* Thêm các trường khác của thông tin cá nhân */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
    </div>
  );
};

export default UserProfile;
