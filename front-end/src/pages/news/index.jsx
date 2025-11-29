import React from 'react';
import MainLayout from '../../component/layout/MainLayout';

const newsList = [
  {
    title: 'Laundry Tech Trends 2025',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    date: '2025-11-20',
    description: 'Discover the latest technology in laundry and cleaning services for the new year.'
  },
  {
    title: 'How to Care for Your Clothes',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    date: '2025-11-18',
    description: 'Expert tips for keeping your clothes fresh, clean, and long-lasting.'
  },
  {
    title: 'Eco-Friendly Laundry Solutions',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    date: '2025-11-15',
    description: 'Learn about our new green initiatives and how you can help protect the environment.'
  }
];

const NewsPage = () => (
  <MainLayout>
    <h1 className="text-3xl font-bold text-blue-700 mb-8">Latest News</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsList.map((news, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
          <img src={news.image} alt={news.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="p-6">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{news.title}</h2>
            <div className="text-sm text-gray-400 mb-2">{news.date}</div>
            <p className="text-gray-700 mb-4">{news.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">Read More</button>
          </div>
        </div>
      ))}
    </div>
  </MainLayout>
);

export default NewsPage;
