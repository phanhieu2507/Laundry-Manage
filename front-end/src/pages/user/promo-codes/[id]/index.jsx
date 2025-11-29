import React, { useState, useEffect } from 'react';
import axios from '../../../../component/api/axios';
import UserNavbar from "../../../../component/navbar/user-nav";
import UserSidebar from "../../../../component/sidebar/user-side";
import PromoCodeCard from '../../../../component/promoCodeCard';

const UserPromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  
  useEffect(() => {
    const fetchUserPromoCodes = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        const { data } = await axios.get(`/users/${userData.user.id}/promo-codes`);
        setPromoCodes(data);
      } catch (error) {
        console.error('Error fetching promo codes:', error);
      }
    };

    fetchUserPromoCodes();
  }, []);

  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <UserNavbar />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Promo Codes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promoCodes.map(promoCode => (
              <PromoCodeCard key={promoCode.id} promoCode={promoCode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPromoCodes;
