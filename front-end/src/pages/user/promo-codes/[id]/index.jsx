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
        const userData = JSON.parse(localStorage.getItem('userData'));
        const { data } = await axios.get(`/users/${userData.id}/promo-codes`);
        setPromoCodes(data);
      } catch (error) {
        console.error('Error fetching promo codes:', error);
      }
    };

    fetchUserPromoCodes();
  }, []);

  return (
    <div>
      <UserNavbar />
      <UserSidebar />
      <div className="flex flex-wrap justify-center mt-20">
        {promoCodes.map(promoCode => (
          <PromoCodeCard key={promoCode.id} promoCode={promoCode} />
        ))}
      </div>
    </div>
  );
};

export default UserPromoCodes;
