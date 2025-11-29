import React from 'react';
import MainLayout from '../../component/layout/MainLayout';

const events = [
  {
    title: 'Big Sale - 50% Off Laundry',
    date: '2025-12-01',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    description: 'Enjoy our biggest sale of the year! All laundry services 50% off for new customers.'
  },
  {
    title: 'Free Pickup Event',
    date: '2025-12-10',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    description: 'Book laundry online and get free pickup & delivery for all orders above 200k.'
  },
  {
    title: 'Customer Appreciation Day',
    date: '2025-12-20',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    description: 'Special gifts and vouchers for loyal customers. Join us for fun and rewards!'
  }
];

const EventsPage = () => (
  <MainLayout>
    <h1 className="text-3xl font-bold text-blue-700 mb-8">Events & Promotions</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
          <img src={event.image} alt={event.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{event.title}</h2>
            <div className="text-sm text-gray-400 mb-2">{event.date}</div>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">See Details</button>
          </div>
        </div>
      ))}
    </div>
  </MainLayout>
);

export default EventsPage;
