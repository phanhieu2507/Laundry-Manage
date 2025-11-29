import React from 'react';

const PromoCodeCard = ({ promoCode }) => {
  const { code, description, discount_type, discount_value, valid_from, valid_until, is_used } = promoCode;

  const now = new Date();
  const validFromDate = new Date(valid_from);
  const validUntilDate = new Date(valid_until);

  // ===== EXISTING LOGIC: Get status tag (MODIFIED for TailwindCSS) =====
  const getStatusTag = () => {
    if (is_used) {
      return <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-red-100 text-red-700">Used Up</span>;
    } else if (validUntilDate < now) {
      return <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-orange-100 text-orange-700">Expired</span>;
    } else if (validFromDate > now) {
      return <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-yellow-100 text-yellow-700">Not Yet Valid</span>;
    } else {
      return <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-green-100 text-green-700">Active</span>;
    }
  };

  const discountDisplay = discount_type === 'percentage' ? `${discount_value}% Off` : `$${discount_value} Off`;

  return (
    <div className="group p-4 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 cursor-pointer relative">
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white text-2xl font-bold p-4 rounded-t-lg text-center">
        {discountDisplay}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{code}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-white bg-opacity-95 p-4 rounded-lg flex flex-col justify-center">
          <p className="font-semibold text-gray-800 mb-2">Details:</p>
          <p className="text-gray-700">Valid Until: {valid_until}</p>
          <p className="text-gray-700">Status: {is_used ? 'Used' : 'Not Used'}</p>
        </div>
        <div className="absolute top-4 right-4">
          {getStatusTag()}
        </div>
      </div>
    </div>
  );
};

export default PromoCodeCard;
